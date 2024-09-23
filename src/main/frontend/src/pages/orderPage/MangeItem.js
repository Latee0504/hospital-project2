import React, { useEffect, useState } from 'react'
import './MangeItem.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MangeItem = () => {

  const navigate = useNavigate()

  // 화면 새로 고침용 변수
  const[cnt, setCnt] = useState(0)

  // 등록할 아이템 정보 객체
  const[itemData, setItemData] = useState({
    itemName:''
    , itemCnt:0
    , itemHireDate:''
    , itemPrice:0
    , itemPeriod:''
  })

  // 등록된 아이템 리스트
  const[itemList, setItemList] = useState([])

  // 체인지 데이터
  function changeData(e){
    setItemData({
      ...itemData,
      [e.target.name]:e.target.value
    })
    console.log(itemData)
  }

  // 아이템 등록 함수
  function regData(){
    axios
    .post(`/order/regItem`, itemData)
    .then((res)=>{
      console.log('등록 성공')
    })
    .catch((error)=>{
      console.log('등록에서 에러', console.log(error))
    })
    setCnt(cnt+1)
  }

  // 아이템 삭제 함수
  function deleteItem(num){
    axios
    .delete(`/order/deleteItem/${num}`)
    .then((res)=>{
      alert('삭제 성공')
    })
    .catch((error)=>{
      console.log('삭제 실패', console.log(error))
    })
    setCnt(cnt-1)
  }

  //화면 그리기용
  useEffect(()=>{
    axios
    .get(`/order/getItemList`)
    .then((res)=>{
      setItemList(res.data)
    })
    .catch((error)=>{
      console.log('리스트 받기 에러', error)
    })
  }, [cnt])

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
              <td>보관 기한</td>
              <td>제품 가격</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type='text' name='itemName' onChange={(e)=>{changeData(e)}} placeholder='제품명을 입력하세요'/>
              </td>
              <td>
                <input type='number' name='itemCnt' onChange={(e)=>{changeData(e)}} placeholder='재고 수를 입력하세요'/>
              </td>
              <td>
                <input type='text' name='itemHireDate' onChange={(e)=>{changeData(e)}} placeholder='최근 입고일을 입력하세요'/>
              </td>
              <td>
                <input type='text' name='itemPeriod' onChange={(e)=>{changeData(e)}} placeholder='보관 기한을 입력하세요'/>
              </td>
              <td>
                <input type='number' name='itemPrice' onChange={(e)=>{changeData(e)}} placeholder='제품 가격을 입력하세요'/>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type='button' onClick={(e)=>{regData()}} className='btn'>등록</button>
        </div>
      </div>
      <div className='item-list-div'>
        <h4>아이템 리스트</h4>
        <table>
          <thead>
            <tr>
              <td>선택</td>
              <td>등록 넘버</td>
              <td>제품 명</td>
              <td>재고 수</td>
              <td>최근 입고일</td>
              <td>보관 기한</td>
              <td>제품 가격</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {
              itemList.map((item,i)=>{
                return(
                <tr key={i}>
                  <td><input type='checkbox'/></td>
                  <td>{i+1}</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemCnt}</td>
                  <td>{item.itemHireDate}</td>
                  <td>{item.itemPeriod}</td>
                  <td>{item.itemPrice}</td>
                  <td>
                    <button type='button' className='btn' onClick={(e)=>{deleteItem(item.itemNum)}}>삭제</button>
                    <button type='button' className='btn' onClick={(e)=>{
                     navigate()
                    }}>수정</button>
                  </td>
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

export default MangeItem
