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
    public void pushContract(NeedFormVO needFormVO) {
        sqlSession.insert("orderMapper.needToContract", needFormVO);
        sqlSession.update("orderMapper.updateNoneAfter");
        sqlSession.update("orderMapper.failToNone");
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void pushContract2(List<NeedFormVO> needFormList){
        for(int i=0; i<needFormList.size(); i++){

        }
    }
}
