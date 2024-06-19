import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../../App";
import { LoginDetails } from "../../types";

import React from 'react'

const Logout = () => {
    const { loginToken, setLoginToken, userRole, setUserRole } = useContext(authContext) as LoginDetails;
    if(loginToken) {
        setLoginToken("");
				setUserRole("");
    }
  return (
    <Navigate to='/login'/>
  )
}

export default Logout
