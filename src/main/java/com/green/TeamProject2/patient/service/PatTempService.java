package com.green.TeamProject2.patient.service;

import com.green.TeamProject2.patient.vo.PatTempVO;

import java.util.List;

public interface PatTempService {
    // 환자의 체온을 받아옴
    List<PatTempVO> getAllPatTemp(String tempDate);

    //최대 온도
    PatTempVO getMaxPatTemp(String tempDate);

    //최소 온도
    PatTempVO getMinPatTemp(String tempDate);
}
