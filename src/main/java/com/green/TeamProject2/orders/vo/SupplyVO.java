package com.green.TeamProject2.orders.vo;

import lombok.Data;

import java.util.List;

@Data
public class SupplyVO {
    private int supplyNum;
    private String supplyName;
    private int supplyPrice;
    private String supplyStandard;
    private String supplier;
    private String supplyCaution;
    private List<ContractVO> contractList;
}
