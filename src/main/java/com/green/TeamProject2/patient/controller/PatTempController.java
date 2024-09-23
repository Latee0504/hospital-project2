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

    // 온도 전부 얻음
    @GetMapping("/getAll")
    List<PatTempVO> getAll(){
        return patTempService.getAll();
    }

    // 온도 10개 얻는 컨트롤러
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

    // 최대 최소 평균 온도 얻는 컨트롤러
    @PostMapping("/getMath")
    PatTempVO getMaxMinPatTemp(@RequestBody Map<String, String> isTemp){
        return patTempService.getPateTemp(isTemp.get("date"));
    }

    // 전체 평균 컨트
    @GetMapping("/getAvg")
    PatTempVO getAvg(){
        return patTempService.getAvg();
    }

    // 선택한 날짜의 평균
    @PostMapping("/getAvgWhen")
    PatTempVO getAvgWhen(@RequestBody Map<String, String> isTemp){
        return patTempService.getAvgWhen(isTemp.get("date"));
    }

    // 전체 진료일 수
    @GetMapping("/getAllDate")
    int getAllDate(){
        return patTempService.getAllDate();
    }

    //60분으로 나눠진 당일 평균 온도
    @PostMapping("/getDataByH")
    List<PatTempVO> getDataByH(@RequestBody Map<String, String> isTemp){
        return patTempService.getDataByH(isTemp.get("date"));
    }

    //30분으로 나눠진 당일 평균 온도
    @PostMapping("/getDataByM")
    List<PatTempVO> getDataByM(@RequestBody Map<String, String> isTemp){
        return patTempService.getDataByM(isTemp.get("date"));
    }

    //현재 시간으로 부터 60분 간의 데이터
    @PostMapping("/getDuringH")
    List<PatTempVO> getDuringH(@RequestBody Map<String, String> isTemp){
        return patTempService.getDuringH(isTemp.get("date"));
    }

    //현재 시간으로 부터 30분 간의 데이터
    @PostMapping("/getDuringM")
    List<PatTempVO> getDuringM(@RequestBody Map<String, String> isTemp){
        return patTempService.getDuringM(isTemp.get("date"));
    }

    //진료일자를 하루 씩
    @PostMapping("/getDateByWeek")
    List<PatTempVO> getDateByWeek(@RequestBody Map<String, String> isTemp){
        return patTempService.getAllDateByWeek(isTemp.get("date"));
    }

    //바차트에서 사용할 데이터
    @PostMapping("/change")
    List<PatTempVO> getChangePatTemp(@RequestBody Map<String,Object> isTemp){
        String tempDate = (String) isTemp.get("date");
        int cnt = (Integer) isTemp.get("cnt");
        return patTempService.getChangePatTemp(tempDate, cnt);
    }
}
