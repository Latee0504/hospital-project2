package com.green.TeamProject2.orders.service.receive;

import com.green.TeamProject2.orders.vo.receive.OrderVO;
import com.green.TeamProject2.orders.vo.receive.OrderedSupplyVO;
import com.green.TeamProject2.orders.vo.receive.SupplyVO;

import java.util.List;

    public interface OrderService {

        List<SupplyVO> selectAllSupply();

        int getOrderAmount(int orderNum);

        boolean checkSupply(String supplyName);

        void registSupply(SupplyVO supplyVO);

        List<OrderVO> getAllOrder();

        void commitOrder(OrderVO orderVO);

        void commitOrderedSupply(List<OrderedSupplyVO> orderedSupply);

        List<SupplyVO> getOrderSupplyList(int orderNum);

        void updateOrderSupply(List<OrderedSupplyVO> orderedSupplyList);

        void updateOrderStatus(int orderNum);

        void updateSupplyAmount(int orderNum);

        void cancelOrder(int orderNum);
    }

