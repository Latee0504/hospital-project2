import React, { useEffect, useState } from 'react'
import './ItemDetailModal.css'

const ItemDetailModal = ({show, onClose, onSave, item}) => {
  //이름을 누른 데이터를 가져와 담을 객체
  const[formData, setFormData] = useState({
    supplyNum:0
    , supplyName:''
    , supplyPrice:''
    , supplyStandard:''
    , supplier:''
    , supplyCaution:''
    , contrarctInventoryAmount:''
  })

  //모달이 열리면 기존 아이템의 데이터를 폼에 채워줌
  useEffect(()=>{
    if(item){
      setFormData({
        supplyNum:item.supplyNum
        , supplyName:item.supplyName
        , supplyPrice:item.supplyPrice
        , supplyStandard:item.supplyStandard
        , supplier:item.supplier
        , supplyCaution:item.supplyCaution
        , contrarctInventoryAmount:item.supplier
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
        <h2>아이템 상세 수정</h2>
        <div className='modal-content'>
         
        </div>
        <div className='modal-actions'>
          <button onClick={(e)=>{handleSave()}}>저장</button>
          <button onClick={(e)=>{onClose()}}>취소</button>
        </div>
      </div>     
    </div>
  )
}

export default ItemDetailModal
