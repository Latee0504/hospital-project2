package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.ContractVO;
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

    //각 상품의 날짜 리스트
    public List<SupplyVO> getSupplyDate(int supplyNum);

    //상세 정보 얻기
    public ContractVO detailSupply(int supplyNum, String contractDate);

    //상세 정보 등록
    public void regDetail(ContractVO contractVO);
}
