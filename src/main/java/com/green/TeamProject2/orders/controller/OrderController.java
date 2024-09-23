package com.green.TeamProject2.orders.controller;

import com.green.TeamProject2.orders.service.ItemServiceImpl;
import com.green.TeamProject2.orders.vo.ItemVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/order")
@RestController
public class OrderController {
    @Resource(name = "itemService")
    private ItemServiceImpl itemService;

    //아이템 등록
    @PostMapping("/regItem")
    public void regItem(@RequestBody ItemVO itemVO){
        itemService.regItem(itemVO);
    }

    //아이템 리스트
    @GetMapping("/getItemList")
    public List<ItemVO> getItemList(){
        return itemService.getItemList();
    }

    //아이템 삭제
    @DeleteMapping("/deleteItem/{data}")
    public void deleteItem(@PathVariable(name = "data") int itemNum){
        itemService.deleteItem(itemNum);
    }
}
