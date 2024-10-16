import React from 'react'
import './RequiresPage.css'

const RequiresPage = () => {

  // 부족한 재고 리스트에 불러오기

  // 추가 요청된 리스트 불러오기

  return (
    <div className='requires-div'>
     <div className='requires-list-div'>
        <h4>재고 추가 주문</h4>
        <div className='requries-functon-div'>
          <div className='need-list-div'>
            <h4>부족한 재고 리스트</h4>
          </div>
          <div className='plus-list-div'>
            <h4>추가 요청 리스트</h4>
          </div>
        </div>
     </div>
    </div>
  )
}

export default RequiresPage
