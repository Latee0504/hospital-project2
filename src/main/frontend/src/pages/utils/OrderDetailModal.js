import React from 'react'
import './OrderDetailModal.css'
const OrderDetailModal = ({show, onClose, selectedOrder, clearCheck}) => {

  if(!show) return null

  return (
    <div className='modal-overlay'>
    <div className='modal'>
      <button className='modal-close' onClick={(e)=>{onClose()}}>×</button>
      <h2>주문서 상세</h2>
      <div className='modal-content'>
      
       
      </div>
      <div className='modal-actions'>
        
        <button onClick={(e)=>{
        
          onClose()
          
        }
          }>취소</button>
      </div>
    </div>     
  </div>
  )
}

export default OrderDetailModal
