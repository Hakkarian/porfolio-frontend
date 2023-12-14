import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectToken } from '../../redux/selectors'

// in this private view check if user is allowed to access the following path
// if allowed, proceed him to enter
// if not simply redirect him to the user page
const RestrictedView = () => {
    const token = useSelector(selectToken);

    if (token) {
        return <Navigate to="/user" />
    }
  return <Outlet />
}

export default RestrictedView