package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.ItemVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("itemService")
public class ItemServiceImpl implements ItemService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public void regItem(ItemVO itemVO) {
        sqlSession.insert("orderMapper.regItem", itemVO);
    }

    @Override
    public List<ItemVO> getItemList() {
        return sqlSession.selectList("orderMapper.getItemList");
    }

    @Override
    public void deleteItem(int itemNum) {
        sqlSession.delete("orderMapper.deleteItem", itemNum);
    }
}
