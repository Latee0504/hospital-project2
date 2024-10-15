package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.ContractVO;
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
    public void regDoneMange(List<OrderFormVO> orderFormList) {

        // 반복돌려 생성한 객체를 담을 리스트
        List<RepeatVO> repeatList = new ArrayList<>();

    // 주문 상세 목록 만큼 반복 시켜야함
    for(int j = 0; j<orderFormList.size(); j++){

        // 반복할 횟수
        List<ContractVO> contractList = sqlSession.selectList("orderMapper.getOneRemain", orderFormList.get(j).getSupplyNum());

        // 만약 재고수의 총합이 주문량보다 적으면 오류를 발생 재고 추가
        // 재고수를 담을 변수 필요, 오류가 발생하면 추가 발주 필요
        int eachTotalCnt = 0;

        // 반복되는 반복횟수 cnt를 담아 주기 위해 만들어준 배열
        int [] amountArray = new int[contractList.size()];

        // 반복하는 횟수 변수 정하기(음수가 되면 정지)
        int repeatCnt = 1;
        // 구매요청된 갯수의 변수(리스트가 들어오며 j가 반복될때 수량이 변경)
        int buyCnt = orderFormList.get(j).getOrderAmount();

        // 반복문으로 각 물품의 총 재고수 구하기
        for(int i = 0; i< contractList.size(); i++){
            eachTotalCnt = eachTotalCnt + contractList.get(i).getContractAmount();
        }

        if(eachTotalCnt<=orderFormList.get(j).getOrderAmount()){
            System.out.println("재고 수가 부족합니다");
        }
        //전체 상세정보의 목록
        for(int i = 0; i<contractList.size(); i++){
            // 만약 해당 날짜의 재고수가 구매요청 수 보다 작다면 반복횟수를 증가시키고 구매요청수에서 재고수를 빼 재고수를 배열 cnt의 값을 0으로 만들어 줌
            if(contractList.get(i).getContractAmount()<buyCnt){
                repeatCnt++;
                amountArray[i] = 0;
                buyCnt = buyCnt - contractList.get(i).getContractAmount();
            }
            // 구매요청 수 가 재고 수 보다 작다면 배열에 해당 날짜의 배열에서 구매요청수를 빼준 값을 넣어줌()
            // 과요청 시 어떻게 해결할지 생각해보자
            else {
                amountArray[i] = contractList.get(i).getContractAmount()-buyCnt;
                break;
            }
        }

        if(repeatCnt > 0 && contractList != null && !contractList.isEmpty()){
            // 반복을 돌려 객체를 만듬(실행 횟수만큼)
            for(int i = 0;  i < repeatCnt; i++){
                // 반복문을 돌릴 객체(남은수, 물품번호, 반복수)
                RepeatVO repeatVO = new RepeatVO();
                repeatVO.setCnt(amountArray[i]);
                repeatVO.setSupplyNum(orderFormList.get(j).getSupplyNum());
                repeatVO.setOffset(i);
                repeatList.add(repeatVO);
            }
        }

        System.out.println(repeatList);
        for(int i = 0; i< repeatList.size(); i++){
            sqlSession.update("orderMapper.regDoneMange", repeatList.get(i));
        }
    }
    }
}
