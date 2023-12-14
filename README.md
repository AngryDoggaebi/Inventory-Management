# Inventory-Management
## 서비스 소개
<p align="center">
 <img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/cf7f4e2c-aabb-421f-84fe-ec7b305afc43" width='50%' />
<p />

재고관리를 편리하게 할 수 있는 웹페이지. DB에 비품의 개수를 입력, 수정, 삭제, 조회 가능.

개발기간: 2023-10-15 ~ 2023-10-27

<br />

## 배포
Elastic Beanstalk: http://inventory-management2.ap-northeast-2.elasticbeanstalk.com/ <br />
Vercel: https://inventory-management-k.vercel.app/ <br />
 
<br />


## 아키텍처
<p align="center">
 <img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/e5cc92f4-7244-4ebc-8f32-fbbcc9d3c73f" />
<p />


## API 명세서
<p align="center">
 <img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/41b152ff-a7ba-47fb-9c40-5c5ecc10eb1c" />
<p />

## 페이지
<table>
  <thead>
    <tr>
      <th width="333"> 
       <img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/6378ab3f-0df8-4d8a-b6ff-adf910c346ee" width='80%' />
      </th>
      <th width="333">
       <img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/f2798e7b-f02e-45e8-94aa-c7ce3f37d814" width='80%' />
      </th>
      <th width="333"">
       <img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/ed73a805-5113-4582-a287-d6168cfbb1c8" width='80%' />
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(home)  /</td>
      <td>(조회, 입력)  /inventory</td>
      <td>(조회, 수정)  /inventory/[id]</td>
    </tr>
  </tbody>
</table>
<br />

## 기능

### 🧾 조회

<img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/82f3431f-5d6e-41ef-b39c-dbf93f222a7d" width="20%" />
<img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/7a732ed2-8155-40c5-82e8-7b42d2780abd" width="30%" />
<img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/86a9158c-392c-4073-b7d5-d7378789b396" width="30%"/>

- 달력
  - 원하는 날짜 선택
  - 최초 데이터 등록 이전 날짜 선택 불가
  - 오늘 이후 날짜 선택 불가

- 데이터 선택시
  - 선택한 날짜의 앞 3일, 뒤 3일, 총 7일의 데이터 조회 가능
  - 모든 데이터 수정 가능
  - 오늘 날짜의 데이터만 삭제 가능
 
- 앞, 뒤로 데이터가 2개 이상 나오지 않는 날짜 선택시
  - 마지막 날짜 선택시 앞 6개, 끝에서 두 번째 날짜 선택시 앞5개 뒤 1개 데이터를 보여주는 등 항상 총 7개의 데이터가 조회되도록 구현
 
- 오늘 날짜 선택했는데 아직 입력된 데이터가 없는 경우
  - 어제 날짜까지만 조회됨
  - 붉은색 테두리 표시 없음

- 그 외 기능
  - 오늘 데이터를 입력하지 않고 날짜가 넘어가는 경우 자동으로 빈 데이터 입력 (추후 수정 가능하도록)
  - *표시된 비품의 경우 숫자 또는 충분, 부족, 없음으로 입력하면 조회시 자동 컬러링 되어 비품량 파악에 용이

<br />

### 📝 입력

<img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/8311bcb2-4388-4105-9135-c57e324ad685" width="15%" />

- 입력
  - 오늘 비품 개수를 입력할 수 있음
  - error
    - 오늘 데이터가 이미 등록된 경우
    - 빈 값이 있을 경우
  - *표시된 비품의 경우 숫자 또는 충분, 부족, 없음으로 입력 가능, 조회시 자동 컬러링 되어 비품량 파악에 용이
    
<br />

### ✏️ 수정

<img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/eb9b3b8a-4da6-48e8-accb-cbc3936eb0d9" width="15%" />
<img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/b1f67a30-07ad-4bb8-a676-c511b197b6e0" width="20%" />

- 수정
  - 수정할 데이터가 자동으로 채워짐
  - 조회하는 데이터와 수정할 데이터의 날짜를 둘 다 파란색으로 표시해 혼란 최소화
  - error
    - 빈 값이 있을 경우
  - 오늘 데이터가 아직 없을 경우 /inventory 페이지로 이동하여 오늘 데이터를 포스팅 할 수 있는 기회 제공
<br />

## 반응형
<p align="center">
 <img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/3d5e3a4d-2d17-4469-9d12-9fa59224eaa0" width="50%" />
</p>
 
<table>
  <thead>
    <tr>
      <th width="50%"> 
       <img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/f2798e7b-f02e-45e8-94aa-c7ce3f37d814" width='80%' />
      </th>
      <th width="50%">
       <img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/c4297778-fc51-4d49-8433-9e83c58f797d" width="50%" />
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1050px 이상</td>
      <td>1050px 이하</td>
    </tr>
  </tbody>
</table>

- 반응형
  -화면이 좁아지면 사용의 편의를 위해 레이아웃 세로 형식으로 변경

<br />
<br />
<br />







