package com.green.TeamProject2.orders.vo;

import lombok.Data;

@Data
public class RepeatVO {
    private int cnt; //남은 주문 제품 갯수
    private int supplyNum; // 제품 번호
    private int offset; // 반복 횟수
    private int orderAmount;
}
