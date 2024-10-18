package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.*;
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

    @Override
    public void regFailAfter(DoneFormVO doneFormVO) {
        sqlSession.update("orderMapper.regFailAfter", doneFormVO);
    }

    @Override
    public List<OrderFormVO> getFailFormList() {
        return sqlSession.selectList("orderMapper.getFailOrderForm");
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    // 트랜지션을 위한 반복과 그 횟수를 담을 변수 추가, 반복문을 통한 결과를 담을 변수
    // 반복을 돌릴 경우 횟수는 List<Contract>의 길이 만큼 돌려야한다.
    public boolean[] regDoneMange(DoneFormVO doneFormVO) {

        // 반복돌려 생성한 객체를 담을 리스트
        List<RepeatVO> repeatList = new ArrayList<>();

        // 반복문의 결과를 담을 배열
        boolean [] repeatResult = new boolean[doneFormVO.getOrderFormList().size()];

        // 배열반복의 결과를 담을 변수
        boolean result = true;

        //전체 반복에 대해 부족한 것에 대한 정보들을 담을 리스트
        List<NeedFormVO> needList = new ArrayList<>();

        // 주문 상세 목록 만큼 반복 시켜야함
        for(int j = 0; j< doneFormVO.getOrderFormList().size(); j++){

            // 반복할 횟수
            List<ContractVO> contractList = sqlSession.selectList("orderMapper.getOneRemain", doneFormVO.getOrderFormList().get(j).getSupplyNum());

            // 반복 하나에 대한 부족한 것을 담을 정보 객체
            NeedFormVO needFormVO = new NeedFormVO();

            // 반복되는 반복횟수 cnt를 담아 주기 위해 만들어준 배열
            int [] amountArray = new int[contractList.size()];

            // 반복하는 횟수 변수 정하기(음수가 되면 정지)
            int repeatCnt = 1;
            // 구매요청된 갯수의 변수(리스트가 들어오며 j가 반복될때 수량이 변경)
            int buyCnt = doneFormVO.getOrderFormList().get(j).getOrderAmount();

            // 만약 재고수의 총합이 주문량보다 적으면 오류를 발생 재고 추가
            // 재고수를 담을 변수 필요, 오류가 발생하면 추가 발주 필요
            int eachTotalCnt = 0;

            // 반복문으로 각 물품의 총 재고수 구하기
            for(int i = 0; i< contractList.size(); i++){
                eachTotalCnt = eachTotalCnt + contractList.get(i).getContractAmount();
            }

            if(eachTotalCnt<=buyCnt){
                // 이 정보는 필요 재고 테이블로 가져갈거임=>새 VO가 필요함
                System.out.println(doneFormVO.getOrderFormList().get(j).getSupplyNum()+ "번 상품의 " + "재고 수가 부족합니다");
                System.out.println("재고의 총 합은 "+ eachTotalCnt);
                System.out.println("주문 수량은" + buyCnt);
                System.out.println("추가 필요 수량은 "+ (buyCnt - eachTotalCnt));
                System.out.println("주문 번호는 " + doneFormVO.getOrderFormList().get(j).getOrderNum());

                needFormVO.setSupplyNum(doneFormVO.getOrderFormList().get(j).getSupplyNum());
                needFormVO.setOrderNum(doneFormVO.getOrderNum());
                needFormVO.setNeedCnt((buyCnt-eachTotalCnt));

                needList.add(needFormVO);
                // 필요 수량 추가
                sqlSession.insert("orderMapper.regNeedForm", needFormVO);

                // 재고가 부족하면 부족한 재고 수를 필요 재고 테이블에 삽입, (fk로 가져올 정보는 어느 주문에서 부족했는가?, 어느 제품이 부족했는가?)

                // 리액트에서 안내창을 띄우려면 어떻게 해야하나? => 특정 값을 띄워주고 리턴하면 되나?
                repeatResult[j] = false;
                continue;
            }


            //전체 상세정보의 목록에서
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
                    repeatVO.setSupplyNum(doneFormVO.getOrderFormList().get(j).getSupplyNum());
                    repeatVO.setOffset(i);
                    repeatList.add(repeatVO);
                }
                System.out.println(repeatList);
                repeatResult[j] = true;
            }

        }
        boolean allTrue = true;
        for (boolean value : repeatResult) {
            if (!value) {
                allTrue = false;
                break;
            }
        }

        if (allTrue) {
            System.out.println("모든 값이 true이므로 기능을 실행합니다.");
            // 실행할 기능 추가
            // 실제로 조건을 만족해서 재고의 변화를 주는 쿼리의 실행은 이 부분에서 한다
            for(int i = 0; i< repeatList.size(); i++){
                sqlSession.update("orderMapper.regDoneMange", repeatList.get(i));
            }
        }
        return repeatResult;
    }
}
