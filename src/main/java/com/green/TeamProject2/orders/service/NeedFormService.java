package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.NeedFormVO;

import java.util.List;

public interface NeedFormService {
    // 요구 수량 얻기
    List<NeedFormVO> getNeedForm();

    // 상태가 false인 요구수량 얻기
    List<NeedFormVO> getFalseNeedForm();

    // 요구 수량 데이터 옮기기
    void updateNeedForm();

    // 정보를 토대로 상품 시키기
    void pushContract(NeedFormVO needFormVO);

    // 정보를 토대로 상품 시키기
    void pushContract2(List<NeedFormVO> needFormList);
}
