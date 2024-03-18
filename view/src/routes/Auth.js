import React, { useEffect, useState } from 'react';
import { showUser } from '../api/auth';

const Auth = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await showUser();
        setUserData(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return <div>{userData && JSON.stringify(userData)}</div>;
};

export default Auth;