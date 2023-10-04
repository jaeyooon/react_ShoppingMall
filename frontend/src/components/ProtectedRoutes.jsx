import React from 'react'
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = ({ isAuth }) => {     // isAuth를 App.jsx에서 props로 가져옴
  return (
    isAuth ? <Outlet /> : <Navigate to={'/login'} />  // isAuth가 false면 login 페이지로 이동
  )
}

export default ProtectedRoutes