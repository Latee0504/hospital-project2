import React, { useEffect, useRef, useState } from 'react'
import './MangeCustomer.css'
import axios from 'axios'

const MangeCustomer = () => {

  // 화면 새로 고침용 변수
  const[cnt, setCnt] = useState(0)

  //전체 거래처 목록 리스트를 담을 변수
  const [customerList, setCustomerList] = useState([])

  //이메일 참조 변수
  const emailF = useRef()
  const emailB = useRef()

  //등록할 거래처 정보를 저장할 변수
  const [regData, setRegData] = useState({
    customerName:''
    , customerLiNum:''
    , customerHeadName:''
    , customerAddress:''
    , customerTel:''
    , customerEmail:''
    , customerEtc: ''
  })

  //입력받은 데이터로 바꾸는 함수
  function changeData(e){
    setRegData({
      ...regData,
      [e.target.name]:e.target.name!='customerEamil'
                                    ?e.target.value
                                    :emailF.current.value+emailB.current.value
    }
    )
    console.log(regData)
  }


  //거래처 리스트 받아오기
  useEffect(()=>{
    axios
    .get(`/order/getCustomerList`)
    .then((res)=>{})
    .catch((error)=>{
      console.log('거래처 리스트 구성 실패', error)
    })
  }, [cnt])

  //거래처 등록 함수
  function regCustomer(){
    axios
    .post(`/order/regCustomer`, regData)
    .then((res)=>{
      alert('등록성공')
    })
    .catch((error)=>{
      console.log('거래처 등록 실패', error)
    })
  }

  //이메일 따로 받기
  const ref = useRef()

  return (
    <div className='customer-div'>
      <div className='customer-header'>
        <div className='simple-info-div'>
          <h4>거래처 등록</h4>
          <div className='simple-info'>
            <table>
              <tbody>
                <tr>
                  <td>
                    회사명:  
                  </td>
                  <td>
                    <input type='text' name='customerName' placeholder='회사명을 입력하세요' onChange={(e)=>{changeData(e)}}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    사업자 번호:
                  </td>
                  <td> 
                    <input type='text' name='customerLiNum' placeholder='사업자 번호를 입력하세요' onChange={(e)=>{changeData(e)}}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    대표자명:
                  </td>
                  <td> 
                    <input type='text' name='customerHeadName' placeholder='대표자명을 입력하세요' onChange={(e)=>{changeData(e)}}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className='detail-info-div'>
          <h4>거래처 상세 정보</h4>
          <div className='detail-info'>
            <table>
              <tbody>
                <tr>
                  <td>주소:</td>
                  <td>
                    <input type='text' name='customerAddress' placeholder ='사업장 소재지를 입력하세요' onChange={(e)=>{changeData(e)}}/>
                  </td>
                </tr>
                <tr>
                  <td>연락처:</td>
                  <td> 
                    <input type='text' name='customerTel' placeholder='사업장 연락처를 입력하세요' onChange={(e)=>{changeData(e)}}/>
                  </td>
                </tr>
                <tr>
                  <td>이메일:</td>
                  <td> 
                    <input type='text' placeholder='이메일 앞자리를 입력하세요' name='customerEmail'/>
                     @
                    <select>
                      <option>gmail.com</option>
                      <option>naver.com</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>비고:</td>
                  <td> 
                  <input type='text' name='customerEtc' placeholder='기타 정보가 있다면 입력하세요' onChange={(e)=>{changeData(e)}}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='btn-div'>
        <button type='button' className='btn' onClick={(e)=>{regCustomer()}}>등록</button>
      </div>
      <div className='customer-content'>
        <h4>거래처 목록</h4>
        <table>
          <thead>
            <tr>
              <td>거래처 이름</td>
              <td>사업자 번호</td>
              <td>대표자명</td>
              <td>주소</td>
              <td>연락처</td>
              <td>이메일</td>
              <td>비고</td>
            </tr>
          </thead>
          <tbody>
            {/* 여기에 반복문으로 리스트 그려줌 */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MangeCustomer
