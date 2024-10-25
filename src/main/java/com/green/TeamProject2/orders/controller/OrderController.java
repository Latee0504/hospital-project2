package com.green.TeamProject2.orders.controller;

import com.green.TeamProject2.orders.service.*;
import com.green.TeamProject2.orders.service.receive.OrderService;
import com.green.TeamProject2.orders.service.receive.OrderServiceImpl;
import com.green.TeamProject2.orders.vo.*;
import com.green.TeamProject2.orders.vo.receive.OrderVO;
import com.green.TeamProject2.orders.vo.receive.OrderedSupplyVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
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

    @Resource(name = "receiveService")
    private OrderServiceImpl orderService;

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
        boolean[] result = orderFormService.regDoneMange(doneFormVO);

        // 모든 재고가 충분해서 빼는데 성공했을 때 실행
        if (allStocksSufficient(result)) { // 모든 주문서가 성공했는지 확인하는 메서드
            orderFormService.regDone(doneFormVO);
        }
        else {
            // 주문서 중 하나라도 실패했다면
            orderFormService.regFailAfter(doneFormVO);
        }
        return result;
    }

    // 필요 상품 리스트 얻기
    @GetMapping("/needFormList")
    public List<NeedFormVO> getNeedForm(){
        return needFormService.getNeedForm();
    }

    // 필요 상품인데 상태가 FALSE인 리스트 얻기
    @GetMapping("/needFormFalseList")
    public List<NeedFormVO> getFalseNeedFrom(){
        return needFormService.getFalseNeedForm();
    }

    // False인 리스트의 정보로 contract채우기
    @PostMapping("/pushContract")
    public void pushContract(@RequestBody List<NeedFormVO> needFormList){
        needFormService.pushContract(needFormList);
    }

    // 필요 상품 상태 false로 만들기
    @PutMapping("/updateFalse")
    public void updateFalseAfter(){
        needFormService.updateNeedForm();
    }

    // 처리 실패한 주문서 리스트 얻기
    @GetMapping("/failFormList")
    public List<OrderFormVO> getFailOrderForm(){
        return orderFormService.getFailFormList();
    }

    // contract 채우기
    @PostMapping("/regContractMange")
    public void regContactMange(@RequestBody List<NeedFormVO> needFormList){
        orderFormService.regContractMange(needFormList);
    }

    @PostMapping("/order/receiveOrder")
    public void receiveOrder(@RequestBody OrderVO orderVO){
        // 필요한 데이터 (주문 정보)

            // 다른 컴에서 보내준 주문서의 결과 등록

            // 주문서 틀 등록 기능
            orderService.commitOrder(orderVO);
            System.out.println(orderVO);

            // 주문서 상세 등록 기능(orderVO에 주문 정보리스트 추가)
            orderService.commitOrderedSupply(orderVO.getOrderedSupplyList());


        // 내 컴에서 실행할 기능

        // 맞춰서 세팅
        orderFormService.regOrderForm(orderVO);

        // 만들어진 내 주문의 번호를 얻어야함
        int res = orderFormService.getMyOrderNum();

        for(int i = 0; i< orderVO.getOrderedSupplyList().size(); i++){
            orderVO.getOrderedSupplyList().get(i).setOrderNum(res);
        }
        System.out.println(orderVO);

       // 상세 맞춰서 세팅
        for(int i = 0; i <orderVO.getOrderedSupplyList().size(); i++){
           orderFormService.regDetailOrder(orderVO.getOrderedSupplyList().get(i));
        }

    }
}
