package com.green.TeamProject2.orders.vo;
// 주문서에 등록할 아이템 리스트

import lombok.Data;

import java.util.List;

@Data
public class DetailOrderFormVO {
    private int detailOrderNum;
    private int orderNum;
    private int supplyNum;
    private int orderAmount; //주문 갯수
    private SupplyVO supplyVO; //상품 정보를 가져옴
    private int totalPrice; //상품가격과 갯수를 곱한 값
}
