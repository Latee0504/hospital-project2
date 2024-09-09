package com.green.TeamProject2.patient.service;

import com.green.TeamProject2.patient.vo.PatTempVO;

import java.util.List;

public interface PatTempService {
    // 환자의 체온을 받아옴
    List<PatTempVO> getAllPetTem();
}
