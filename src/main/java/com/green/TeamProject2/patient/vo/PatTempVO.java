package com.green.TeamProject2.patient.vo;

import lombok.Data;

@Data
public class PatTempVO {
    private int tempNum;
    private float temp;
    private String tempDate;
    private String date; //각 날짜별 데이터
    private int hour; //각 시간별 데이터
    private int minute; //30분 데이터
}
