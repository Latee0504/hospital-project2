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
    public PatTempVO getPateTemp(String tempDate) {
        return sqlSession.selectOne("patTempMapper.getPatTemp", tempDate);
    }

    @Override
    public PatTempVO getAvg() {
        return sqlSession.selectOne("patTempMapper.getAvg");
    }

    @Override
    public PatTempVO getAvgWhen(String tempDate) {
        return sqlSession.selectOne("patTempMapper.getAvgWhen", tempDate);
    }

    @Override
    public int getAllDate() {
        return sqlSession.selectOne("patTempMapper.getAllDate");
    }

    @Override
    public List<PatTempVO> getDataByH(String tempDate) {
        return sqlSession.selectList("patTempMapper.getDataByH", tempDate);
    }

    @Override
    public List<PatTempVO> getDataByM(String tempDate) {
        return sqlSession.selectList("patTempMapper.getDataByM", tempDate);
    }

    @Override
    public List<PatTempVO> getDuringH(String tempDate) {
        return sqlSession.selectList("patTempMapper.getDuringH", tempDate);
    }

    @Override
    public List<PatTempVO> getDuringM(String tempDate) {
        return sqlSession.selectList("patTempMapper.getDuringM", tempDate);
    }

    @Override
    public List<PatTempVO> getAllDateByWeek(String tempDate) {
        return sqlSession.selectList("patTempMapper.getAllDateByWeek", tempDate);
    }
}
