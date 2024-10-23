package com.green.TeamProject2.orders.vo;

import lombok.Data;

import java.util.List;

@Data
public class DoneFormVO {
    private int doneNum;
    private int orderNum;
    private String doneDate;
    private String doneManager;
    private List<OrderFormVO> orderFormList;//발주 주문서 정보
}
