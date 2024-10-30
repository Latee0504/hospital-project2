# 실시간 환자 체온 대시보드 (TEAM_PROJECT_2)

## 프로젝트 소개
실시간 환자 체온 대시보드는 라즈베리파이를 통해 환자의 체온 정보를 실시간으로 수집하고, 이를 리액트의 차트와 캘린더 컴포넌트를 사용하여 시각적으로 표현하는 대시보드입니다. 사용자는 데이터 조회 범위를 조절할 수 있으며, 평균 체온 정보와 과거 데이터를 확인할 수 있는 다양한 기능을 제공합니다.

## 개발 기간
- 2024.09.09 ~ 2024.09.27

## 사용 기술
- **프론트엔드**: React, chart.js, FullCalendar
- **백엔드**: Node.js, Java
- **데이터베이스**: MairaDB
- **하드웨어**: Raspberry Pi

## 설치 및 실행 방법
1. **레포지토리 클론**:
   ```bash
   git clone https://github.com/Comleamae/TeamProject2.git
   
2. **설치할 npm**
   
  - 1)axios 등 기본 설치
     
     - 페이지 이동 관련(Route, Routes, Link, navigate)

       -npm install react-router-dom

     - 서버와 데이터 통신(Axios)

       -npm install axios
  - 2)캘린더 라이브러리
     - npm i react-calendar   
  - 3)차트 라이브러리
     - npm install chart.js react-chartjs-2
  - 4)리액트 쿼리 라이브러리
     - npm install react-query
     - npm install @tanstack/react-query
   
## 디렉토리 트리
      📦src
       ┣ 📂craft
       ┃ ┣ 📜NewBarChart.js
       ┃ ┗ 📜NewLineChart.js
       ┣ 📂layout
       ┃ ┣ 📜MainLayout.css
       ┃ ┣ 📜MainLayout.js
       ┃ ┣ 📜SubLayout.css
       ┃ ┗ 📜SubLayout.js
       ┣ 📂pages
       ┃ ┣ 📂orderPage
       ┃ ┃ ┣ 📜MangeCustomer.css
       ┃ ┃ ┣ 📜MangeCustomer.js
       ┃ ┃ ┣ 📜MangeItem.css
       ┃ ┃ ┣ 📜MangeItem.js
       ┃ ┃ ┣ 📜MangeOrdering.css
       ┃ ┃ ┗ 📜MangeOrdering.js
       ┃ ┣ 📂otherFunctionPage
       ┃ ┃ ┣ 📜RequiresPage.css
       ┃ ┃ ┣ 📜RequiresPage.js
       ┃ ┃ ┣ 📜SalesPage.css
       ┃ ┃ ┗ 📜SalesPage.js
       ┃ ┣ 📂utils
       ┃ ┃ ┣ 📜EditCustomerModal.css
       ┃ ┃ ┣ 📜EditCustomerModal.js
       ┃ ┃ ┣ 📜EditItemModal.css
       ┃ ┃ ┣ 📜EditItemModal.js
       ┃ ┃ ┣ 📜ItemDetailModal.css
       ┃ ┃ ┣ 📜ItemDetailModal.js
       ┃ ┃ ┣ 📜OrderDetailModal.css
       ┃ ┃ ┣ 📜OrderDetailModal.js
       ┃ ┃ ┣ 📜SalesDetailModal.css
       ┃ ┃ ┗ 📜SalesDetailModal.js
       ┃ ┣ 📜DetailChart.css
       ┃ ┣ 📜DetailChart.js
       ┃ ┣ 📜Orders.css
       ┃ ┣ 📜Orders.js
       ┃ ┣ 📜TempChart.css
       ┃ ┗ 📜TempChart.js
       ┣ 📜App.css
       ┣ 📜App.js
       ┣ 📜App.test.js
       ┣ 📜index.css
       ┣ 📜index.js
       ┣ 📜logo.svg
       ┣ 📜reportWebVitals.js
       ┣ 📜reset.css
       ┗ 📜setupTests.js
             

## 개발자 소개
- **박주원 (leamae)**: 팀장, 대시보드 차트 구현, 캘린더로 이전 날짜 데이터를 받아와 차트를 다시 그리는 기능, 발주 요청 처리 페이지 기능 담당
- **김탁현**: 라즈베리파이를 통한 데이터 수집, 경고음 코드 작성
- **최윤형**: 페이지 CSS 스타일링
- **김세훈**: (역할을 입력해주세요)

## 주요 기능
### 1. 라즈베리파이를 통한 데이터 측정
라즈베리파이로 실시간 체온 데이터를 수집하는 코드입니다.
온도센서를 통해 온도를 측정, 특정 온도 이상일 경우 부저센서를 통해 경보를 울립니다.
scheduler를 이용하여 일정 시간마다 온도를 측정하도록 합니다.

![라즈베리 진동수](https://github.com/user-attachments/assets/8af37eb5-e022-493c-9370-629a97293eff)
![라즈베리 db연결](https://github.com/user-attachments/assets/329e561d-dd8e-4ba8-acdf-7d5b1b3b4917)

### 2. 실시간 데이터 시각화
데이터베이스에 저장된 데이터를 `chart.js`를 활용하여 실시간 라인 그래프로 시각화하며, 특정 온도 이상일 경우 빨간색 점으로 표시합니다.

![실시간 받아오는 데이터1](https://github.com/user-attachments/assets/6e8a88d1-9221-4d0e-93e6-87bc7af1a702)
![실시간 받아오는 데이터2](https://github.com/user-attachments/assets/ef29587c-8c9c-4263-8ba1-2fc2f3524359)

### 3. 기준 날짜를 포함한 일주일 간의 평균 체온
기준 날짜를 포함하여 일주일간의 평균 체온을 확인할 수 있으며, 데이터가 없을 경우 버튼이 나타나지 않습니다.

![평균 기온](https://github.com/user-attachments/assets/ee7b2dd1-51e3-46d2-ae92-4e1b852feab6)

### 4. 하루 동안의 데이터를 시간별로 조절하는 기능
기준 날짜의 데이터를 30분 또는 1시간 간격으로 조절하여 확인할 수 있습니다. 왼쪽 테이블에는 해당 데이터를 텍스트로 출력합니다.

![간격 평균](https://github.com/user-attachments/assets/6ce03a4a-7d48-46fc-b37c-3b1d89d66602)
![간격 평균 30분](https://github.com/user-attachments/assets/0ed67c64-7ae4-4c71-ba52-13cb722cf2e9)
![간격 평균 1시간](https://github.com/user-attachments/assets/cb3fdfe1-10fe-4e68-afbe-c9df47ac86be)

### 5. 마지막 30분/1시간 동안의 데이터 조회
마지막 30분 또는 1시간 동안의 데이터를 확인할 수 있으며, 바 차트로 시각화합니다.

![최근 X시간 간의 데이터](https://github.com/user-attachments/assets/66c6e645-1f65-467c-abc0-09a1fdbde607)
![최근 30분 간의 데이터](https://github.com/user-attachments/assets/f9a36465-d2a3-4d58-b292-541c172269ef)
![최근 1시간의 데이터](https://github.com/user-attachments/assets/f549ff52-27c3-4143-b51d-426e435363e9)

### 6. 데이터 바 차트 시각화
최근 10개의 데이터를 바 차트 형식으로 보여주며, 특정 온도 이상일 경우 해당 바의 색이 붉은색으로 표시됩니다. 어제와 오늘의 데이터를 비교하여 텍스트로 출력해줍니다.

![바 차트1](https://github.com/user-attachments/assets/3dce9c80-1bef-47a8-9f28-d410bfb874e6)
![바 차트2](https://github.com/user-attachments/assets/3f352591-447a-4edb-8e39-8d6c72646b23)

### 7. 상세정보 페이지
환자의 입원 기간 동안의 데이터를 차트로 시각화하고, 평균 및 이전 날짜의 데이터를 조회할 수 있습니다.

![캘린더1](https://github.com/user-attachments/assets/b4f0bb0f-b48c-41c8-88f3-a7290ca99436)
![캘린더2](https://github.com/user-attachments/assets/16c06fe9-895e-466a-ab2f-5c1ed88b572b)

### 8. 캘린더에서 선택한 차트 정보 이동
캘린더를 통해 선택한 차트 정보를 화면 아래로 이동시킬 수 있습니다.

![캘린더3](https://github.com/user-attachments/assets/236f61a5-19f3-4c71-a093-f929b62dc5df)
![캘린더4](https://github.com/user-attachments/assets/60a71378-73eb-425d-b049-7197e42a7f2b)
![캘린더5](https://github.com/user-attachments/assets/2847ac85-8e17-41e7-99d7-e30cc0d02c55)

   


   
   
