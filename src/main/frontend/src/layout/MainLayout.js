import React from 'react'
import './MainLayout.css'
import { useNavigate } from 'react-router-dom'
const MainLayout = () => {
  const navigate = useNavigate()
  return (
    <div className='admin-header'>
      <img className='adminLogo' src='http://localhost:8080/images/logo.png' />
      <ul className='admin-header-ul'>
        <li>
          <p onClick={(e)=>{navigate(`/`)}}>메인 화면</p>
        </li>
        <li>
          <p onClick={(e)=>{navigate(`/detail`)}}>상세 정보</p>
        </li>
      </ul>
      <div>
        ㅇㅇㅇ님 안녕하세요! 
        <button>로그아웃</button>
      </div>
    </div>
  )
}

export default MainLayout
