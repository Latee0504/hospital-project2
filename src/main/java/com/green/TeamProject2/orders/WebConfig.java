package com.green.TeamProject2.orders;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // 모든 경로에 대해 CORS 허용(메소드 허용 여부)
                .allowedOrigins("http://localhost:3000")  // 허용할 도메인 설정
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // 허용할 HTTP 메서드 설정
                .allowedHeaders("*")  // 허용할 헤더 설정(쿠키, 권한)
                .allowCredentials(true);  // 쿠키를 포함한 인증 정보 허용
    }
}

