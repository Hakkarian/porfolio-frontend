import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectToken } from '../../redux/selectors';

// in this private view check if user is allowed to access the following path
// if allowed, proceed him to enter
// if not simply redirect him to the login page
const PrivateView = () => {
  const token = useSelector(selectToken);
  console.log('private here', token)
    if (!token) {
        return <Navigate to="/login" />
    }
  return <Outlet />
}


export default PrivateView