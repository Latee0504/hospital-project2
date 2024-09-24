package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.CustomerVO;

import java.util.List;

public interface CustomerService {
    //거래처 등록
    public void regCustomer(CustomerVO customerVO);
    //거래처 리스트
    public List<CustomerVO> getCustomerList();
    //거래처 삭제
    public void deleteCustomer(int customerNum);
    //거래처 수정
    public void updateCustomer(CustomerVO customerVO);
}
