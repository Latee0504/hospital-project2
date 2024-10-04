package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.DoneFormVO;
import com.green.TeamProject2.orders.vo.OrderFormVO;
import com.green.TeamProject2.orders.vo.RepeatVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("orderFormService")
public class OrderFormServiceImpl implements OrderFormService{


    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<OrderFormVO> getOrderFormList() {
        return sqlSession.selectList("orderMapper.getOrderForm");
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void regDone(DoneFormVO doneFormVO) {
        sqlSession.insert("orderMapper.regDoneForm", doneFormVO);
        sqlSession.update("orderMapper.regDoneAfter", doneFormVO);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    // 트랜지션을 위한 반복과 그 횟수를 담을 변수 추가, 반복문을 통한 결과를 담을 변수
    // 반복을 돌릴 경우 횟수는 List<Contract>의 길이 만큼 돌려야한다.
    public void regDoneMange(OrderFormVO orderFormVO) {

        int  = sqlSession.selectList(" ");
       //객체를 구성한 값들을 구해야하는데
        for(int i = 1; i<; i++){

        }




        // 반복을 돌려 객체를 만듬(실행 횟수만큼)
        for(int i = 0;  i < /*실행한 횟수*/; i++){
            // 반복문을 돌릴 객체(남은수, 물품번호, 반복수)
            RepeatVO repeatVO = new RepeatVO();
            repeatVO.setCnt(0+);
            repeatVO.setSupplyNum(orderFormVO.getSupplyNum());
            repeatVO.setOffset(0+i);
        }




        for(int i = 0; i<= ; i++){
            sqlSession.update("orderMapper.regDoneMange", orderFormVO);
        }




        //완성본용에는 다른게 필요함 VO 정보를 담을 리스트 받아야함
    }


}
