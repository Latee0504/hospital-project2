import React from 'react'
import './OrderDetailModal.css'
const OrderDetailModal = ({show, onClose, selectedOrder, clearCheck, setSelectedOrder, setOrderOne, orderOne, regDone}) => {

  if(!show) return null

  const handleDoneManagerChange = (e) => {
    setOrderOne({
      ...orderOne,
      doneManager: e.target.value,
    });
  };

  return (
    <div className='modal-overlay'>
    <div className='modal'>
      <button className='modal-close' onClick={(e)=>{
        onClose()
        clearCheck()
      }}>×</button>
      <h2>주문서 상세</h2>
      <div className='modal-content'>
      <table>
            <thead>
              <tr>
                <td>거래처</td>
                <td>발주날짜</td>
                <td>발주자</td>
                <td>상품명/상품갯수</td>
              </tr>
            </thead>
            <tbody>
              {/* 주문 리스트 렌더링 */}
              {selectedOrder.map((order, i) => (
                <React.Fragment key={i}>
                  <tr>
                    <td>{order.customerVO.customerName}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.orderManager}</td>
                    <td>
                      {/* 주문 세부 항목 */}
                      {order.detailOrderList.map((detail, j) => (
                        <div key={j}>
                          {detail.supplyVO.supplyName}: {detail.orderAmount}개
                        </div>
                      ))}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        <input type='text' name='doneManager' placeholder='처리자 이름을 입력하세요'  onChange={handleDoneManagerChange}/>
      </div>
      <div className='modal-actions'>
        <button type='button' onClick={(e)=>{
          regDone()
          onClose()
        }}>
          확정
        </button>
        <button type='button' onClick={(e)=>{
          clearCheck()
          onClose()
        }
          }>취소</button>
      </div>
    </div>     
  </div>
  )
}

export default OrderDetailModal
