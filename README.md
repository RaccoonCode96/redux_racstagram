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

<br/>

- [x] `로그인 화면` : 기본 Email 로그인, Social 로그인, 로그인 에러
  - [x] `Email 로그인` : Email, Password input, 로그인 버튼
  - [x] `Social 로그인` : google로그인 버튼, github로그인 버튼
  - [x] `로그인 에러` : Email로그인, google로그인, github 로그인 에러 발생시 사용자에게 출력

<br/>

- [x] `회원가입 화면` : Email 로그인을 위한 계정을 만드는 화면, 회원가입 에러
  - [x] `Email 형식 가입` : Email, Password input, 회원가입 버튼
    - [x] 가입시 사용자 Nickname 지정 input (추가 사항)

<br/>

- [x] `피드 화면` : 사용 유저의 모든 게시글을 표시하는 화면
  - [x] `게시글 박스` :
    - [x] `타이틀 영역` : 최상단의 작성자 사진 + 이름, 게시글 수정 탭
      - [x] `편집버튼` : 글 수정하기, 삭제하기 모달 -> 해당 버튼 누르면 삭제 또는 수정 페이지로 이동(아니면 모달이 수정하는 모달로 변경)
        - [x] `삭제하기`
        - [x] `수정하기`
    - [x] `사진 영역` : 기존에는 1개만 가능했음 (욕심내면, 여러개 슬라이드 형식으로 가능하게 하고 싶음)
    - [x] `내용 영역` : 게시글 내용

<br/>

- [x] `글 작성 화면` : 글을 작성하는 화면

<br/>

- [ ] `현재 유저 프로필 화면` : 로그인한 현재 유저의 게시물과 대략적인 프로필를 표시하는 화면
  - [x] `유저 프로필 수정하기` : 유저 프로필을 수정하는 화면 (userImage, userDisplayname, userIntro)
  - [ ] `작성 글` : 유저가 작성한 작성 글의 image 표 -> 클릭시 post detail
  - [x] `로그아웃`

<br/>

- [ ] `다른 유저 프로필 화면` : 다른 유저가 작성한 글의 유저 이름을 클릭하여 해당 유저의 프로필 화면 구현
  - [ ] `프로필 보기` : userImage, userDisplayname, userIntro
  - [ ] `작성 글` : 유저가 작성한 작성 글의 image 표 -> 클릭시 post detail

<br/>

- [x] `네비게이션 바` : 앱로고 - 피드(Home)탭 - 글 작성탭 - 현재 유저 프로필(프로필 수정, 프로필 이동, 로그아웃) 탭
  - [ ] Navigation-profile 눌렀을 때 로그아웃, 프로필 수정, 프로필 이동 드롭 다운 필요

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

- 프로필 수정 구현
- profile 이미지 url 처리에 관한 문제 발생과 고민
  - https://goforit.tistory.com/177

<br/>

### 2021.07.15 사항

- profile 이미지 url 삭제에 관한 에러 처리 문제 해결
  - https://goforit.tistory.com/182

<br/>

### 2021.07.19 사항

- 전체적인 redux state 관리 구조 개편
- common slice 생성
  - https://goforit.tistory.com/183

<br/>

### 2021.07.20 사항

- 현재 유저의 profile 보여주기 구현
- users database 구현
- profile update시 users db로 관리 구현
  - https://goforit.tistory.com/184

<br/>

### 2021.07.21 사항

- 최초 소셜 로그인 및 가입 이후의 users 데이터 베이스 관리
- Profile Update 구현(userIntro 포함, users 활용)
- falsy한 프로퍼티 값에 따른 선택적 스프레드 할당
  - https://goforit.tistory.com/185

<br/>

### 2021.07.22 사항

- imageUrl에 대한 에러(디테일) 처리
- file타입 input 에러 처리
- 모달 HOC 구현
- Post 수정&제거 접근 제한 구현
  - https://goforit.tistory.com/187

<br/>

### 2021.07.23 사항

- 현재 유저&다른 유저 profile 화면의 userPosts, userInfo 구현
- 뒤로가기 제한을 위한 history관리
  - https://goforit.tistory.com/188

<br/>

### 2021.07.24 사항

- firebase 보안 규칙 수정, react 이벤트 버블링(stopPropagation 작동 에러), displayName 고유화를 위한 userName 중복 check 구현
  - https://goforit.tistory.com/189

<br/>

### 2021.07.26 사항

- Post detail view 만들기, 보일러 플레이트 코드에 대한 고민
  - https://goforit.tistory.com/190

<br/>

### 2021.07.27 사항

<br/>

- 리덕스 store state 구조 개편, useSelector에 대한 렌더링에 대한 고민, history를 활용한 정보 전달
  - https://goforit.tistory.com/191

<br/>

### 2021.07.28 사항

- Container 구조 리팩토링, 이미지 리사이징
  - https://goforit.tistory.com/192

<br/>

### 2021.07.29 사항

- 스타일링 작업 방식은 두가지 인것 같다.
  - styles 폴더에 각각 기능에 맞는 스타일시트를 만들어서 나중에 main 이나 index 이름의 스타일 시트에 모두 모아서 app 전체에 import 시키는 방식
  - 스타일시트를 각 컴포넌트 마다 구성하여 import 하는 방식
    - 물론, 나중에 build 하는 경우에는 하나의 css 파일이 되겠지 만
    - 개발 하면서 연관된 jsx, 기능, 스타일을 모아 component 별로 확인하는게 더 효율적이라고 생각함 (다른사람이 보기도 편할 듯 함)

<br/>

- SCSS 스타일링 작업을 위한 디렉구조 작업화
- SCSS 스타일링을 각 컴포넌트에 import하는 구조로 작성하기 위해서 기존의 Component, Container 구조를 Component 폴더에 컴포넌트 별로 폴더를 만들어 Component, Container를 짝으로 구성해 놓았고, 해당 컴포넌트의 SCSS는 컴포넌트 폴더에 같이 첨부할 예정
- react의 컴포넌트 프로그래밍의 컨셉에 맞게 스타일링도 컴포넌트에 결착하여 확인하기 편하게 만들고자 이렇게 구현하였다.

<br/>

- styles 폴더의 경우에는 공통적으로 사용하는 utils 역할의 scss 파일들이 보관 되어 있음
  - main : 모든 앱에서 공통적으로 사용되는 스타일
    - 예) font-family, box-sizing, a태그 text-decorate: none 등
    - reset css를 import 하여 받음
    - app.js에 직접적으로 연결 됨
  - colors : 자주 사용될 색 관련 값을 가진 변수들
  - mixins : 자주 사용될 수 있는 스타일 값 mixin들
  - sizes : 자주 사용되는 size 값 변수들
  - variables : 해당 변수들을 모두 import 하여 묶어주는 역할
    - 다른 파일에서는 variables만 import 하여 사용할 수 있음

<br/>

```
폴더 구조
├─components
│  ├─AuthForm
│  ├─common
│  ├─Init
│  ├─Post
│  ├─PostForm
│  ├─PostUpdate
│  ├─ProfileUpdate
│  ├─SignOut
│  ├─SocialSignIn
│  └─UserProfile
├─hooks
├─pages
│  ├─Auth
│  ├─Home
│  ├─Profile
│  ├─Update
│  ├─User
│  └─Write
├─redux
│  └─modules
└─styles

─styles
  main.scss
  reset.css
  _colors.scss
  _mixins.scss
  _sizes.scss
  _variables.scss
```

<br/>

- 완료한 스타일링
  - [x] `styled Load Component`
  - [x] `styled Navigation Component`

<br/>

- 폴더 구조 보기 command (window)
  - `tree` : 해당 폴더의 파일이 아닌 폴더 구조만 그래프로 보여줌
    - options
      - /f : 파일 까지 보여줌

<br/>

### 2021.07.30 사항

- material ui 도입
  - material ui는 매우 깔끔하며 편하게 사용할 수 있어 좋다.
  - input Element의 경우 material ui의 TextFiled Component를 사용하였음 (깔끔하고 좋았음)
  - 하지만, button Element에 id, name 같은 property로 정보를 제공해야 하는 경우에는 material ui의 Button Component는 이를 지원하지 않음
    - scss로 버튼 스타일을 직접 만들어 사용하였음

<br/>

- 로그인, 회원가입 창 스타일링 완료
  - 로그인, 회원가입, userName 중복 요청하여 처리하는 중에는 material ui CircularProgress Component가 보이게 하였음

<br/>

- createPortal를 통해 Modal 재구현
- modal 스타일링 구현
- Error: Target container is not a DOM element. 에러 발생
