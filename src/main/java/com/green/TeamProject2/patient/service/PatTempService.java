package com.green.TeamProject2.patient.service;

import com.green.TeamProject2.patient.vo.PatTempVO;

import java.util.List;

public interface PatTempService {
    //전체 체온 정보
    List<PatTempVO> getAll();

    // 환자의 체온을 받아옴(10개)
    List<PatTempVO> getAllPatTemp(String tempDate);

    //최대 온도
    PatTempVO getMaxPatTemp(String tempDate);

    //최소 온도
    PatTempVO getMinPatTemp(String tempDate);

    //전체 평균 온도
    PatTempVO getAvg();

    //선택 날짜의 평균
    PatTempVO getAvgWhen(String tempDate);
}
