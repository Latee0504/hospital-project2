package com.green.TeamProject2.orders.vo;

import lombok.Data;

import java.util.List;

@Data
public class OrderFormVO {
    private int orderNum;
    private String orderDate;
    private int supplyNum;
    private int customerNum;
    private int orderAmount;
    private String orderManger;
    private CustomerVO customerVO;//고객 정보
    private List<SupplyVO> supplyList;//상품 정보 리스트
}
