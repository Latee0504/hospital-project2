package com.green.TeamProject2.orders.vo;

import lombok.Data;

import java.util.List;

@Data
public class OrderFormVO {
    private int orderNum;
    private String orderDate;
    private int customerNum;
    private String orderManger;
    private String orderStatus;
    private CustomerVO customerVO;//고객 정보
    private List<DetailOrderFormVO> detailOrderList;//상품 상세 정보 리스트
}

//@Data
//public class OrderFormVO {
//    private int orderNum;
//    private String orderDate;
//    private int supplyNum;
//    private int customerNum;
//    private int orderAmount; //총 주문수()
//    private String orderManger;
//    private String orderStatus;
//    private CustomerVO customerVO;//고객 정보
//    private List<SupplyVO> supplyList;//임시
//    private List<DetailOrderFormVO> detailOrderList;//상품 상세 정보 리스트
//}
