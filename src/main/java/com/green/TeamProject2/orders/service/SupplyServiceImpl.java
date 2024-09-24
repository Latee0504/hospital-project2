package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.SupplyVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
