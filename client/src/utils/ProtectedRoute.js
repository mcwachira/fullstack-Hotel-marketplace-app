import React from 'react'
import LoadingToRedirect from './LoadingToRedirect'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
    const { auth } = useSelector((state) => ({ ...state }))
    return auth && auth.token ? (
        <div>{children}</div>
    ) : (
        <LoadingToRedirect />
    )
}

export default ProtectedRoute