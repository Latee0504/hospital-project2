import React, { useEffect, useState } from 'react'
import './EditItemModal.css'
const EditItemModal = ({show, onClose, onSave, item}) => {
  //메인창에서 가져온 정보를 수정창에 기본으로 가져올 데이터를 담을 객체
  const[formData, setFormData] = useState({
    supplyNum:0
    , supplyName:''
    , supplyPrice:''
    , supplyStandard:''
    , supplier:''
    , supplyCaution:''
  })

  // 모달이 열리면 기존 고객 데이터를 폼에 채워줌
  useEffect(()=>{
    if(item){
      setFormData({
        supplyNum:item.supplyNum
        , supplyName:item.supplyName
        , supplyPrice:item.supplyPrice
        , supplyStandard:item.supplyStandard
        , supplier:item.supplier
        , supplyCaution:item.supplyCaution
       
      })
    }
  }, [item])

  // 폼 데이터 변경
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  // 수정 저장 버튼 클릭
  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  if (!show) return null

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <button className='modal-close' onClick={(e)=>{onClose()}}>×</button>
        <h2>아이템 수정</h2>
        <div className='modal-content'>
          <input type='text' name='supplyName' value={formData.supplyName} onChange={(e)=>{handleChange(e)}} placeholder='상품 명'/>
          <input type='text' name='supplyPrice' value={formData.supplyPrice} onChange={(e)=>{handleChange(e)}} placeholder='상품 가격'/>
          <input type='text' name='supplyStandard' value={formData.supplyStandard} onChange={(e)=>{handleChange(e)}} placeholder='상품 규격'/>
          <input type='text' name='supplier' value={formData.supplier} onChange={(e)=>{handleChange(e)}} placeholder='공급자'/>
          <input type='text' name='supplyCaution' value={formData.supplyCaution} onChange={(e)=>{handleChange(e)}} placeholder='주의 사항'/>
        </div>
        <div className='modal-actions'>
          <button onClick={(e)=>{handleSave()}}>저장</button>
          <button onClick={(e)=>{onClose()}}>취소</button>
        </div>
      </div>     
    </div>
  )
}

export default EditItemModal
