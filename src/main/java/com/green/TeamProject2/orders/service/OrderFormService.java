package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.DoneFormVO;
import com.green.TeamProject2.orders.vo.OrderFormVO;

import java.util.List;

public interface OrderFormService {
    //발주 주문서 리스트
    List<OrderFormVO> getOrderFormList();

    //처리 주문서로 옮기기
    void regDone(DoneFormVO doneFormVO);

    //처리 주문서로 옮기면서 재고 처리하는 기능
    void regDoneMange(OrderFormVO orderFormVO);
}
