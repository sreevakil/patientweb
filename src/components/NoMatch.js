import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

export default function NoMatch() {

  const navigate = useNavigate();

  const {user, setUser} = useContext(UserContext);
  useEffect(() => {
      if (user == null || (Object.keys(user).length === 0)) {
          navigate("/");
      } else {
        navigate("dashboard");
      }
    }, []);

  return (
    <div>Page Not Found</div>
  )
}
