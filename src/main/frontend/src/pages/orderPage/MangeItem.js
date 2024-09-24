import React, { useEffect, useState } from 'react'
import './MangeItem.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import EditItemModal from '../utils/EditItemModal'
import ItemDetailModal from '../utils/ItemDetailModal'

const MangeItem = () => {

 

  // 화면 새로 고침용 변수
  const[cnt, setCnt] = useState(0)

  // 등록할 아이템 정보 객체
  const[supplyData, setSupplyData] = useState({
    supplyName:''
    , supplyPrice:0
    , supplyStandard:''
    , supplier:''
    , supplyCaution:''
  })

  // 아이템 상세 정보 객체
  const [detailDate, setDetailData] = useState({
    ...supplyData,
    contractInventoryAmount:0
  })

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
    })
    .catch((error)=>{
      console.log('리스트 받기 에러', error)
    })
  }, [cnt])

  //모달 오픈 관리 변수(수정)
  const [isOpenModal, setIsOpenModal] = useState(false)

  // 선택된 상품 데이터
  const [selectedSupply, setSelectedSupply] = useState(null);  

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
      setDetailData()
      setIsOpenDetailModal(false)
    })
    .catch((error)=>{
      console.log('상세 수정 에러', error)
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
              <td>제품 가격</td>
              <td>제품 규격</td>
              <td>공급 사</td>
              <td>주의 사항</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {
              supplyList.map((supply,i)=>{
                return(
                <tr key={i}>
                  <td><input type='checkbox'/></td>
                  <td>{i+1}</td>
                  <td>
                    <span onClick={(e)=>{openDetailModal(supply)}}>{supply.supplyName}</span>
                  </td>
                  <td>{supply.supplyPrice}</td>
                  <td>{supply.supplyStandard}</td>
                  <td>{supply.supplier}</td>
                  <td>{supply.supplyCaution}</td>
                  <td>
                    <button type='button' className='btn' onClick={(e)=>{deleteItem(supply.supplyNum)}}>삭제</button>
                    <button type='button' className='btn' onClick={(e)=>{
                     openEditModal(supply)
                    }}>수정</button>
                  </td>
                </tr>
                )
              })
            }
            
          </tbody>
        </table>
        {/* 아이템 수정 모달 */}
        <EditItemModal
          show={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          onSave={saveCustomer}
          supply={selectedSupply}
        />
        {/* 아이템 상세 정보 모달 */}
        <ItemDetailModal
          show={isOpenDetailModal}
          onClose={()=>{setIsOpenDetailModal(false)}}
          onSave={saveDetail}
          supply={selectedSupply}
        />
      </div>
    </div>
  )
}

export default MangeItem
