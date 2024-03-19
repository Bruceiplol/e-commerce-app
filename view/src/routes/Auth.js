import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { show } from '../store/auth';

const Auth = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  console.log(data)

  useEffect(()=> {
    dispatch(show())
  },[dispatch, show])


  return <div>{data}</div>;
};

export default Auth;