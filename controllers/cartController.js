const createError = require("http-errors");
const CartModel = require("../models/cartModel");
const CartItemModel = require("../models/cartItemModel")
const OrderModel = require("../models/orderModel")

module.exports = class Cart {
  async createCart(data) {
    const {userId} = data
    try {
      const Cart = new CartModel()
      const cart = await Cart.create({userId})

      return cart

    } catch (err) {
      throw err
    }
  }
  
  async loadCart(userId) {
    try {
      const cart = await CartModel.findOneByUserId(userId)
      const cartItems = await CartItemModel.find(cart.id)
      cart.cartItems = cartItems

      return cart
    } catch (err) {
      throw err
    }
  }
  
  async addItem(userId, data) {
    try {
      const cart = await CartModel.findOneByUserId(userId)
      const cartItem = await CartItemModel.create({cartId: cart.id, ...data})
      return cartItem
    } catch (err) {
      throw err
    }
  }
  
  async updateItem(cartItemId, data) {
    try {
      const cartItem = await CartItemModel.update(cartItemId, data);
      return cartItem
    } catch (err) {
      throw err
    }
  }
  
  async removeItem(cartItemId) {
    try {
      const cartItem = await CartItemModel.delete(cartItemId);

      return cartItem;
    } catch (err) {
      throw err
    }
  }
  
  async checkout(userId, cartId, paymentInfo) {
    try {
      const stripe = require('stripe')('sk_test_51OlnnJJsOsdCN6xl3WZxVqNeEmlC4JKVS4lLBjOIoB3cMMFIUJIRXSrGpCIXeTNqb9QSinQKM2dYP3fruSBGUZst004EEBszN0')
      const cartItems = await CartItemModel.find(cartId)
      const total = cartItems.reduce((total, item) => total+= Number(item.price), 0)

      const Order = new OrderModel({ total, userId });
      Order.addItems(cartItems)
      await Order.create()

      const charge = await stripe.charges.create({
        amount: total,
        currency: 'usd',
        source: paymentInfo.id,
        description: "Codecademy Charge"
      })

      const order = Order.update({status: 'COMPLETE'})

      return order
    } catch (err) {
      throw err
    }
  }
}