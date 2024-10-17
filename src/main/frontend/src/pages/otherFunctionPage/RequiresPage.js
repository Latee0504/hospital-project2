import React, { useEffect, useState } from 'react'
import './RequiresPage.css'
import axios from 'axios'

const RequiresPage = () => {

  // 부족한 재고 담을 리스트
  const [needList, setNeedList] = useState([])

  // 부족한 재고 리스트에 불러오기
  useEffect(()=>{
    axios
    .get(`/order/needFormList`)
    .then((res)=>{
      setNeedList(res.data)
    })
    .catch((error)=>{
      console.log('부족한 재고 리스트 얻기 에러',error)
    })
  }, [])

  // 추가 요청된 리스트 불러오기

  return (
    <div className='requires-div'>
     <div className='requires-list-div'>
        <h4>재고 추가 주문</h4>
        <div className='requries-functon-div'>
          <div className='need-list-div'>
            <h4>부족한 재고 리스트</h4>
            <table>
              <thead>
                <tr>
                  <td>재고명</td>
                  <td>주문번호</td>
                  <td>상품명</td>
                  <td>필요수</td>
                </tr>
              </thead>
              <tbody>
                {
                  needList.map((need, i)=>{
                    return(
                      <tr key={i}>
                        <td>{need.needNum}</td>
                        <td>{need.orderNum}</td>
                        <td>{need.supplyVO.supplyName}</td>
                        <td>{need.needCnt}</td>
                      </tr>
                    )
                  })
                  
                }
              </tbody>
            </table>
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
