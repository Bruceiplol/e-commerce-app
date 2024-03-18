import React, { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import { displayProducts } from '../store/product';
import { useDispatch, useSelector } from "react-redux";


const Home = () => {
  const dispatch = useDispatch()
  const productData = useSelector(state=> state.data)

  useEffect(()=> {
    dispatch(displayProducts())
  },[dispatch, displayProducts])

  
  
  return (
    <div>
      <Hero />
      <div>{productData ? JSON.stringify(productData) : "Loading products..."}</div>
    </div>
  )
}

export default Home;