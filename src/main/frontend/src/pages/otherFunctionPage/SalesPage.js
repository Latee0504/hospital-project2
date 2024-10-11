import React, { useEffect, useState } from 'react'
import './SalesPage.css'
import axios from 'axios'

const SalesPage = () => {
  // 처리된 리스트를 담을 변수
  const [doneList, setDoneList] = useState([])

  // 총 매출을 담을 변수
  const [totalSales, setTotalSales] = useState(0);

  // 처리된 리스트를 가져옴
  useEffect(()=>{
    axios
    .get('/order/doneFormList')
    .then((res)=>{
      setDoneList(res.data)
      console.log(res)
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [totalSales])

  return (
    <div className='sales-div'>
      <div className='sales-list-div'>
        <h4>매출 목록</h4>
        {/* 월별로 데이터를 분류해서 총 매출액 */}
        <div>
          <h4>이달의 총 매출: {totalSales}</h4>
        </div>
       
        <table className='done-table'>
          <thead>
            <tr>
              <td>처리 번호</td>
              <td>처리 날짜</td>
              <td>상품 명</td>
              <td>총 상품 수</td>
              <td>매출 액</td>
              <td>처리 매니저</td>
            </tr>
          </thead>
          <tbody>
            {
              doneList.map((done,i)=>{
                return(
                  <tr>
                    <td>{done.doneNum}</td>
                    <td>{done.doneDate}</td>
                    <td>{done.orderFormVO.supplyList[0].supplyName}</td>
                    <td>{}</td>
                    <td>
                    {
                    (done.orderFormVO.supplyList[0].supplyPrice) *(done.orderFormVO.orderAmount)
                    }
                    원</td>
                    <td>{done.doneManger}</td>
                  </tr>
                )
              })
            }
         </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default SalesPage
