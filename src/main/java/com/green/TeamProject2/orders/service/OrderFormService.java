package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.DoneFormVO;
import com.green.TeamProject2.orders.vo.NeedFormVO;
import com.green.TeamProject2.orders.vo.OrderFormVO;
import com.green.TeamProject2.orders.vo.receive.OrderVO;
import com.green.TeamProject2.orders.vo.receive.OrderedSupplyVO;
import com.green.TeamProject2.orders.vo.receive.SupplyVO;

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

    //처리 주문서로 옮기면서 재고 처리하는 기능(성공 실패 리턴)
    public boolean[] regDoneMange(DoneFormVO doneFormVO);

    // 부족 수량 종합을 토대로 반복 돌려서
    public void regContractMange(List<NeedFormVO> needFormList);

    // 등록 기능
    public void regOrderForm(OrderVO orderVO);

    // 상세 등록 기능
    public void regDetailOrder(OrderedSupplyVO orderedSupplyVO);
}
