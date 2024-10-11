import React, { useEffect, useState } from 'react'
import './MangeItem.css'
import axios from 'axios'
import EditItemModal from '../utils/EditItemModal'
import ItemDetailModal from '../utils/ItemDetailModal'

const MangeItem = () => {

  const [isShow, setIsShow] = useState(false)

  //상세 데이터가 있는지 확인 할 변수
  const [inputDetail, setInputDetail] = useState(false)

  //상세 데이터를 업데이트할 수 것인가?
  const [updateDetail, setUpdateDetail] = useState(false)

  // 화면 새로 고침용 변수
  const[cnt, setCnt] = useState(0)

  // 날짜 목록 데이터
  const[dateDataList, setDateDataList] = useState([])

  // 변하는 날짜 데이터
  const[changeInfoDate, setChangeInfoDate] = useState('')

  // 등록할 아이템 정보 객체
  const[supplyData, setSupplyData] = useState({
    supplyName:''
    , supplyPrice:0
    , supplyStandard:''
    , supplier:''
    , supplyCaution:''
  })

  //체크 박스의 번호
  const [checkNum, setCheckNum] = useState(0)

  // 새로 등록할 상세 정보 객체
  const [contractData, setContractData] = useState({
    contractNum:0
    , contractDate:''
    , supplyNum:0
    , contractAmount:0
    , contractOutput:0
  })

  // 선택된 주문서를 담을 리스트
  const [selectedDetail, setSelectedDetail] = useState([])

  // 선택한 상세정보를 리스트에 담을 함수
  function handleCheckboxChange(order){
    setSelectedDetail((prevSelected) => {
      if (prevSelected.includes(order)) {
        return prevSelected.filter((item) => item !== order) // 이미 선택된 경우 해제
      } else {
        return [...prevSelected, order] // 선택한 주문 추가
      }
    })
    console.log(order)
  }


  // 아이템 상세 정보 객체
  const[detailData, setDetailData] = useState({})

  // 상세 정보 리스트
  const[detailList, setDetailList] = useState([])

  // 등록된 아이템 리스트
  const[supplyList, setSupplyList] = useState([])

  // 체인지 데이터
  function changeData(e){
    setSupplyData({
      ...supplyData,
      [e.target.name]:e.target.value
    })
  }

  // 아이템 등록 함수
  function regData(){
    if(supplyData.supplyName==''){
      alert('상품 명이 비었습니다')
      return
    }
    axios
    .post(`/order/regSupply`, supplyData)
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
    .delete(`/order/deleteSupply/${num}`)
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
    .get(`/order/getSupplyList`)
    .then((res)=>{
      setSupplyList(res.data)
      console.log(res.data)
    })
    .catch((error)=>{
      console.log('리스트 받기 에러', error)
    })
  }, [cnt, detailData, contractData])

  // 날짜 목록 얻기
  function getDateList(num){
    axios
    .get(`/order/getSupplyDate/${num}`)
    .then((res)=>{     
        setDateDataList(res.data[0].contractList)
        console.log(res.data)   
    })
    .catch((error)=>{
      console.log('날짜목록 얻기 에러', error)
      
    })
  }

  //상세 정보 리스트 얻기
  function getDetailList(num){
    axios
    .get(`/order/detailList/${num}`)
    .then((res)=>{
      setDetailList(res.data[0].contractList)
    })
    .catch((error)=>{
      console.log('상세 정보 리스트 에러', error)
    })
  }

  //모달 오픈 관리 변수(수정)
  const [isOpenModal, setIsOpenModal] = useState(false)

  // 선택된 상품 데이터
  const [selectedSupply, setSelectedSupply] = useState({
    supplyName:''
    , supplyNum:''
  });  

   // 상품 수정 모달 열기
   const openEditModal = (supply) => {
    setSelectedSupply(supply);  // 선택한 상품 정보 저장
    setIsOpenModal(supply);  // 모달 열기
  };

  // 상품 수정 저장 처리
  const saveCustomer = (updateSupply) => {
    axios
      .put(`/order/updateSupply`, updateSupply)
      .then((res) => {
        alert('수정 성공');
        setSupplyList(supplyList.map(c => c.supplyNum == selectedSupply.supplyNum ? updateSupply : c));  // 수정된 데이터 반영
        setIsOpenModal(false);
      })
      .catch((error) => {
        console.log('상품 수정 실패', error);
      });
  };

  //상품 상세 정보 모달창 오픈 여부
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false)

  // 아이템 상세정보 모달 열기
  const openDetailModal = (supply) => {
    setSelectedSupply(supply)
    setIsOpenDetailModal(supply)
  }

  // 상품 상세 정보 수정 저장 처리
  const saveDetail = (updateDetailSupply)=>{
    axios
    .put(`/order/updateDetailSupply`, updateDetailSupply)
    .then((res)=>{
      alert('상세 수정 성공')
      setIsOpenDetailModal(false)
    })
    .catch((error)=>{
      console.log('상세 수정 에러', error)
    })
  }

  //데이터 변경
  function changeDetail(e){
    setContractData({
      ...contractData,
      [e.target.name]:e.target.value
    })
  }

  //상세 정보 등록
  function regContract(){
    axios
    .post(`/order/regDetail`, contractData)
    .then((res)=>{
      alert('상세 정보 등록 성공')
    })
    .catch((error)=>{
      console.log('상세 정보 등록 에러', error)
    })
  }

  //상세 정보 수정
  function updateContract(){
    axios
    .put(`/order/updateDetail`, contractData)
    .then((res)=>{
      alert('상세 정보 수정 성공')
    })
    .catch((error)=>{
      console.log('상세 정보 수정 에러', error)
    })
  }

  //상세 정보 삭제
  function deleteDetail(data){
    axios
    .delete(`/order/deleteDetail/${data}`)
    .then((res)=>{
      alert('선택한 상세 정보 삭제 성공')
    })
    .catch((error)=>{
      console.log('상세 정보 삭제 에러', error)
    })
  }

  return (
    <div className='item-div'>
      <div className='item-reg-div'>
        <h4>아이템 등록</h4>
        <table>
          <thead>
            <tr>
              <td>제품 명</td>
              <td>제품 가격</td>
              <td>제품 규격</td>
              <td>공급 사</td>
              <td>주의 사항</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type='text' name='supplyName' onChange={(e)=>{changeData(e)}} placeholder='제품명을 입력하세요'/>
              </td>
              <td>
                <input type='number' name='supplyPrice' onChange={(e)=>{changeData(e)}} placeholder='제품 가격을 입력하세요'/>
              </td>
              <td>
                <input type='text' name='supplyStandard' onChange={(e)=>{changeData(e)}} placeholder='제품 규격을 입력하세요'/>
              </td>
              <td>
                <input type='text' name='supplier' onChange={(e)=>{changeData(e)}} placeholder='공급사를 입력하세요'/>
              </td>
              <td>
                <input type='text' name='supplyCaution' onChange={(e)=>{changeData(e)}} placeholder='주의사항을 입력하세요'/>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='div-btn'>
          <button type='button' onClick={(e)=>{regData()}} className='btn'>등록</button>
        </div>
      </div>
      <div className='detail-div'>
        <div className='item-list-div'>
          <h4>아이템 리스트</h4>
          <table>
            <thead>
              <tr>
                <td>선택</td>
                <td>등록 넘버</td>
                <td>제품 명</td>
                <td>제품 가격</td>
                <td>제품 규격</td>
                <td>공급 사</td>
                <td>주의 사항</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {
                supplyList.map((supply,i)=>{
                  return(
                  <tr key={i}>
                    <td><input type='checkbox' onChange={(e)=>{handleCheckboxChange(e)}}/></td>
                    <td>{i+1}</td>
                    <td>
                      <span onClick={(e)=>{
                        setIsShow(true)
                        setSelectedSupply({
                          ...selectedSupply,
                          supplyName:supply.supplyName,
                          supplyNum:supply.supplyNum
                        })
                        getDetailList(supply.supplyNum)
                        getDateList(supply.supplyNum)
                        setContractData({
                          ...contractData,
                          supplyNum:supply.supplyNum
                        })
                        }}>{supply.supplyName}</span>
                    </td>
                    <td>{supply.supplyPrice}원</td>
                    <td>{supply.supplyStandard}</td>
                    <td>{supply.supplier}</td>
                    <td>{supply.supplyCaution}</td>
                    <td>
                      <button type='button' className='btn' onClick={(e)=>{deleteItem(supply.supplyNum)}}>삭제</button>
                    </td>
                    <td>
                      <button type='button' className='btn' onClick={(e)=>{openEditModal(supply)}}>수정</button>
                    </td>
                  </tr>
                  )
                })
              }
              
            </tbody>
          </table>
        </div> 
        <div className='item-detail-div'>
          {
            !isShow
            ?
            <>
              <h4>상세정보가 보임</h4>
            </>
            :
            <>
              <h4>{selectedSupply.supplyName}의 상세 정보</h4>
              <table className='table-detail'>
                <thead>
                  <tr>
                    <td>
                      선택
                    </td>
                    <td>총 재고 수</td>
                    <td>입고 날짜</td>
                    <td>날짜에 입고된 수</td>
                    
                  </tr>
                </thead>
                <tbody>
                   {
                      inputDetail != false || updateDetail != false
                      ?
                      <tr>
                        {
                          updateDetail == false
                          ?
                          <>
                            <td></td>
                            <td>총 재고수</td>
                            <td><input type='text' name='contractDate' onChange={(e)=>{changeDetail(e)}} placeholder='입고 날짜를 입력하세요'/></td>
                            <td><input type='text' name='contractAmount' onChange={(e)=>{changeDetail(e)}} placeholder='입고 갯수를 입력하세요'/></td>
                            <td></td>
                          </>
                          :
                          <>
                            <td></td>
                            <td><input type='text' name='contractDate' onChange={(e)=>{changeDetail(e)}} placeholder='수정 날짜를 입력하세요'/></td>
                            <td><input type='text' name='contractAmount' onChange={(e)=>{changeDetail(e)}} placeholder='수정 갯수를 입력하세요'/></td>
                            <td></td>
                          </>
                        }
                        
                      </tr>  
                      :
                      <>
                        {
                          detailList.map((detail, i)=>{
                            const totalAmount = detailList.reduce((sum, item) => sum + item.contractAmount, 0);
                            return(
                              detailList.length==0
                              ?
                              <tr>
                                <td>재고가 없어요</td>
                              </tr>
                              :
                              <tr key={i}>
                                <td>
                                  <input type='checkbox' onChange={(e)=>{setCheckNum(detail.contractNum)}}/>
                                </td>
                                <td>{totalAmount}개</td>
                                <td>{detail.contractDate}</td>
                                <td>{detail.contractAmount}개</td>
                              </tr>
                            )
                          })
                        }
                      </>
                   }
                </tbody>
              </table>
               {
                inputDetail != false || updateDetail != false
                ?
                <div className='control-button'>
                  {
                    updateDetail == false
                    ?
                    <button type='button' className='btn' onClick={(e)=>{
                      setInputDetail(false)
                      regContract()
                    }}>등록 하기</button>
                    :
                    <button type='button' className='btn' onClick={(e)=>{
                      setUpdateDetail(false)
                      updateContract()
                    }}>수정 하기</button>
                  }
                </div>
                :
                <div className='control-button'>
                  <button type='button' className='btn' onClick={(e)=>{setInputDetail(true)}}>새로 등록</button>
                  <button type='button' className='btn' onClick={(e)=>{setUpdateDetail(true)}}>수정</button>
                  <button type='button' className='btn' onClick={(e)=>{deleteDetail(checkNum)}}>삭제</button>
                </div>}
            </>
          }
        </div>
      </div>
      {/* 아이템 수정 모달 */}
        <EditItemModal
          show={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          onSave={saveCustomer}
          supply={selectedSupply}
        />
        {/* 아이템 상세 정보 수정 모달 */}
        <ItemDetailModal
          show={isOpenDetailModal}
          onClose={()=>{setIsOpenDetailModal(false)}}
          onSave={saveDetail}
          supply={selectedSupply}
        />
    </div>
  )
}

export default MangeItem
