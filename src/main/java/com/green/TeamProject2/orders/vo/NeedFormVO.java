package com.green.TeamProject2.orders.vo;

import lombok.Data;

import java.util.List;

@Data
public class NeedFormVO {
    private int needNum;
    private int supplyNum;
    private int orderNum;
    private int needCnt;
    private String needStatus;
    private int totalCnt;
    private SupplyVO supplyVO;
    private List<OrderFormVO> orderFormList;
}
