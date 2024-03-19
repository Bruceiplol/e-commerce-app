import API from "./client";

export const register = async (data) => {
  try {
    const response = await fetch("api/auth/register", data);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
  } catch (err) {
    throw err;
  }
};

export const isLoggedIn = async () => {
  try {
    const response = await API.get("auth/logged_in");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const showUser = async () => {
  const response = await fetch("http://localhost:4000/api/auth", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  console.log(response)
  const data = response.json()
  console.log(data)
  return response
}