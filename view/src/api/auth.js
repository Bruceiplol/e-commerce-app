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
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); 
    console.log('%c response', 'color: #00e600', data);
    return data;
  } catch (err) {
    throw err.response ? err.response.data : err;
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
  const response = await fetch("/api/auth")

  console.log(response)
  return response.data
}