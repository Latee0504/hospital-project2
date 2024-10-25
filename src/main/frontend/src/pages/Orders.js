import React from 'react'
import './Orders.css'
import { Outlet, useNavigate } from 'react-router-dom'

const Orders = () => {

  const navigate = useNavigate()

  return (
    <div className='order-main'>
      <div>  
        <h3>수주관리</h3>
        <div>
          <p>
            <span onClick={(e)=>{navigate(`/orders`)}}>거래처관리 </span>
          </p>
          <p>
            <span onClick={(e)=>{navigate(`/orders/item`)}}>제품관리</span>
          </p>    
          <p>
            <span onClick={(e)=>{navigate(`/orders/ordering`)}}>주문서관리</span>
          </p>
        </div>
        <h3>사후 관리</h3>
        <div>
          <p>
            <span onClick={(e)=>{navigate(`/orders/sales`)}}>매출관리</span>
          </p>
          <p>
            <span onClick={(e)=>{navigate(`/orders/requires`)}}>재고관리 </span>
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
