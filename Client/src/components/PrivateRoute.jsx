import React from 'react'
import { useFetchUserQuery } from '../services/api'
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = ({redirectTo="/login"}) => {
    const {data:user}=useFetchUserQuery();
    return (user)?<Outlet/>:<Navigate to={redirectTo} replace/>
    
}

export default PrivateRoute