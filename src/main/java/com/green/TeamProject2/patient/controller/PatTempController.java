package com.green.TeamProject2.patient.controller;

import com.green.TeamProject2.patient.service.PatTempServiceImpl;
import com.green.TeamProject2.patient.vo.PatTempVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/patTemp")
@RestController
public class PatTempController {

    @Resource(name = "patTempService")
    private PatTempServiceImpl patTempService;

    // 온도 전부 얻는 컨트롤러
    @GetMapping("/getAllPatTemp")
    List<PatTempVO> getAllPatTemp(){
        return patTempService.getAllPetTem();
    }

}
