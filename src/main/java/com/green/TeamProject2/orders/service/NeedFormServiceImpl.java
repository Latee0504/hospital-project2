package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.NeedFormVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void regNeedForm(NeedFormVO needFormVO) {
        sqlSession.insert("orderMapper.regNeedForm", needFormVO);
    }
}
