import React, { useEffect, useState } from 'react'
import './RequiresPage.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RequiresPage = () => {


  const navigate = useNavigate()

  // 화면 변경용 변수
  const [cnt, setCnt] = useState(0)

  // 부족한 재고 담을 리스트
  const [needList, setNeedList] = useState([])

  // 실패한 요청을 담을 리스트
  const[failList, setFailList] = useState([])

  // 추가 요청된 기록을 담을 리스트
  const [plusList, setPlusList] = useState([])

  // 부족한 재고 리스트에 불러오기
  useEffect(()=>{
    axios
    .get(`/order/needFormList`)
    .then((res)=>{
      setNeedList(res.data)
      console.log(needList)
    })
    .catch((error)=>{
      console.log('부족한 재고 리스트 얻기 에러',error)
    })
  }, [])

  // 실패한 주문서 리스트 불러오기
  useEffect(()=>{
    axios
    .get(`/order/failFormList`)
    .then((res)=>{
      setFailList(res.data)
    })
    .catch((error)=>{
      console.log('실패한 주문서 리스트 얻기 에러', error)
    })
  }, [])

  // 추가 요청된 리스트 불러오기
  useEffect(()=>{
    axios
    .get(`/order/needFormFalseList`)
    .then((res)=>{
      setPlusList(res.data)
      console.log(res.data)
    })
    .catch((error)=>{
      console.log('추가 요청된 기록 리스트 얻기 에러', error)
    })
  }, [])

  // 부족한 리스트에서 추가 리스트로 옮기는 함수
  const passPlus = ()=>{
    if(needList.length==0){
      alert('없음')
      return ;
    }
    axios
    .put(`/order/updateFalse`)
    .then((res)=>{
      console.log(res.data)
    })
    .catch((error)=>{
      console.log('옮기기 에러', error)
    })
  }

   // 재고 추가할 함수
   const regContract = ()=>{

    if(plusList.length==0){
      alert('없음')
      return ;
    }

    axios
    .post(`/order/pushContract`, plusList)
    .then((res)=>{
      alert('재고 보충 성공')
      navigate(`/orders/item`)
    })
    .catch((error)=>{
      console.log('재고 보충 실패', error)
    })
   }

  return (
    <div className='requires-div'>
      
     <div className='requires-list-div'>
        <div className='fail-order-div'>
          <h4>실패한 주문서 리스트</h4>
          <table>
            <thead>
              <tr>
                <td>주문번호</td>
                <td>주문 회사명</td>
                <td>상품명</td>
                <td>구매 갯수</td>
                <td>주문 일자</td>
                <td>발주자 명</td>
              </tr>
            </thead>
            <tbody>
              {/* 실패한 주문서 리스트*/}
              {
                failList.map((fail, i)=>{
                  return(
                    <tr key={i}>
                      <td>{fail.orderNum}</td>
                      <td>{fail.customerVO.customerName}</td>
                      <td>{
                      fail.detailOrderList.length==1
                      ?
                      (fail.detailOrderList[0].supplyVO.supplyName)
                      :
                      (fail.detailOrderList[0].supplyVO.supplyName) + ' 외 ' + (fail.detailOrderList.length-1)+'개'
                    }</td>
                    <td>
                      {fail.detailOrderList.reduce((total, item) => total + item.orderAmount, 0)}개
                    </td>
                    <td>{fail.orderDate}</td>
                    <td>{fail.orderManager}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <h4>재고 추가 주문</h4>
        <div className='requries-functon-div'>
          <div className='need-list-div'>
            <h4>부족한 재고 리스트</h4>
            <table>
              <thead>
                <tr>
                  <td>리스트번호</td>
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
                        <td>{i+1}</td>
                        <td>{need.orderNum}</td>
                        <td>{need.supplyVO.supplyName}</td>
                        <td>{need.needCnt}개</td>
                      </tr>
                    )
                  })
                  
                }
              </tbody>
            </table>
          </div>
          <div>
              <button type='button' className='btn' onClick={()=>{passPlus()}}>병합하기</button>
          </div>
          <div className='plus-list-div'>
            <h4>추가 요청 리스트</h4>
            <table>
              <thead>
                <tr>
                  <td>상품번호</td>
                  <td>상품이름</td>
                  <td>총 갯수</td>
                </tr>
              </thead>
              <tbody>
                {/* 왼쪽의 내용을 합쳐서 하나의 품목에 대한 것으로 바꾼 리스트 */}
                {
                  plusList.map((plus,i)=>{
                    return(
                      <tr key={i}>
                        <td>{plus.supplyNum}</td>
                        <td>{plus.supplyVO.supplyName}</td>
                        <td>{plus.totalCnt}개</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <button type='button' className='btn' onClick={(e)=>{
              regContract()
            }}>주문하기</button>
          </div>
        </div>
     </div>
    </div>
  )
}

export default RequiresPage
