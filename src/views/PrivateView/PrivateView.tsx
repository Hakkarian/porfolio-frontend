import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/selectors'
import { Navigate, Outlet } from 'react-router-dom';

// in this private view check if user is allowed to access the following path
// if allowed, proceed him to enter
// if not simply redirect him to the login page
const PrivateView = () => {
    const user = useSelector(selectUser);
    if (!user.token) {
        return <Navigate to="/login" />
    }
  return <Outlet />
}

export default PrivateView