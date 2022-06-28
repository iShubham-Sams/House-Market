import { Outlet, Navigate } from "react-router-dom";
import useAuthState from "../Hookes/useAuthState";
import React from 'react'
import Spinner from "./Spinner";

const Privaterout = () => {
    const {loggedIn,checkState}=useAuthState()

    if(checkState){
        return <Spinner/>
    }
  return (
    loggedIn ? <Outlet/> :<Navigate to='/signin'/>
  )
}

export default Privaterout