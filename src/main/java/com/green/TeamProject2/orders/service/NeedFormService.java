package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.NeedFormVO;

import java.util.List;

public interface NeedFormService {
    // 요구 수량 얻기
    List<NeedFormVO> getNeedForm();

    // 요구 수량 추가
    void regNeedForm(NeedFormVO needFormVO);
}
