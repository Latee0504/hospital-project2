package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.DoneFormVO;
import com.green.TeamProject2.orders.vo.OrderFormVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("orderFormService")
public class OrderFormServiceImpl implements OrderFormService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<OrderFormVO> getOrderFormList() {
        return sqlSession.selectList("orderMapper.getOrderForm");
    }

    @Override
    public void regDone(DoneFormVO doneFormVO) {
        sqlSession.insert("orderMapper.regDoneForm", doneFormVO);
        sqlSession.update("orderMapper.regDoneAfter", doneFormVO);
    }


}
