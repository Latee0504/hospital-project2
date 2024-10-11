package com.green.TeamProject2.orders.vo;

import lombok.Data;

@Data
public class DoneFormVO {
    private int doneNum;
    private int orderNum;
    private String doneDate;
    private String doneManger;
    private OrderFormVO orderFormVO;//발주 주문서 정보
}
