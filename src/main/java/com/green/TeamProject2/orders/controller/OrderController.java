package com.green.TeamProject2.orders.controller;

import com.green.TeamProject2.orders.service.CustomerServiceImpl;
import com.green.TeamProject2.orders.service.SupplyServiceImpl;
import com.green.TeamProject2.orders.vo.ContractVO;
import com.green.TeamProject2.orders.vo.CustomerVO;
import com.green.TeamProject2.orders.vo.SupplyVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/order")
@RestController
public class OrderController {

    @Resource(name = "customerService")
    private CustomerServiceImpl customerService;

    @Resource(name = "supplyService")
    private SupplyServiceImpl supplyService;

    //상품 등록
    @PostMapping("/regSupply")
    public void regSupply(@RequestBody SupplyVO supplyVO){
        supplyService.regSupply(supplyVO);
    }

    //상품 리스트
    @GetMapping("/getSupplyList")
    public List<SupplyVO> getSupplyList(){
        return supplyService.getSupplyList();
    }

    //상품 삭제
    @DeleteMapping("/deleteSupply/{data}")
    public void deleteSupply(@PathVariable(name = "data") int supplyNum){
        supplyService.deleteSupply(supplyNum);
    }

    //상품 수정
    @PutMapping("/updateSupply")
    public void updateSupply(@RequestBody SupplyVO supplyVO){
        supplyService.updateSupply(supplyVO);
    }

    // 상품 상세
    @GetMapping("/detailSupply/{data}/{date}")
    public ContractVO detailSupply(@PathVariable(name = "data") int supplyNum, @PathVariable(name = "date") String contractDate){
        return supplyService.detailSupply(supplyNum, contractDate);
    }

    // 상품 별 날짜 목록
    @GetMapping("/getSupplyDate/{data}")
    public List<SupplyVO> getSupplyDate(@PathVariable(name = "data") int supplyNum){
        return supplyService.getSupplyDate(supplyNum);
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

    //거래처 수정
    @PutMapping("/updateCustomer")
    public void updateCustomer(@RequestBody CustomerVO customerVO){
        customerService.updateCustomer(customerVO);
    }

    //발주된 주문서 리스트
}
