package com.green.TeamProject2.orders.controller;

import com.green.TeamProject2.orders.service.*;
import com.green.TeamProject2.orders.vo.*;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/order")
@RestController
public class OrderController {

    @Resource(name = "customerService")
    private CustomerServiceImpl customerService;

    @Resource(name = "supplyService")
    private SupplyServiceImpl supplyService;

    @Resource(name = "orderFormService")
    private OrderFormServiceImpl orderFormService;

    @Resource(name = "doneFormService")
    private DoneFormServiceImpl doneFormService;

    @Resource(name = "needFormService")
    private NeedFormServiceImpl needFormService;

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

    //상품 상세
    @GetMapping("/detailList/{num}")
    public List<ContractVO> detailList(@PathVariable(name = "num") int supplyNum){
        return supplyService.detailList(supplyNum);
    }

    // 상품 상세 등록
    @PostMapping("/regDetail")
    public void regDetail(@RequestBody ContractVO contractVO){
        supplyService.regDetail(contractVO);
    }

    // 상품 상세 수정
    @PutMapping("/updateDetail")
    public void updateDetail(@RequestBody ContractVO contractVO){
        supplyService.updateDetail(contractVO);
    }

    // 상품 상세 삭제
    @DeleteMapping("/deleteDetail/{data}")
    public void deleteDetail(@PathVariable(name = "data") int contractNum){
        supplyService.deleteDetail(contractNum);
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
    @GetMapping("/orderFormList")
    public List<OrderFormVO> getOrderForm(){
       return orderFormService.getOrderFormList();
    }

    //처리된 주문서 리스트
    @GetMapping("/doneFormList")
    public List<DoneFormVO> getDoneForm(){
        return doneFormService.getDoneForm();
    }

    // 모든 재고가 충분한지 확인하는 메서드
    private boolean allStocksSufficient(boolean[] results) {
        for (boolean res : results) {
            if (!res) {
                return false; // 하나라도 실패하면 false 반환
            }
        }
        return true; // 모든 주문서가 성공하면 true 반환
    }

    //주문서 처리 등록
    @PostMapping("/regDone")
    public boolean[] regDone(@RequestBody DoneFormVO doneFormVO){
        System.out.println(doneFormVO);

        //결과가 어떤지 담을 배열
        boolean[] result = orderFormService.regDoneMange(doneFormVO);;

        // 모든 재고가 충분해서 빼는데 성공했을 때 실행
        if (allStocksSufficient(result)) { // 모든 주문서가 성공했는지 확인하는 메서드
            orderFormService.regDone(doneFormVO);
        }
        return result;
    }

    @GetMapping("/needFormList")
    public List<NeedFormVO> getNeedForm(){
        return needFormService.getNeedForm();
    }

}
