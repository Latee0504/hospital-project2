package com.green.TeamProject2.orders.vo.receive;

import lombok.Data;

@Data
public class SupplyVO {
    private int supplyNum;
    private String supplyName;
    private int supplyPrice;
    private String supplyStandard;
    private String supplier;
    private String supplyCaution;
    private int supplyAmount;
    private int supplyMinAmount;
    //첨부 이미지 파일명
    private String supplyImage;
}
