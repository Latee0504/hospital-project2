import React, { useEffect, useState } from 'react'
import './MangeOrdering.css'
import axios from 'axios'
import OrderDetailModal from '../utils/OrderDetailModal'

const MangeOrdering = () => {
  //발주 리스트를 담을 리스트
  const[orderFormList, setOrderFormList] = useState([])

  //처리 중인 리스트를 담을 리스트
  const[doneList, setDoneList] = useState([])

  // 선택된 주문서를 담을 리스트
  const [selectedOrders, setSelectedOrders] = useState([])

  // 처리된 목록에 추가될 객체
  const [orderOne, setOrderOne] = useState({
    orderNum:0
    , orderFormVO:
    {
      orderAmount:0
      , supplyNum:0
    }
    , doneDate:''
    , doneManger:''
  })

  // 모달 상태 변수

  const [isOpenModal, setIsOpenModal] = useState(false)

  // 화면 그리기(상부 리스트)
  useEffect(()=>{
    axios
    .get(`/order/orderFormList`)
    .then((res)=>{
      setOrderFormList(res.data)
    })
    .catch((error)=>{
      console.log('발주 리스트 에러', error)
    })
  }, [])

  // 화면 그리기(하부 리스트)
  useEffect(()=>{
    axios
    .get(`/order/doneFormList`)
    .then((res)=>{
      setDoneList(res.data)
    })
    .catch((error)=>{
      console.log('발주 리스트 에러', error)
    })
  }, [])

  // 선택한 주문서를 리스트에 담을 함수
  function handleCheckboxChange(order){
    setSelectedOrders((prevSelected) => {
      if (prevSelected.includes(order)) {
        return prevSelected.filter((item) => item !== order) // 이미 선택된 경우 해제
      } else {
        return [...prevSelected, order] // 선택한 주문 추가
      }
    })
    console.log(order)
  }


  //발주 리스트를 처리 중 리스트로 옮길 함수
  function regDone(){
    if(orderOne.doneManger==''){
      alert('처리자명을 입력해주세요')
      return
    }
    axios
    .post(`/order/regDone`, orderOne)
    .then((res)=>{
      alert('처리 중 입니다')
    })
    .catch((error)=>{
      console.log('리스트 옮기다 에러', error)
    })
    setSelectedOrders([]) // 선택된 리스트 초기화
  }


  return (
    <div className='order-div'>
      <div className='order-list-div'>
        <h4>들어온 주문서 리스트</h4>
        <input type='text' placeholder='처리자 이름을 입력하세요' onChange={(e)=>{
          setOrderOne({...orderOne,
            doneManger:e.target.value
        })
        }}/>
        <table>
          <thead>
            <tr>
              <td>선택</td>
              <td>주문번호</td>
              <td>주문 회사명</td>
              <td>상품명</td>
              <td>구매 갯수</td>
              <td>주문 일자</td>
              <td>발주자 명</td>
            </tr>
          </thead>
          <tbody>
            {/* 발주 받아온 주문서 리스트를 받아서 그려줄 것 */}
            {
              orderFormList.map((order, i)=>{
                return(
                  <tr key={i}>
                    <td>
                      <input type='checkbox' onChange={(e)=>{handleCheckboxChange(order) 
                        setOrderOne({...orderOne,
                          orderNum:order.orderNum,
                          orderFormVO:{
                            supplyNum:order.supplyNum,
                            orderAmount:order.orderAmount
                          }
                        })
                        console.log(orderOne)
                        setIsOpenModal(true)
                        }} 
                        checked={selectedOrders.includes(order)}/>
                    </td>
                    <td>{order.orderNum}</td>
                    <td>{order.customerVO.customerName}</td>
                    <td>{order.supplyList.map((list,j)=>{
                      return(
                        <span key={j}>{list.supplyName}</span>
                      )
                    })}</td>
                    <td>{order.orderAmount}개</td>
                    <td>{order.orderDate}</td>
                    <td>{order.orderManger}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div className='btn-div'>
        <button type='button' className='btn' onClick={(e)=>{regDone()}}>등록</button>
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
              <td>구매 요청 갯수</td>
              <td>처리 일자</td>
              <td>발주자 명</td>
              <td>처리자 명</td>
            </tr>
          </thead>
          <tbody>
            {/* 처리 등록된 주문서 리스트를 받아서 그려줄 것 */}
            {
              doneList.map((done, i)=>{
                return(
                  <tr key={i}>
                    <td>{doneList.length-i}</td>
                    <td>{done.orderFormVO.orderNum}</td>
                    <td>{done.orderFormVO.customerVO.customerName}</td>
                    <td>
                      {
                        done.orderFormVO.supplyList.length-1==0
                        ?
                        done.orderFormVO.supplyList[0].supplyName
                        :
                        done.orderFormVO.supplyList[0].supplyName
                        + ` 외 ${done.orderFormVO.supplyList.length-1}`
                      }
                    </td>
                    <td>{done.orderFormVO.orderAmount}개</td>
                    <td>{done.doneDate}</td>
                    <td>{done.orderFormVO.orderManger}</td>
                    <td>{done.doneManger}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      {/* 주문서 상세 정보 모달 */}
      <OrderDetailModal
      show={isOpenModal}
      onClose={()=> setIsOpenModal(false)}
      selectedOrder={selectedOrders}
      />
    </div>
    

  )
}

export default MangeOrdering
