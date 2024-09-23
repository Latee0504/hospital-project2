package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.ItemVO;

import java.util.List;

public interface ItemService {
    //아이템 등록
    public void regItem(ItemVO itemVO);

    //상품 전체 리스트
    public List<ItemVO> getItemList();

    //선택한 아이템 삭제
    public void deleteItem(int itemNum);
}
