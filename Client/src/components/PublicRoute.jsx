import React from 'react'
import { useFetchUserQuery } from '../services/api'
import { Navigate, Outlet } from 'react-router-dom';


const PublicRoute = ({redirectTo="/dashboard"}) => {
    const {data:user}=useFetchUserQuery();
    return !user? <Outlet/>: <Navigate to={redirectTo} replace/>
}

export default PublicRoute