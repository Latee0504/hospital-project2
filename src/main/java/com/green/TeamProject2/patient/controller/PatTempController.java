package com.green.TeamProject2.patient.controller;

import com.green.TeamProject2.patient.service.PatTempServiceImpl;
import com.green.TeamProject2.patient.vo.PatTempVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/patTemp")
@RestController
public class PatTempController {

    @Resource(name = "patTempService")
    private PatTempServiceImpl patTempService;

    // 온도 전부 얻는 컨트롤러
    @PostMapping("/getAllPatTemp")
    List<PatTempVO> getAllPatTemp(@RequestBody Map<String, String> isTemp){
        return patTempService.getAllPatTemp(isTemp.get("date"));
    }

    // 최대 온도 얻는 컨트롤러
    @PostMapping("/getMax")
    PatTempVO getMaxPatTemp(@RequestBody Map<String, String> isTemp){
        return patTempService.getMaxPatTemp(isTemp.get("date"));
    }
    // 최대 온도 얻는 컨트롤러
    @PostMapping("/getMin")
    PatTempVO getMinPatTemp(@RequestBody Map<String, String> isTemp){
        return patTempService.getMinPatTemp(isTemp.get("date"));
    }



sadsadasda
}
