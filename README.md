<div align=center>
  <h2> React와 NodeJS 사용하여 쇼핑몰 웹 사이트 구현</h2>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"> 
</div>

- 웹 서비스 이용 유저를 일반회원과 관리자로 구분하여 두 유저가 사용가능한 공통적인 기능 및 각 유저가 필요로 하는 기능 위주로 쇼핑몰 사이트를 만들어보았습니다.

   #### ✔ 회원가입 페이지(RegisterPage)   
   - select 박스의 option value 값에 따라 일반회원과 관리자가 구분되어 DB에 저장되도록 함.  
 
     ![shopApp_registerPage](https://github.com/jaeyooon/jaeyooon/assets/111714371/5b069ec9-a14a-4814-9b87-9ab64658c11c)

     ![shopApp_DB_userRole_registerPage](https://github.com/jaeyooon/jaeyooon/assets/111714371/bbbc34ee-f0a8-44c3-830f-737c03b7e66a)  
     👉 일반회원의 경우 role: 0 이고 관리자의 경우 role: 1 로 DB에 저장
     
   #### ✨일반회원 & 관리자에게 공통적으로 구현된 기능     
   - 대륙에 대한 필터 기능 & 가격에 대한 필터 기능
 
     ![shopApp_filter](https://github.com/jaeyooon/jaeyooon/assets/111714371/a1f444bd-84cd-4afd-a714-05f2fbe0313c)
   - 검색 기능
 
     ![shopApp_search](https://github.com/jaeyooon/jaeyooon/assets/111714371/3917fb2c-f39a-40ea-bcaa-78fdadf3c0f4)
   - 더보기 기능   
  : 메인 페이지에서 `더보기` 버튼을 클릭했을때 정렬되어야할 데이터가 남아있을 경우 해당 데이터들이 화면에 나타남.

     ![shopApp_loadmore](https://github.com/jaeyooon/jaeyooon/assets/111714371/453b313c-4484-4ad2-beb1-93107d5d6c9f)
    
   #### ✨일반회원에게만 구현된 기능  
   - 상품 상세 페이지에서 장바구니에 상품 추가
 
     ![shopApp_addProduct](https://github.com/jaeyooon/jaeyooon/assets/111714371/4a01766f-8721-4aeb-9c53-09443df58d66)
   - 자신의 장바구니 페이지에서 상품 삭제
 
     ![shopApp_deleteProduct](https://github.com/jaeyooon/jaeyooon/assets/111714371/fa78fb37-d161-4b56-b49c-2a6afe54f12b)
   - 결제 버튼을 누름으로서 DB에 결제정보 저장

     ![shopApp_payment](https://github.com/jaeyooon/jaeyooon/assets/111714371/0a9e9721-6cc2-424f-8fd1-3dd2962b1381)

     ![shopApp_DB_payment](https://github.com/jaeyooon/jaeyooon/assets/111714371/005e1bd9-c4b6-4ae4-b93f-352580a163a8)
   - 자신의 주문내역 페이지에서 최근까지 모든 주문정보 조회
 
     ![shopApp_paymentList](https://github.com/jaeyooon/jaeyooon/assets/111714371/946358f9-af0e-46f6-aca0-da7fa0bdcef4)

    #### ✨관리자에게만 구현된 기능 
   - 메인 페이지에서 상품들의 **누적 판매량** 확인 가능
 
     ![shopApp_admin_landingPage](https://github.com/jaeyooon/jaeyooon/assets/111714371/1b6be3c1-12f7-4fe6-a8fd-7c86348d7a2c)  
   - 새로운 상품 추가
 
     ![shopApp_admin_uploadProduct](https://github.com/jaeyooon/jaeyooon/assets/111714371/a4be659f-fa57-4fa0-83b1-7a3ef027a52a)
   - 전체 회원에 대한 주문 내역 조회
 
     ![shopApp_admin_allPaymentspng](https://github.com/jaeyooon/jaeyooon/assets/111714371/6e70f5ac-d27f-406a-84ed-b1837d4f0c98)

- 반응형 웹 디자인을 적용하여 유저가 사용하는 스크린 화면에 맞춰서 UI들이 유기적으로 변화하도록 하였습니다.

  ![shopApp_responsiveWeb](https://github.com/jaeyooon/jaeyooon/assets/111714371/a713ea63-e263-4922-b990-4d5db97df652)

  ![shopApp_mobile](https://github.com/jaeyooon/jaeyooon/assets/111714371/c1811762-0990-4dde-a090-bf9577bf0220)
  

