import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext, LoginDetails } from "../../App";

import React from 'react'

const Logout = () => {
    const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;
    if(loginToken) {
        setLoginToken("");
    }
  return (
    <Navigate to='/login'/>
  )
}

export default Logout