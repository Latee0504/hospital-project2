package com.green.TeamProject2.patient.service;

import com.green.TeamProject2.patient.vo.PatTempVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service("patTempService")
public class PatTempServiceImpl implements PatTempService{

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<PatTempVO> getAllPetTem() {
        return sqlSession.selectList("patTemMapper.getAllPetTemp");
    }
}
