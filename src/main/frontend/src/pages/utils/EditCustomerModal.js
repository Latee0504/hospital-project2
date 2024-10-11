
import React, { useState, useEffect } from 'react';
import './EditCustomerModal.css';  // 모달 스타일 파일

const EditCustomerModal = ({show, onClose, onSave, customer}) => {
  //메인창에서 가져온 정보를 수정창에 기본으로 가져올 데이터를 담을 객체
  const [formData, setFormData] = useState({
    customerNum:0,
    customerName: '',
    customerLi: '',
    customerHeadName: '',
    customerAddress: '',
    customerTel: '',
    customerEmail: '',
    customerEtc: ''
  })

  // 모달이 열리면 기존 고객 데이터를 폼에 채워줌
  useEffect(() => {
    if (customer) {
      setFormData({
        customerNum:customer.customerNum,
        customerName: customer.customerName,
        customerLi: customer.customerLi,
        customerHeadName: customer.customerHeadName,
        customerAddress: customer.customerAddress,
        customerTel: customer.customerTel,
        customerEmail: customer.customerEmail,
        customerEtc: customer.customerEtc
      })
    }
  }, [customer])

  // 폼 데이터 변경 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // 수정 저장 버튼 클릭 
  const handleSave = () => {
    onSave(formData)  // 부모 컴포넌트에 수정된 데이터를 전달
    onClose()  // 모달 닫기
  }

  if (!show) return null  // 모달이 열리지 않았으면 렌더링하지 않음

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={(e)=>{onClose()}}>×</button>
        <h2>거래처 수정</h2>
        <div className="modal-content">
          <input type="text" name="customerName" value={formData.customerName} onChange={(e)=>{handleChange(e)}} placeholder="회사명" />
          <input type="text" name="customerLi" value={formData.customerLi} onChange={(e)=>{handleChange(e)}} placeholder="사업자 번호" />
          <input type="text" name="customerHeadName" value={formData.customerHeadName} onChange={(e)=>{handleChange(e)}} placeholder="대표자명" />
          <input type="text" name="customerAddress" value={formData.customerAddress} onChange={(e)=>{handleChange(e)}} placeholder="주소" />
          <input type="text" name="customerTel" value={formData.customerTel} onChange={(e)=>{handleChange(e)}} placeholder="연락처" />
          <input type="text" name="customerEmail" value={formData.customerEmail} onChange={(e)=>{handleChange(e)}} placeholder="이메일" />
          <input type="text" name="customerEtc" value={formData.customerEtc} onChange={(e)=>{handleChange(e)}} placeholder="비고" />
        </div>
        <div className="modal-actions">
          <button onClick={(e)=>{handleSave()}}>저장</button>
          <button onClick={(e)=>{onClose()}}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default EditCustomerModal;
