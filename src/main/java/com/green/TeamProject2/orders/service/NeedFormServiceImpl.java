package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.NeedFormVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("needFormService")
public class NeedFormServiceImpl implements NeedFormService{

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<NeedFormVO> getNeedForm() {
        return sqlSession.selectList("orderMapper.getNeedForm");
    }

    @Override
    public List<NeedFormVO> getFalseNeedForm() {
        return sqlSession.selectList("orderMapper.getNeedFalseForm");
    }

    @Override
    public void updateNeedForm() {
        sqlSession.update("orderMapper.updateFalseAfter");
    }

    @Override
    public void pushContract(List<NeedFormVO> needFormList) {
        sqlSession.update("orderMapper.failToNone");
        sqlSession.update("orderMapper.updateNoneAfter");
    }
}
