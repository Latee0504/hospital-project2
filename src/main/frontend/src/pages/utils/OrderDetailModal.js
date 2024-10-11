import React from 'react'
import './OrderDetailModal.css'
const OrderDetailModal = ({show, onClose, selectedOrder, clearCheck, setSelectedOrder}) => {



  if(!show) return null

  return (
    <div className='modal-overlay'>
    <div className='modal'>
      <button className='modal-close' onClick={(e)=>{onClose()}}>×</button>
      <h2>주문서 상세</h2>
      <div className='modal-content'>
        <table>
          <thead>
            <tr>
              <td>거래처</td>
              <td>발주날짜</td>
              <td>발주자</td>
              <td>상품명</td>
            </tr>
          </thead>
        {
          selectedOrder.map((order,i)=>{
            return(
              <tr key={i}>
                <td>{order.customerVO.customerName}</td>
                <td>{order.orderDate}</td>
                <td>{order.orderManger}</td>
                <td>
                  {order.supplyList[0].supplyName}
                </td>
              </tr>
            )
          })
        }
        </table>
      </div>
      <div className='modal-actions'>
        <button type='button' onClick={(e)=>{
          onClose()
        }}>
          확정
        </button>
        <button type='button' onClick={(e)=>{
          selectedOrder.
          onClose()
        }
          }>취소</button>
      </div>
    </div>     
  </div>
  )
}

export default OrderDetailModal
