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
  - [x] 스타일링 완료

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
  - [x] `이미지 리사이징`

<br/>

- [x] `현재 유저 프로필 화면` : 로그인한 현재 유저의 게시물과 대략적인 프로필를 표시하는 화면
  - [x] `유저 프로필 수정하기` : 유저 프로필을 수정하는 화면 (userImage, userDisplayname, userIntro)
  - [x] `작성 글` : 유저가 작성한 작성 글의 image 표 -> 클릭시 post detail
    - [x] `작성 글 detail view` : image 표에서 해당 이미지 클릭시 해당 글 detail view 화면
  - [x] `로그아웃`

<br/>

- [x] `다른 유저 프로필 화면` : 다른 유저가 작성한 글의 유저 이름을 클릭하여 해당 유저의 프로필 화면 구현
  - [x] `프로필 보기` : userImage, userDisplayname, userIntro
  - [x] `작성 글` : 유저가 작성한 작성 글의 image 표 -> 클릭시 post detail
    - [x] `작성 글 detail view` : image 표에서 해당 이미지 클릭시 해당 글 detail view 화면

<br/>

- [x] `네비게이션 바` : 앱로고 - 피드(Home)탭 - 글 작성탭 - 현재 유저 프로필(프로필 수정, 프로필 이동, 로그아웃) 탭
  - [x] Navigation-profile 눌렀을 때 로그아웃, 프로필 수정, 프로필 이동 드롭 다운 필요

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

- 스타일링 작업 방식 선택, SCSS 스타일링을 위한 디렉 구조, Load, Navigation 컴포넌트, 폴더 구조 확인 CLI command
  - https://goforit.tistory.com/194

<br/>

### 2021.07.30 사항

- material ui 도입, 로그인, 회원가입 창 스타일링
  - https://goforit.tistory.com/195

<br/>

### 2021.08.01 사항

- Taget container is not a Dom element 에러 해결, React 렌더링에 대한 고찰
  - https://goforit.tistory.com/196

<br/>

### 2021.08.02 사항

- Home 페이지 스타일링 수정, Write 페이지 스타일링
  - https://goforit.tistory.com/197

<br/>

### 2021.08.03 사항

- Material UI findDOMNode Error, Drop Menu UI 구현 (드롭 메뉴), Modal UI 재구현, Confirm UI 구현
  - https://goforit.tistory.com/198

<br/>

### 2021.08.04 사항

- 페이지 반응형 Navigation Icon
- Profile 페이지 스타일링 구현
- 인스타그램의 Image Table 구현하기
- SCSS '/' (나누기 연산자) 기능 Deprecated 경고 해결
- 반응형 웹을 위한 작업 중 요소 쌓임 구조 변경 필요에 의한 useWindowSize 사용
- a 태그 클릭시 새탭으로 열기(target: '\_blank')
  - https://goforit.tistory.com/199

<br/>

### 2021.08.05 사항

- Profile 페이지, User 페이지 통합
- Presentaional 컴포넌트 역할인 PostUpdate와 PostForm 통합(PostForm 재사용)
- PostForm 컴포넌트에 input 요소들의 required 속성으로 인한 validation error 해결
- Post, Auth 페이지 컴포넌트 관련 input들 input 유무 체크하여 내부 적인 alert표시 구현
  - https://goforit.tistory.com/200

<br/>

## 다음에 필요한 사항

<br/>

- [ ] profile 정보 요청 시기 조정
  - 더 빠른 연산을 위해서, 화면이 render 되고 profile에 관련된 정보를 가져오지 말고 profile 보기위해 버튼을 눌렀을 때 부터 미리 profile 정보를 요청하게 하자

<br/>

- [ ] Post Detail View로 이동시 해당 글의 scrollX 위치로 이동하게 구현하기 (스타일링 이후에 scroll 위치 계산이 필요한 작업임)

<br/>

- [ ] validation 구현 필요함
  - input 같은 경우, display none 적용시 browser에서 제공하는 validation 말풍선이 뜨지 않기 때문에 따로 구현 필요함
  - required를 사용하지 말고, submit 함수 단에서 input값이 들어 왔는지 체크하여 validation error 구현 필요
  - [x] post 관련한 input의 check 대략적인 (PostUpdateContainer, postFormContainer)
  - [x] auth 관련한 input의 check 대략적인 조건 구현
  - [ ] 각 input 별로 데이터 형태에 따른 구체적인 조건 설정이 필요함
    - [ ] 이메일, 패스워드, 유저 네임, 글 내용의 형식(조건, 제한) 지정 필요

<br/>

- [ ] 글 작성 시간 (클라이언트 단에서 뿌리는 경우 로컬 시간 변경으로 조작 가능한지 테스트 필요함)

<br/>

- [ ] User Profile 데이터 베이스 추가 필드 구현 필요
  - 이름 (subName) : 사용자 이름이 아닌 '부가적인 이름'
  - 웹사이트 (webSite) : 자신의 사이트로 이동시킬 사이트
  - 소개 (intro) : 자신의 소개 Coment(기존에 있었음)
  - 게시글 수 (Post Count) : 유저의 게시글 수

<br/>

- [ ] profileUpdateContainer과 postFormContainer 통합 시도

<br/>

- [ ] 효과적인 렌더링 제한을 위해서 container에 있는 함수들을 hook으로 만들어 구현하기

<br/>
<br/>
<br/>

# 나중에 구현하고 싶은 기술

<br/>

- side 바에 유저 랜덤 추천 및 푸터 정보
- 유저 이름 검색을 통한 프로필 보기 (이름 검색)
- 무한 스크롤
- 게시글 장소 태그로 장소 지도 보기 (지도 API)
