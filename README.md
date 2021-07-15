# 리팩토링 Instagram 클론 프로젝트 by Redux-toolkit

<br/>

![instagram_logo](https://user-images.githubusercontent.com/76491635/125172632-b7b10180-e1f5-11eb-98a8-a5977759bd42.png)

<br/>

## 📄 프로젝트 설명

<br/>

이 프로젝트는 기존에 React & firebase를 통해서 만든 인스타그램 클론 프로젝트 리팩토링 프로젝트 입니다.

<br/>

해당 프로젝트에서는 `redux-toolkit(Slice 모델)`을 사용하여 상태관리를 구현하고 있습니다.

<br/>

더불어 나중에, styled component나 sass 중에 채택하여 css 작업을 할 예정 입니다.

<br/>

- 여러가지 다른 활동을 자세히 보고 싶으시다면, [ '라쿤코드의 개발블로그'](https://goforit.tistory.com/)에서 확인 가능합니다.

<br/>
<br/>
<br/>

## 💻 화면 개요

<br/>

체크는 현재 기능적으로 구현된 상황을 의미합니다.

<br/>

- [x] `로딩 화면 또는 Component` : 앱 실행 초기화 작업시 로딩 또는 다른 작업시 사용할 로딩 화면 및 Component
- [x] `로그인 화면` : 기본 Email 로그인, Social 로그인, 로그인 에러
  - [x] `Email 로그인` : Email, Password input, 로그인 버튼
  - [x] `Social 로그인` : google로그인 버튼, github로그인 버튼
  - [x] `로그인 에러` : Email로그인, google로그인, github 로그인 에러 발생시 사용자에게 출력
- [x] `회원가입 화면` : Email 로그인을 위한 계정을 만드는 화면, 회원가입 에러
  - [x] `Email 형식 가입` : Email, Password input, 회원가입 버튼
    - [x] 가입시 사용자 Nickname 지정 input (추가 사항)
- [x] `피드 화면` : 사용 유저의 모든 게시글을 표시하는 화면
  - [x] `게시글 박스` :
    - [ ] `타이틀 영역` : 최상단의 작성자 사진 + 이름, 게시글 수정 탭
      - [ ] `편집버튼` : 글 수정하기, 삭제하기 모달 -> 해당 버튼 누르면 삭제 또는 수정 페이지로 이동(아니면 모달이 수정하는 모달로 변경)
        - [x] `삭제하기` : Delete
        - [x] `수정하기` : Update
    - [x] `사진 영역` : 기존에는 1개만 가능했음 (욕심내면, 여러개 슬라이드 형식으로 가능하게 하고 싶음) READ
    - [ ] `내용 영역` : 게시글 내용
- [x] `글 작성 화면` : 글을 작성하는 화면 CREATE
- [ ] `현재 유저 프로필 화면` : 로그인한 현재 유저의 게시물과 대략적인 프로필를 표시하는 화면
- [ ] `유저 프로필 화면` : 유저의 게시물과 프로필을 확인 할수 있는 화면 (피드 게시글 작성자 유저 이름을 눌러 유저 프로필 화면으로 이동)
- [x] `네비게이션 바` : 앱로고 - 피드(Home)탭 - 글 작성탭 - 현재 유저 프로필(프로필 수정, 프로필 이동, 로그아웃) 탭
  - [ ] Navigation-profile 눌렀을 때 로그아웃, 프로필 수정, 프로필 이동 드롭 다운 필요
  - [x] `로그아웃`

<br/>
<br/>
<br/>

# 📅 TIL (Today I Learned, 오늘 깨달은 것들)

<br/>

### 2021.07.08 사항

- 프로젝트 시작, 기본 환경설정, 필요한 폴더 구조 및 파일 Template 작업, Router 연결 구현
  - https://goforit.tistory.com/168

<br/>

### 2021.07.09 사항

- 로그인 옵저버(리스너), 로그인 구현(Social, Email 로그인)
  - https://goforit.tistory.com/169

<br/>

### 2021.07.10 사항

- Auth 재편성, 회원가입 구현, Auth 관련 사항 마무리
  - https://goforit.tistory.com/170

<br/>

### 2021.07.12 사항

- Navigation, 글 작성, 글 가져오기 구현 (Create, Read 구현)
  - https://goforit.tistory.com/173

<br/>

### 2021.07.13 사항

- 글 수정, 글 삭제 구현 (Update, Delete 구현)
  - https://goforit.tistory.com/176

<br/>

### 2021.07.14 사항

- 프로필 수정 구현, profile 이미지 url 처리에 관한 문제 발생과 고민
  - https://goforit.tistory.com/177

<br/>

### 2021.07.15 사항

<br/>

- profile 이미지 url 삭제에 관한 문제 해결

  - 그냥, 따로 action을 만들어서 error를 처리받고 updateProfile에서는 try에 넣지 않음으로서 이미지 삭제 에러가 발생해도 실패만 redux로 뜨고, 나머지는 진행하게됨

- 나중에, User에 대한 정보를 firebase database에 만들어서 관리해야함
  - 현재는 post에 userPhotoUrl, displayName이 존재하여 모든 글을 찾아서 업데이트하기란 성능에 좋지 않음
  - post의 userId 만 가지고 데이터베이스의 유저정보를 가져와서 글상자의 상단을 구성하면 굳이 글을 모두 update할 필요가 없음
- **결국에는 firebase의 currentUser의 photoUrl, displayName은 한계가 있으므로 User를 관리하는 데이터베이스가 필요함**
  - User 데이터 베이스 구성하고 User 데이터 베이스 중심의 profile update 및 가입시 User데이터 지정 작업을 구현해야함
  - 로그인시 제공하는 uid를 가지고 User 데이터를 활용하도록 개편이 필요함
