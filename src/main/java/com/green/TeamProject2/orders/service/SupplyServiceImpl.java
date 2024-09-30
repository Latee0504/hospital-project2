package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.ContractVO;
import com.green.TeamProject2.orders.vo.SupplyVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("supplyService")
public class SupplyServiceImpl implements SupplyService{

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public void regSupply(SupplyVO supplyVO) {
        sqlSession.insert("orderMapper.regSupply", supplyVO);
    }

    @Override
    public void updateSupply(SupplyVO supplyVO) {
        sqlSession.update("orderMapper.updateSupply", supplyVO);
    }

    @Override
    public List<SupplyVO> getSupplyList() {
        return sqlSession.selectList("orderMapper.getSupplyList");
    }

    @Override
    public void deleteSupply(int supplyNum) {
        sqlSession.delete("orderMapper.deleteSupply", supplyNum);
    }

    @Override
    public List<SupplyVO> getSupplyDate(int supplyNum) {
        return sqlSession.selectList("orderMapper.getSupplyDate", supplyNum);
    }

    @Override
    public List<ContractVO> detailList(int supplyNum) {
        return sqlSession.selectList("orderMapper.detailList", supplyNum);
    }

    @Override
    public void regDetail(ContractVO contractVO) {
        sqlSession.insert("orderMapper.regDetailContract", contractVO);
    }

    @Override
    public void updateDetail(ContractVO contractVO) {
        sqlSession.update("orderMapper.updateDetailContract", contractVO);
    }

    @Override
    public void deleteDetail(int contractNum) {
        sqlSession.delete("orderMapper.deleteDetail", contractNum);
    }


}
