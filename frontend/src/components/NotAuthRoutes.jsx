//import React from 'react'

import { Navigate, Outlet } from "react-router-dom"

const NotAuthRoutes = ({ isAuth }) => {
  return (
    isAuth ? <Navigate to={'/'} /> : <Outlet />    // 아무나 갈 수 있는 경로로 이동하도록
  )
}

export default NotAuthRoutes