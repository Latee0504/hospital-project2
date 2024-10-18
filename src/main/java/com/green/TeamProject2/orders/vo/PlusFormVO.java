package com.green.TeamProject2.orders.vo;

import lombok.Data;

import java.util.List;

@Data
public class PlusFormVO {
    private int plusNum;
    private int supplyNum;
    private int needNum;
    private String dueDate;
    private List<NeedFormVO> needFormList;
}
