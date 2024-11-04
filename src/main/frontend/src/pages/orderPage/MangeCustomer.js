import React, { useEffect, useRef, useState } from 'react'
import './MangeCustomer.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import EditCustomerModal from '../utils/EditCustomerModal'

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
    , customerLi:''
    , customerHeadName:''
    , customerAddress:''
    , customerTel:''
    , customerEmail:''
    , customerEtc: ''
  })

  //모달 오픈 관리 변수
  const [isOpenModal, setIsOpenModal] = useState(false)

  // 선택된 거래처 데이터
  const [selectedCustomer, setSelectedCustomer] = useState(null);  

  // 입력받은 데이터로 바꾸는 함수
  function changeData(e) {
    

    // 이메일 입력 처리
    if (e.target.name == 'customerEmail') {
      const emailFront = emailF.current.value;
      const emailBack = emailB.current.value;
      setRegData({...regData, customerEmail: emailFront + emailBack});
    } else {
      setRegData({...regData, [e.target.name]: e.target.value});
    }

    console.log(regData);
  }


  //거래처 리스트 받아오기
  useEffect(()=>{
    axios
    .get(`/order/getCustomerList`)
    .then((res)=>{
      setCustomerList(res.data)
    })
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
    setCnt(cnt+1)
  }

  //거래처 삭제 함수
  function deleteCutomer(num){
    axios
    .delete(`/order/deleteCustomer/${num}`)
    .then((res)=>{
      alert(`삭제 성공`)
    })
    .catch((error)=>{
      console.log(`삭제 실패`, console.log(error))
    })
    setCnt(cnt-1)
  }

  // 거래처 수정 모달 열기
  const openEditModal = (customer) => {
    setSelectedCustomer(customer);  // 선택한 거래처 정보 저장
    setIsOpenModal(customer);  // 모달 열기
  };

  // 거래처 수정 저장 처리
  const saveCustomer = (updatedCustomer) => {
    axios
      .put(`/order/updateCustomer`, updatedCustomer)
      .then((res) => {
        alert('수정 성공');
        setCustomerList(customerList.map(c => c.customerNum == selectedCustomer.customerNum ? updatedCustomer : c));  // 수정된 데이터 반영
        setIsOpenModal(false);
      })
      .catch((error) => {
        console.log('거래처 수정 실패', error);
      });
  };

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
                    회사명
                  </td>
                  <td>
                    <input type='text' name='customerName' placeholder='회사명을 입력하세요' onChange={(e)=>{changeData(e)}}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    사업자 번호
                  </td>
                  <td> 
                    <input type='text' name='customerLi' placeholder='사업자 번호를 입력하세요' onChange={(e)=>{changeData(e)}}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    대표자명
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
                    <input ref={emailF} type='text' onChange={(e)=>{changeData(e)}} placeholder='이메일 앞자리를 입력하세요' name='customerEmail'/> @ <select ref={emailB} onChange={(e)=>{changeData(e)}} name='customerEmail'>
                      <option value={'@gmail.com'}>gmail.com</option>
                      <option value={'@naver.com'}>naver.com</option>
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
        <button type='button' className='btn9' onClick={(e)=>{regCustomer()}}>등록하기</button>
      </div>
      
      <div className='customer-content'>
        <h4>거래처 목록</h4>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>거래처 이름</td>
              <td>사업자 번호</td>
              <td>대표자명</td>
              <td>주소</td>
              <td>연락처</td>
              <td>이메일</td>
              <td>비고</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {
              customerList.map((customer, i)=>{
                return(
                  <tr key={i}>
                    <td><input type='checkbox'/></td>
                    <td>{customer.customerName}</td>
                    <td>{customer.customerLi}</td>
                    <td>{customer.customerHeadName}</td>
                    <td>{customer.customerAddress}</td>
                    <td>{customer.customerTel}</td>
                    <td>{customer.customerEmail}</td>
                    <td>{customer.customerEtc}</td>
                    <td>
                      <button type='button' className='btnD' onClick={(e)=>{deleteCutomer(customer.customerNum)}}>삭제</button>
                      <button type='button' className='btnN' onClick={(e)=>{
                      openEditModal(customer)
                      }}>수정</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      {/* 거래처 수정 모달 */}
      <EditCustomerModal
        show={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onSave={saveCustomer}
        customer={selectedCustomer}
      />
      </div>
    </div>
  )
}

export default MangeCustomer
