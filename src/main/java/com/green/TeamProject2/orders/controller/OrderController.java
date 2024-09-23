package com.green.TeamProject2.orders.controller;

import com.green.TeamProject2.orders.service.CustomerServiceImpl;
import com.green.TeamProject2.orders.service.ItemServiceImpl;
import com.green.TeamProject2.orders.vo.CustomerVO;
import com.green.TeamProject2.orders.vo.ItemVO;
import jakarta.annotation.Resource;
import org.springframework.boot.autoconfigure.pulsar.PulsarAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/order")
@RestController
public class OrderController {
    @Resource(name = "itemService")
    private ItemServiceImpl itemService;

    @Resource(name = "customerService")
    private CustomerServiceImpl customerService;

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

    //거래처 등록
    @PostMapping("/regCustomer")
    public void regCustomer(@RequestBody CustomerVO customerVO){
        customerService.regCustomer(customerVO);
    }
    //거래처 리스트
    @GetMapping("/getCustomerList")
    public List<CustomerVO> getCustomerList(){
        return customerService.getCustomerList();
    }

    //거래처 삭제
    @DeleteMapping("/deleteCustomer/{data}")
    public void deleteCustomer(@PathVariable(name = "data") int customerNum){
        customerService.deleteCustomer(customerNum);
    }
}
