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
    const response = await fetch("/api/auth/login", credentials);
    console.log(response)
    return response;
  } catch (err) {
    throw err.response.data;
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