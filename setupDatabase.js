const { Client } = require('pg');
const { DB } = require('./config');

(async () => {

  const usersTableStmt = `
    CREATE TABLE IF NOT EXISTS users (
      id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      username        VARCHAR(50) NOT NULL,
      email           VARCHAR(50) NOT NULL,      
      password        VARCHAR NOT NULL,
      firstName       VARCHAR(50),
      lastName        VARCHAR(50),
      phone           VARCHAR(20),
      created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    );
  `

  const productsTableStmt = `
    CREATE TABLE IF NOT EXISTS products (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      name            VARCHAR(50)     NOT NULL,
      price           BIGINT          NOT NULL,
      description     VARCHAR(100)    NOT NULL,
      created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    );
  `

  const ordersTableStmt = `
    CREATE TABLE IF NOT EXISTS orders (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      total           INT             NOT NULL,
      status          VARCHAR(50)     NOT NULL,
      userId          INT             NOT NULL,
      created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `

  const orderItemsTableStmt = `
    CREATE TABLE IF NOT EXISTS orderItems (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      orderId         INT             NOT NULL,
      quantity        INT             NOT NULL,
      price           INT             NOT NULL,
      productId       INT             NOT NULL,
      name            VARCHAR(50)     NOT NULL,
      description     VARCHAR(200)    NOT NULL,
      created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (orderId) REFERENCES orders(id)
    );
  `

  const cartsTableStmt = `
    CREATE TABLE IF NOT EXISTS carts (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      userId          INT             NOT NULL,
      created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `

  const cartItemsTableStmt = `
    CREATE TABLE IF NOT EXISTS cartItems (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      cartId          INT             NOT NULL,
      productId       INT             NOT NULL,
      quantity        INT             NOT NULL,
      price           INT             NOT NULL,
      created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cartId) REFERENCES carts(id),
      FOREIGN KEY (productId) REFERENCES products(id)
    );
  `

  const updateModifiedAtFunctionStmt = `
    CREATE OR REPLACE FUNCTION update_modified_at()
      RETURNS TRIGGER AS $$
    BEGIN
      NEW.modified_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `

  const tables = ["users", "products","orders","order_items","carts","cart_items"]

  try {
    const db = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGDATABASE,
      password: DB.PGPASSWORD,
      port: DB.PGPORT
    });

    await db.connect();

    await db.query(usersTableStmt);
    await db.query(productsTableStmt);
    await db.query(ordersTableStmt);
    await db.query(orderItemsTableStmt);
    await db.query(cartsTableStmt);
    await db.query(cartItemsTableStmt);
    await db.query(updateModifiedAtFunctionStmt);
    
    for (const table of tables) {
      const tableTriggerStmt = `
        CREATE TRIGGER ${table}_update_modified_at_trigger
        BEFORE UPDATE ON ${table}
        FOR EACH ROW
        EXECUTE FUNCTION update_modified_at();
      `;
  
      await db.query(tableTriggerStmt);
    }

    await db.end();

  } catch(err) {
    console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
  }

})();