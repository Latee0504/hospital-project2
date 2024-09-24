package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.SupplyVO;

import java.util.List;

public interface SupplyService {
    //등록
    public void regSupply(SupplyVO supplyVO);

    //수정
    public void updateSupply(SupplyVO supplyVO);

    //리스트
    public List<SupplyVO> getSupplyList();

    //삭제
    public void deleteSupply(int supplyNum);
}
