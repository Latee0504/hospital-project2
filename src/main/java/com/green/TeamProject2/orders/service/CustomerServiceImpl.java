package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.CustomerVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service("customerService")
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public void regCustomer(CustomerVO customerVO) {
        sqlSession.insert("orderMapper.regCustomer", customerVO);
    }

    @Override
    public List<CustomerVO> getCustomerList() {
        return sqlSession.selectList("orderMapper.getCustomerList");
    }

    @Override
    public void deleteCustomer(int customerNum) {
        sqlSession.delete("orderMapper.deleteCustomer", customerNum);
    }

    @Override
    public void updateCustomer(CustomerVO customerVO) {
        sqlSession.update("orderMapper.updateCustomer", customerVO);
    }
}
