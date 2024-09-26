package com.green.TeamProject2.orders.service;

import com.green.TeamProject2.orders.vo.DoneFormVO;

import java.util.List;

public interface DoneFormService {
    //처리 리스트 얻기
    List<DoneFormVO> getDoneForm();
}
