package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.OrderFormVO;

import java.util.List;

public interface OrderFormService {
    //발주 주문서 리스트
    List<OrderFormVO> getOrderFormList();
}
