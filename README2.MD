# 프로젝트 - 수주 시스템 ( 병원 연동 )

* [목 차](#-목-차)
    - [프로젝트 설명](#프로젝트-설명)   
    - [주요 기능 소개](#주요-기능-소개)   
    - [프로젝트 구조](#프로젝트-구조)   
    - [테이블 구조](#테이블-구조)
    - [팀원 소개](#팀원-소개)

# 프로젝트 설명

* 수주사 입장에서 고객의 정보와 상품의 정보를 관리해 들어온 발주 주문서의 정보를 판독할 수 있고,
      주문서를 승인하는 과정에서 재고를 확인해 재고가 부족하면 재고를 보충해 줌. 
* 프로젝트 목표
    * 수주사 입장에서의 고객 정보 및 상품 정보 관리 기능
    * 주문서 판독 기능 및 주문서 승인에서 재고 여부 판독 / 추가 보충

## 개발 기간
- 2024.09.30 ~ 2024.10.30

## 개발 환경

![Spring](https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=Spring&logoColor=white)
![MARIADB](https://img.shields.io/badge/MARIADB-003545?style=flat-square&logo=MARIADB&logoColor=white)
![MyBatis](https://img.shields.io/badge/MyBatis-621773?style=flat-square&logo=MyBatis&logoColor=white)
![JAVA](https://img.shields.io/badge/Java-DE3723?style=flat-square&logo=JAVA&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white)
![html5](https://img.shields.io/badge/html5-E34F26?style=flat-square&logo=html5&logoColor=white)
![css3](https://img.shields.io/badge/css3-1572B6?style=flat-square&logo=css3&logoColor=white)
![github](https://img.shields.io/badge/github-181717?style=flat-square&logo=github&logoColor=white)

## 설치 및 실행 방법

1. **레포지토리 클론**:
   ```bash
   git clone https://github.com/Comleamae/TeamProject2.git
   
2. **설치할 npm**

  - 페이지 이동 관련(Route, Routes, Link, navigate)
      
      npm install react-router-dom

 - 서버와 데이터 통신(Axios)
      
   npm install axios


<details><summary>주요 기능 소개</summary>



<details><summary>거래처 관리 기능</summary>

![거래처 관련](https://github.com/user-attachments/assets/d2fcd564-c45b-48e3-b2a7-9878d505461a)

* 고객의 정보를 저장, 수정, 삭제해서 관리할 수 있음
* 상품의 재고와 입고 날짜 정보는 상품 상세 테이블에서 관리함.
* 오래된 제품 순으로 정렬

</details>

<details><summary>발주 신청 연동하여 기능 구현</summary>

![발주 신청](https://github.com/user-attachments/assets/85464b7a-627b-4bb4-877c-64180689ac5e)
![발주 신청2](https://github.com/user-attachments/assets/a0a7d65b-5bef-4a61-92f1-04fdb295fa2c)
* 발주 컴퓨터에서 요청을 보낼 때 수주 컴퓨터의 데이터 베이스로 요청을 보내줌.


![상품 등록](https://github.com/user-attachments/assets/c1fc4d89-3732-42a7-be52-40ca7a8a6eba)
* 발주에 성공하여 수주 컴퓨터로 데이터를 받아온 경우
* 수주 컴퓨터에서 아이템 등록 및 기타 수정 기능을 할 수 있도록 구현


</details>

<details><summary>수주 성공 후 재고 감소</summary>

![성공 후 재고 감소](https://github.com/user-attachments/assets/8240e440-cb80-41ae-8bd4-54a74224e31a)

* 필요한 상품의 수가 재고수보다 적거나 같다면 성공
* 각 상품의 오래된 재고부터 차감 -> 차감하고 남는 재고수는 따로 담아 다시 반복함->0이 될때까지 반복
* 주문서를 완료된 리스트로 이동
* 매출 페이지로 이동

</details>


<details><summary>수주 실패 후 재고 보충</summary>
![실패 후 재고](https://github.com/user-attachments/assets/fa912247-b74c-4c61-8b04-c244508cf2cf)

* 필요한 상품의 수가 재고수보다 많다면 실패
* 필요한 재고의 수량을 기록-> 필요 재고 수 테이블에 수록
* 주문서를 재고 보충 페이지의 실패 리스트에 이동

</details>

</details>

# 프로젝트 구조
<details><summary>구조도 보기</summary>

```plaintext
  📦src
       ┣ 📂craft -- 새로운 바, 라인 차트 컴포넌트를 담은 폴더
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
       ┃ ┣ 📜DetailChart.js -- 캘린더를 활용한 상세 정보 페이지
       ┃ ┣ 📜Orders.css
       ┃ ┣ 📜Orders.js
       ┃ ┣ 📜TempChart.css
       ┃ ┗ 📜TempChart.js -- 메인 차트 페이지
       ┣ 📜App.css
       ┣ 📜App.js
       ┣ 📜App.test.js
       ┣ 📜index.css
       ┣ 📜index.js
       ┣ 📜logo.svg
       ┣ 📜reportWebVitals.js
       ┣ 📜reset.css
       ┗ 📜setupTests.js
```

</details>

# 테이블 구조
<details><summary>구조도 보기</summary>

![image28](https://github.com/user-attachments/assets/322f1ee3-622e-4be6-8724-a9fe853d6d86)

</details>


