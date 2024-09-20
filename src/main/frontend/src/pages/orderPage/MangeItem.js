import React, { useState } from 'react'
import './MangeItem.css'

const MangeItem = () => {

  // 등록할 아이템 정보 객체
  const[regItem, setRegItem] = useState({})

  //

  return (
    <div className='item-div'>
      <div className='item-reg-div'>
        <h4>아이템 등록</h4>
        <table>
          <thead>
            <tr>
              <td>제품 명</td>
              <td>재고 수</td>
              <td>최근 입고일</td>
              <td>제품 가격</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type='text' placeholder='제품명을 입력하세요'/>
              </td>
              <td>
                <input type='text' placeholder='재고 수를 입력하세요'/>
              </td>
              <td>
                <input type='text' placeholder='최근 입고일을 입력하세요'/>
              </td>
              <td>
                <input type='text' placeholder='제품 가격을 입력하세요'/>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type='button' className='btn'>등록</button>
        </div>
      </div>
      <div className='item-list-div'>
        <h4>아이템 리스트</h4>
        <table>
          <thead>
            <tr>
              <td>등록 넘버</td>
              <td>제품 명</td>
              <td>재고 수</td>
              <td>최근 입고일</td>
              <td>제품 가격</td>
            </tr>
          </thead>
          <tbody>
            {/* 여기에 반복문으로 리스트 그려줌 */}
            <tr>
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MangeItem
