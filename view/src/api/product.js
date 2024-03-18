import { useFetcher } from "react-router-dom";
import API from "./client";
import axios from 'axios'

export const getProducts = async () => {
  try {
    const res = await fetch("/api/products");
    console.log(res)
    const data = await res.json()
    console.log(data)
    return data
  } catch (err) {
    throw err;
  }
};
