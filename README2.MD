# 프로젝트 - 병원 증명서 간편 출력 서비스

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

## 개발 환

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
![VisualStudioCode]

## 설치 및 실행 방법

1. **레포지토리 클론**:
   ```bash
   git clone https://github.com/Comleamae/TeamProject2.git
   
2. **설치할 npm**

  - 페이지 이동 관련(Route, Routes, Link, navigate)
      
      npm install react-router-dom

 - 서버와 데이터 통신(Axios)
      
   npm install axios

<details><summary>프로젝트 구조</summary>

```plantext
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
             ┃ ┃ ┣ 📜MangeCustomer.js -- 고객 등록 페이지
             ┃ ┃ ┣ 📜MangeItem.css
             ┃ ┃ ┣ 📜MangeItem.js --상품 등록 페이지
             ┃ ┃ ┣ 📜MangeOrdering.css
             ┃ ┃ ┗ 📜MangeOrdering.js -- 주문서 관리 페이지
             ┃ ┣ 📂otherFunctionPage
             ┃ ┃ ┣ 📜RequiresPage.css 
             ┃ ┃ ┣ 📜RequiresPage.js -- 재고 보충 페이지
             ┃ ┃ ┣ 📜SalesPage.css
             ┃ ┃ ┗ 📜SalesPage.js -- 매출 페이지
             ┃ ┣ 📂utils -- 각 페이지에서 사용하는 모달을 담은 폴더
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

</details>

# 주요 기능 소개

<details><summary>asdfasdf</summary></details>
