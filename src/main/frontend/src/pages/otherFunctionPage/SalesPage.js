import React, { useEffect, useState } from 'react'
import './SalesPage.css'
import axios from 'axios'

const SalesPage = () => {
  // 처리된 리스트를 담을 변수
  const [doneList, setDoneList] = useState([])

  // 총 매출을 담을 변수
  const [totalSales, setTotalSales] = useState(0)

  // 가장 많이 팔린 상품의 정보를 담을 변수
  const [topSales, setTopSales] = useState(null)

  // 처리된 리스트를 가져옴
  useEffect(()=>{
    axios
    .get('/order/doneFormList')
    .then((res)=>{
      setDoneList(res.data)
      console.log(res)
      // 총 매출 계산
      const total = res.data.reduce((acc, done) => {
        return acc + done.orderFormList[0].detailOrderList.reduce((totalPrice, price) => totalPrice + (price.supplyVO.supplyPrice * price.orderAmount), 0)
      }, 0)
      setTotalSales(total)

      // 최다 판매 상품 계산
      const topSupply = {}

      res.data.forEach((done, i) => {
        done.orderFormList[0].detailOrderList.forEach((item, j)=>{
          // 주문 상세목록에서 상품명과 주문수량 뽑기
          const topSupplyName = item.supplyVO.supplyName
          const topSupplyAmount = item.orderAmount

          if(topSupply[topSupplyName]){
            topSupply[topSupplyName] += topSupplyAmount
          }
          else{
            topSupply[topSupplyName] = topSupplyAmount
          }
        })
      })

      // 최다 판매 상품 찾기
      const searchMaxOne = Object.keys(topSupply).reduce((max, product) => {
        return topSupply[product] > topSupply[max] ? product : max;
      })
      setTopSales({
        name: searchMaxOne
        , amount: topSupply[searchMaxOne]
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [])

  return (
    <div className='sales-div'>
      <div className='sales-list-div'>
        <h4>매출 목록</h4>
        {/* 월별로 데이터를 분류해서 총 매출액 */}
        <div className='simple-notice'>
          <h4>이달의 총 매출: {totalSales}원</h4>
          {
            topSales && (
               <h4>가장 많이 팔린 상품: {topSales.name} & {topSales.amount}개</h4>
            )
          }
         
        </div>
       
        <table className='done-table'>
          <thead>
            <tr>
              <td>처리 번호</td>
              <td>발주 사</td>
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
                  <tr key={i}>
                    <td>{done.doneNum}</td>
                    <td>{done.orderFormList[0].customerVO.customerName}</td>
                    <td>{done.doneDate}</td>
                    <td>
                      {
                        done.orderFormList[0].detailOrderList.length==1
                        ?
                        done.orderFormList[0].detailOrderList[0].supplyVO.supplyName
                        :
                        (done.orderFormList[0].detailOrderList[0].supplyVO.supplyName)+' 외 ' +(done.orderFormList[0].detailOrderList.length-1)+'개'
                      }
                    </td>
                    <td>{done.orderFormList[0].detailOrderList.reduce((total, item) => total + item.orderAmount, 0)}개</td>
                    <td>
                      {
                        done.orderFormList[0].detailOrderList.reduce((totalPrice, price)=> totalPrice + (price.supplyVO.supplyPrice * price.orderAmount), 0)
                      }
                      원
                    </td>
                    <td>{done.doneManager}</td>
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
