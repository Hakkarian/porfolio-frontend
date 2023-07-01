import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectToken } from '../../redux/selectors'

const RestrictedView = () => {
    const token = useSelector(selectToken);

    if (token) {
        return <Navigate to="/user" />
    }
  return <Outlet />
}

export default RestrictedView