import React from 'react'
import './MangeOrdering.css'

const MangeOrdering = () => {
  return (
    <div className='order-div'>
      <div className='order-list-div'>
        <h4>들어온 주문서 리스트</h4>
        <table>
          <thead>
            <tr>
              <td>주문번호</td>
              <td>주문 회사명</td>
              <td>상품명</td>
              <td>구매 갯수</td>
              <td>주문 일자</td>
            </tr>
          </thead>
          <tbody>
            {/* 받아온 주문서 리스트를 받아서 그려줄 것 */}
          </tbody>
        </table>
      </div>
      <div className='btn-div'>
        <button type='button' className='btn'>등록</button>
      </div>
      <div className='order-start-div'>
        <h4>처리 시작한 주문서 리스트</h4>
        <table>
          <thead>
            <tr>
              <td>처리 등록 번호</td>
              <td>주문번호</td>
              <td>주문 회사명</td>
              <td>상품명</td>
              <td>구매 갯수</td>
              <td>주문 일자</td>
            </tr>
          </thead>
          <tbody>
            {/* 등록된 주문서 리스트를 받아서 그려줄 것 */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MangeOrdering
