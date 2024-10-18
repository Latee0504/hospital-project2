package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.ContractVO;
import com.green.TeamProject2.orders.vo.DoneFormVO;
import com.green.TeamProject2.orders.vo.OrderFormVO;

import java.util.List;

public interface OrderFormService {
    //발주 주문서 리스트
    public List<OrderFormVO> getOrderFormList();

    //처리 주문서로 옮기기
    public void regDone(DoneFormVO doneFormVO);

    //주문서의 처리 상태를 fail로
    public void regFailAfter(DoneFormVO doneFormVO);

    // 상태가 fail인 주문서 리스트 얻기
    public List<OrderFormVO> getFailFormList();

    // 상태가 FAIL인 것을 NONE으로



    //처리 주문서로 옮기면서 재고 처리하는 기능(성공 실패 리턴)
    public boolean[] regDoneMange(DoneFormVO doneFormVO);

}
