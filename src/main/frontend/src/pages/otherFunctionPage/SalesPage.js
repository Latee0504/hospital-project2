import React, { useEffect, useState } from 'react'
import './SalesPage.css'
import axios from 'axios'
import SalesDetailModal from '../utils/SalesDetailModal'

const SalesPage = () => {
  // 처리된 리스트를 담을 변수
  const [doneList, setDoneList] = useState([])

  // 총 매출을 담을 변수
  const [totalSales, setTotalSales] = useState(0)

  // 가장 많이 팔린 상품의 정보를 담을 변수
  const [topSales, setTopSales] = useState(null)

  // 모달 오픈 여부
  const [isOpenModal, setIsOpenModal] = useState(false)

  // 모달창으로 가져갈 객체
  const [salesOne, setSalesOne] = useState({
    doneNum:0
    , orderFormList:
    [
      {
        supplyNum:0
        , orderAmount:0
      }
    ]
    , doneDate:''
    , doneManager:''
  })

  // 처리 번호를 눌렀을 때 사용할 함수
  const passModal = (done) =>{
    //모달에 가져갈 정보 세팅
    setSalesOne(done)
    //모달창 띄우기
    setIsOpenModal(true)
    console.log(salesOne)
  }

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
          <h4>총 매출: {totalSales}원</h4>
          {
            topSales && (
              <h4>가장 많이 팔린 상품: {topSales.name} & {topSales.amount}개</h4>
            )
          }
        </div>

        <table className='done-table'>
          <thead>
            <tr>
              <td>처리번호</td>
              <td>발주사</td>
              <td>처리날짜</td>
              <td>상품명</td>
              <td>총 상품</td>
              <td>매출금액</td>
              <td>담당자</td>
            </tr>
          </thead>
          <tbody>
            {
              doneList.map((done,i)=>{
                return(
                  <tr key={i}>
                    <td onClick={(e)=>{
                      passModal(done)
                      }}>{done.doneNum}</td>
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
      {/* 매출 상세 정보 모달 */}
      <SalesDetailModal
      show={isOpenModal}
      onClose={()=>setIsOpenModal(false)}
      salesOne={salesOne}
      />
    </div>
  )
}

export default SalesPage
