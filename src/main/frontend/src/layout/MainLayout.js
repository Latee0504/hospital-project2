import React from 'react'
import './MainLayout.css'
import { Outlet, useNavigate } from 'react-router-dom'
const MainLayout = () => {
  const navigate = useNavigate()
  return (
  <div className='m-h'>
    <div className='admin-header'>
      <div className='logo'>
        <img className='adminLogo' src='http://localhost:8080/images/logo.png' />
        <h1 onClick={(e)=>{navigate(`/orders`)}}>그린라이프</h1>
      </div>
      <ul className='admin-header-ul'>
        <li>
          <p onClick={(e)=>{navigate(`/`)}}>메인 화면</p>
        </li>
        <li>
          <p onClick={(e)=>{navigate(`/detail`)}}>상세 정보</p>
        </li>
        <li>
          <p onClick={(e)=>{navigate(`/orders`)}}>수주</p>
        </li>
      </ul>
     
      
      
    </div>
  </div>
  )
}

export default MainLayout
