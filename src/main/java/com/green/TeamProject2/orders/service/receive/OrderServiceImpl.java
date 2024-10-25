package com.green.TeamProject2.orders.service.receive;

import com.green.TeamProject2.orders.vo.receive.OrderVO;
import com.green.TeamProject2.orders.vo.receive.OrderedSupplyVO;
import com.green.TeamProject2.orders.vo.receive.SupplyVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

    @Service("receiveService")
    public class OrderServiceImpl implements OrderService {
        @Autowired
        private SqlSessionTemplate sqlSession;

        // 재고 조회 시 모든 물품 조회
        @Override
        public List<SupplyVO> selectAllSupply() {
            return sqlSession.selectList("receiveMapper.selectAllSupply");
        }

        @Override
        public int getOrderAmount(int orderNum) {
            return sqlSession.selectOne("receiveMapper.getOrderAmount", orderNum);
        }

        //물품 등록 시 중복 확인
        @Override
        public boolean checkSupply(String supplyName) {
            //중복 물품 없다면 가능
            if (sqlSession.selectOne("receiveMapper.checkSupply", supplyName) == null){
                return true;
            }
            else{
                return false;
            }
        }

        // 새로운 물품 등록
        @Override
        public void registSupply(SupplyVO supplyVO) {
            sqlSession.insert("receiveMapper.registSupply", supplyVO);
        }


        @Override
        public List<OrderVO> getAllOrder() {
            return sqlSession.selectList("receiveMapper.getAllOrder");
        }

        //발주 버튼 눌렀을 때 confirmOrder 2개 실행
        @Override
        public void commitOrder(OrderVO orderVO) {
            sqlSession.insert("receiveMapper.commitOrder", orderVO);
        }

        @Override
        public void commitOrderedSupply(List<OrderedSupplyVO> orderedSupply) {
            for (OrderedSupplyVO supply : orderedSupply) {
                // 각 supply에 대해 INSERT 실행
                sqlSession.insert("receiveMapper.commitOrderedSupply", supply);
            }
        }

        @Override
        public List<SupplyVO> getOrderSupplyList(int orderNum) {
            return sqlSession.selectList("receiveMapper.getOrderSupplyList", orderNum);
        }

        @Override
        public void updateOrderSupply(List<OrderedSupplyVO> orderedSupply) {
            for (OrderedSupplyVO supply : orderedSupply) {
                //각 supply에 대해 update진행
                sqlSession.update("receiveMapper.updateOrderSupply", supply);
            }
        }

        @Override
        public void updateOrderStatus(int orderNum) {
            sqlSession.update("receiveMapper.updateOrderStatus", orderNum);
        }

        @Override
        public void updateSupplyAmount(int orderNum) {
            sqlSession.update("receiveMapper.updateSupplyAmount", orderNum);
        }

        @Override
        public void cancelOrder(int orderNum) {
            sqlSession.update("receiveMapper.cancelOrder", orderNum);
        }
    }


