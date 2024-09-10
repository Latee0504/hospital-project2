import React from 'react'
import './MainLayout'
import { useNavigate } from 'react-router-dom'
const MainLayout = () => {
  const navigate = useNavigate()
  return (
       <ul>
          <li>
            <p onClick={(e)=>{navigate(`/`)}}>메인 화면</p>
          </li>
          <li>
            <p onClick={(e)=>{navigate(`/detail`)}}>상세 정보</p>
          </li>
          
      </ul>
    
  )
}

export default MainLayout
