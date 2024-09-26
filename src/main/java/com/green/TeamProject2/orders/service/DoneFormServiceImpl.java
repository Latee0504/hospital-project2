package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.DoneFormVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("doneFormService")
public class DoneFormServiceImpl implements DoneFormService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<DoneFormVO> getDoneForm() {
        return sqlSession.selectList("orderMapper.getDoneForm");
    }
}
