import React from 'react'
import './Orders.css'
import { Outlet, useNavigate } from 'react-router-dom'

const Orders = () => {

  const navigate = useNavigate()

  return (
    <div className='order-main'>
      <div>  
        <h3>수주 관리</h3>
        <div>
          <p>
            <span onClick={(e)=>{navigate(`/orders`)}}>거래처 관리</span>
          </p>
          <p>
            <span onClick={(e)=>{navigate(`/orders/ordering`)}}>주문서 관리</span>
          </p>
          <p>
            <span onClick={(e)=>{navigate(`/orders/item`)}}>제품 관리</span>
          </p>    
        </div>
        <h3>수주 처리</h3>
        <div>
          <p>
            <span onClick={(e)=>{navigate(`/orders/proceed`)}}>주문서 처리</span>
          </p>
          <p>
            <span></span>
          </p>
        </div>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Orders
