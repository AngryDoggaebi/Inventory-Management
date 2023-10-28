# Inventory-Management
## 서비스 소개
<p align="center">
 <img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/cf7f4e2c-aabb-421f-84fe-ec7b305afc43" width='50%' />
<p />

재고관리를 편리하게 할 수 있는 웹페이지.
특정 부서를 대상으로 함.

개발배경: 

<br />

## 배포
Elastic Beanstalk: http://inventory-management2.ap-northeast-2.elasticbeanstalk.com/ <br />
Vercel: https://inventory-management-k.vercel.app/ <br />
Netlify: https://lustrous-sundae-3a9d1a.netlify.app/ <br />
 
<br />


## 스택
<p align="center">
 <img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/e695182f-4e25-4ab5-83ab-4d70ae4ff4a0" />
<p />


## 아키텍처
<p align="center">
 <img src="https://github.com/AngryDoggaebi/Inventory-Management/assets/120698922/a877d76f-c703-4020-af1b-97548697b546" />
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

<br />

### 📝 입력

<br />

### ✏️ 수정

