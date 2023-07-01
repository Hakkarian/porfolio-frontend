import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/selectors'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateView = () => {
    const user = useSelector(selectUser);
    console.log(user)
    if (!user.token) {
        return <Navigate to="/login" />
    }
  return <Outlet />
}

export default PrivateView