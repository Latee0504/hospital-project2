import React from 'react'
import './SalesDetailModal.css'
const SalesDetailModal = ({show, onClose, salesOne}) => {

  if(!show) return null

  return (
    <div className='modal-overlay'>
    <div className='modal'>
      <button className='modal-close' onClick={(e)=>{
        onClose()
      }}>×</button>
      <h2>매출 상세 목록</h2>
      <div className='modal-content'>
      <table>
            <thead>
              <tr>
                <td>거래처</td>
                <td>발주날짜</td>
                <td>발주자</td>
                <td>상품명/상품갯수</td>
                <td>상품 단가/상품 총액</td>
              </tr>
            </thead>
            <tbody>
              {
              salesOne.orderFormList.map((order, i) => {
                return(
                  <tr key={i}>
                  <td>{order.customerVO.customerName}</td>
                  <td>{salesOne.doneDate}</td>
                  <td>{salesOne.doneManager}</td>
                  <td>
                    {
                      order.detailOrderList.map((detail, j)=>{
                        return(
                          <div key={j}>
                            {detail.supplyVO.supplyName}/{detail.orderAmount}개
                          </div>
                        )
                        
                      })
                    }
                  </td>
                  <td>
                    {
                      order.detailOrderList.map((de1, q)=>{
                        return(
                          <div key={q}>
                            {de1.supplyVO.supplyPrice}원/{(de1.supplyVO.supplyPrice)*(de1.orderAmount)}원
                          </div>
                        )
                        
                      })
                    }
                  </td>
              
                </tr>
                )
              })}
            </tbody>
          </table>
      </div>
      <div className='modal-actions'>
        <button type='button' onClick={(e)=>{    
          onClose()
        }}>
          확인
        </button>
      </div>
    </div>     
  </div>
  )
}

export default SalesDetailModal
