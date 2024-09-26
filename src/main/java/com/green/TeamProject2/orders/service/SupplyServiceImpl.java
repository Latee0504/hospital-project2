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
    public ContractVO detailSupply(int supplyNum, String contractDate) {
        Map<String, Object> params = new HashMap<>();
        params.put("supplyNum", supplyNum);
        params.put("contractDate", contractDate);
        return sqlSession.selectOne("orderMapper.detailSupply", params);
    }

    @Override
    public void regDetail(ContractVO contractVO) {
        sqlSession.insert("orderMapper.regDetailContract", contractVO);
    }


}
