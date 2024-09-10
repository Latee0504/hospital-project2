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
    public List<PatTempVO> getAll() {
        return sqlSession.selectList("patTempMapper.getAll");
    }

    @Override
    public List<PatTempVO> getAllPatTemp(String tempDate) {
        return sqlSession.selectList("patTempMapper.getAllPatTemp", tempDate);
    }

    @Override
    public PatTempVO getMaxPatTemp(String tempDate) {
        return sqlSession.selectOne("patTempMapper.getMaxPatTemp", tempDate);
    }

    @Override
    public PatTempVO getMinPatTemp(String tempDate) {
        return sqlSession.selectOne("patTempMapper.getMinPatTemp", tempDate);
    }

    @Override
    public PatTempVO getAvg() {
        return sqlSession.selectOne("patTempMapper.getAvg");
    }
}
