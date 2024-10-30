# 수주 페이지 기능 (TEAM_PROJECT_2)

## 프로젝트 소개

수주사 입장에서 고객의 정보와 상품의 정보를 관리해 들어온 발주 주문서의 정보를 판독할 수 있고,
주문서를 승인하는 과정에서 재고를 확인해 재고가 부족하면 재고를 보충해 줌. 

## 개발 기간
- 2024.09.30 ~ 2024.10.30

## 사용 기술
- **프론트엔드**: React
- **백엔드**: Node.js, Java
- **데이터베이스**: MairaDB


## 설치 및 실행 방법
1. **레포지토리 클론**:
   ```bash
   git clone https://github.com/Comleamae/TeamProject2.git
   
2. **설치할 npm**

  - 페이지 이동 관련(Route, Routes, Link, navigate)
      
      npm install react-router-dom

 - 서버와 데이터 통신(Axios)
      
   npm install axios

3. **트리 구조**

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
- **박주원 (leamae)**: 팀장, 수주 기능 구현, 데이터 베이스 구성, 두 컴퓨터 간의 연결 구현
- **김탁현**: 발주 페이지 기능 구현, 두 컴퓨터 간의 연결 구현
- **최윤형**: 페이지 CSS 스타일링
- **김세훈**: (역할을 입력해주세요)

## 주요 기능

1. **고객/상품 정보**

   - 고객의 정보를 저장, 수정, 삭제해서 관리할 수 있음
   ![거래처1](https://github.com/user-attachments/assets/2b0e2048-1ae1-4e2a-908b-0be070fb705d)
   ![거래처2](https://github.com/user-attachments/assets/d8f9d5a0-9f62-43fb-b360-f6fc0ca31cb6)
   ![거래처3](https://github.com/user-attachments/assets/0fd603e0-7060-4222-91a0-0909d0f38b39)

   - 상품의 재고와 입고 날짜 정보는 상품 상세 테이블에서 관리
   - 오래된 제품 순으로 정렬
   ![아이템 등록](https://github.com/user-attachments/assets/f5d4174d-6e82-42f3-8d85-54c164c749ea)
   ![아이템 상세](https://github.com/user-attachments/assets/abc9ffb7-0d38-432e-9755-f5348045d3d6)


2. **발주사에서 보낸 주문서 정보 얻기**

   - 발주 컴퓨터에서 요청을 보낼 때 수주 컴퓨터의 데이터 베이스로 요청을 보내줌

   ![발주 신청](https://github.com/user-attachments/assets/85464b7a-627b-4bb4-877c-64180689ac5e)
   ![발주 신청2](https://github.com/user-attachments/assets/a0a7d65b-5bef-4a61-92f1-04fdb295fa2c)

3. **주문서를 토대로 주문 성공 시 기능**

   - 필요한 상품의 수가 재고수보다 적거나 같다면 성공
   - 각 상품의 오래된 재고부터 차감 -> 차감하고 남는 재고수는 따로 담아 다시 반복함->0이 될때까지 반복
   - 주문서를 완료된 리스트로 이동
   - 매출 페이지로 이동

   

4. **매출 페이지 기능**

   - 총 매출을 화면에 표시
   - 가장 많이 팔린 품목의 이름과 매출액을 표시

4. **주문서를 토대로 주문 실패 시 기능**

   - 필요한 상품의 수가 재고수보다 많다면 실패
   - 필요한 재고의 수량을 기록-> 필요 재고 수 테이블에 수록
   - 주문서를 재고 보충 페이지의 실패 리스트에 이동

5. **재고 보충 페이지의 재고 보충 기능**

   - 필요 재고 수 정보를 확인하고 병합을 누르면 필요 재고 수를 상품별로 병합함
   - 병함한 정보를 토대로 상품의 재고를 보충함
   - 실패 리스트의 주문서를 처리 대기 중인 목록으로 이동 시킴
