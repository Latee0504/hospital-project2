TEAM_PROJECT_2(실시간 환자 체온 대시보드)


프로젝트 소개
-
-1) 실시간 환자 체온 대시보드
- 라즈베리파이를 통해 실시간으로 환자의 체온 정보를 얻어 오고 데이터를 리액트의 차트와 캘린더를 활용해 화면을 구현하는 코드입니다.
- 조작을 통해 데이터 조회 범위를 조절하고 평균 정보, 과거 정보를 가지고는 기능을 가지고 있습니다.


개발 기간
-
- 1) 실시간 환자 체온 대시보드
-  9.9~9.27

개발자 소개
-
- 박주원(leamae): 팀장, 대시보드 차트 구현, 캘린더로 이전 날짜 데이터 받아와 차트 다시 그리는 기능 구현, 발주 요청 처리 페이지 기능 구현 담당
- 김탁현: 라즈베리파이를 통한 데이터 수집, 경고음 코드 작성
- 최윤형: 페이지 CSS
- 김세훈: 

기능 소개

1) 라즈베리로 데이터 측정 코드

2) 데이터를 통해 실시간 측정
   
     ![실시간 받아오는 데이터 1](https://github.com/user-attachments/assets/6e8a88d1-9221-4d0e-93e6-87bc7af1a702)

     ![실시간 받아오는 데이터2](https://github.com/user-attachments/assets/ef29587c-8c9c-4263-8ba1-2fc2f3524359)
  
   DB에 저장된 데이터를 chart.js를 통해 라인 그래프를 그려줌
   만약 일정 온도 이상이면 빨간색 점으로 기록

   
3) 기준 날짜를 포함한 일주일 간의 평균 체온

    ![평균 기온](https://github.com/user-attachments/assets/ee7b2dd1-51e3-46d2-ae92-4e1b852feab6)

   버튼을 통해 기준 날짜를 변경할 수 있으며 체온 정보가 없다면 버튼이 나타지않음
   

5) 기준 날짜의 하루 동안의 데이터를 시간별 30분 별로 조절하는 기능

   ![간격 평균](https://github.com/user-attachments/assets/6ce03a4a-7d48-46fc-b37c-3b1d89d66602)
   ![간격 평균 30분](https://github.com/user-attachments/assets/0ed67c64-7ae4-4c71-ba52-13cb722cf2e9)
   ![간격 평균 1시간](https://github.com/user-attachments/assets/cb3fdfe1-10fe-4e68-afbe-c9df47ac86be)

   왼쪽의 테이블에는 데이터를 텍스트로 출력해서 보여줌
   

6) 마지막 30분/ 1시간 동안의 전체 데이터를 보여주도록 조절하는 기능

   ![최근 X시간 간의 데이터](https://github.com/user-attachments/assets/66c6e645-1f65-467c-abc0-09a1fdbde607)
   ![최근 30분 간의 데이터](https://github.com/user-attachments/assets/f9a36465-d2a3-4d58-b292-541c172269ef)
   ![최근 1시간의 데이터](https://github.com/user-attachments/assets/f549ff52-27c3-4143-b51d-426e435363e9)
   

7) 데이터를 바 차트의 형식으로 보여주는 기능

   ![바 차트1](https://github.com/user-attachments/assets/3dce9c80-1bef-47a8-9f28-d410bfb874e6)
   ![바 차트2](https://github.com/user-attachments/assets/3f352591-447a-4edb-8e39-8d6c72646b23)

   최신의 10개 데이터를 보여주면서 버튼을 통해 시간과 날짜를 조절할 수 있음
   만약 일정 온도 이상이 되면 바의 색이 붉은색으로 변함
   어제 오늘의 데이터 존재하면 3번째에서 비교 결과를 텍스트로 출력해줌


8) 상세정보 페이지에서 환자의 전체 입원일 동안의 데이터와 평균, 이전 날짜 데이터 차트화 기능

   ![캘린더1](https://github.com/user-attachments/assets/b4f0bb0f-b48c-41c8-88f3-a7290ca99436)
   ![캘린더 2](https://github.com/user-attachments/assets/16c06fe9-895e-466a-ab2f-5c1ed88b572b)

   
10) 캘린더로 본 차트의 정보를 왼쪽 아래로 옮기는 기능

    ![캘린더 3](https://github.com/user-attachments/assets/236f61a5-19f3-4c71-a093-f929b62dc5df)
   ![캘린더 4](https://github.com/user-attachments/assets/60a71378-73eb-425d-b049-7197e42a7f2b)
   ![캘린더5](https://github.com/user-attachments/assets/2847ac85-8e17-41e7-99d7-e30cc0d02c55)


   


   
   
