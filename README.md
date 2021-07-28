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

### 2021.07.24 사항

- `firebase firestore 보안 규칙 수정`

  - users collection의 userDisplayName만 로그인 없이 read 할수 있도록 변경 함

- `react 이벤트 버블링 현상`

  - function component 사용시 event.stopPropagation를 사용해도 작동하지 않고 event를 상위에 전달하게 됨 event.preventDefault를 사용해야 전파를 아에 하지 않았음
  - class component의 경우에는 event.stopPropagtion이 작동함
  - react가 document에 단일 이벤트 리스너 구조인 것은 알지만, 왜 이런 현상이 일어나는지는 모르겠음

- `displayName 고유화를 위한 checkDisplayName 구현`
  - 회원가입, profile 수정시 DisplayName 중복 체크 확인 구현
  - redux의 users의 checkDisplayName의 exist 프로퍼티인 배열값의 0번은 존재하는 이름인지를 표시, 1번은 검사를 실시한 이름을 뜻함

```js
const users = {
  ...,
  checkDisplayName: {
    loading: false,
    isCheck: false,
    checkError: '',
    exist: [false, ''],
  }
}
```

- 프로필 displayName 수정의 경우 자신이 쓰던 displayName에 대한 것도 고려 해야해서 까다로움

  - 경우1) 중복확인이 필요하지 않은 경우
    - 기존에 쓰던 displayName과 현재 입력창의 input이 같은 경우 `(input === prev)`
  - 경우2) 중복확인이 필요한 경우
    - 1.현재 input과 검사한 displayName(결과는 모르지만)과 다를 경우 `(input !== chekedName)`
    - 2.검사한 displayName이 없는 경우(초기값 ''인 경우) -> `(checkedName === '')`
      - 검사한 displayName이 ''이고 input과 같은 경우도 원하지 않기에 중복 확인이 필요하지만 어차피 chekedName 값 조건에서 필터링이 되기때문에 상관 없음
  - 경우3) 중복 확인을 한 경우
    - 중복O:
      - 검사한 이름의 결과 값이 true 인 경우 `(checkedValue === true)`
    - 중복X:
      - 검사한 이름의 결과 값이 false 인 경우 `(checkedValue === false)`

- `경우1과 경우3의 중복X 인 경우`
  - input과 prev가 같은 경우와, 중복 확인하여 중복이 아닌 경우는 다음을 작업을 진행 해도 됨

```js
// 이름 중복 방어 코드
// input과 과거 이름이 다른 경우
if (prevDisplayName !== input) {
	// 검사한 이름이 '' or 검사한 이름이 input과 다른 경우
	if (!checkedName || checkedName !== input) {
		window.alert('닉네임 중복 확인이 필요 합니다.');
		return;
	}
	// 중복 검사 값이 true 인 경우
	if (exist[0]) {
		window.alert(`${exist[1]}은 이미 존재하는 닉네임 입니다.`);
		return;
	}
}
// input과 과거 이름이 같거나, 중복 검사 값이 false인 경우
// update Name
```

- 로그인의 경우, 자신이 쓰던 displayName이 없어서 그나마 조금 조건이 덜 까다로움
  - prev와 input 조건만 없음

### 2021.07.26 사항

- 포스트 디테일 만들기
  - 현재 유저의 profile에 있는 image 테이블의 이미지 클릭시 포스트를 자세히 볼 수 있는 스크롤 방식(피드와 같이)의 Component로 교체되어 보여줌
  - 다른 유저의 profile image 테이블의 이미지 클릭시 포스트를 자세히 볼 수 있는 있는 스크롤 방식의 Component로 교체되어 보여줌
  - 결국엔, 현재 유저 profile과 다른 유저 profile을 보는 방식이 똑같기 때문에 보일러 플레이트 코드가 발생함 -> 통합할 필요가 있음
- 현재 리덕스 스토어 state의 구조를 조금 더 관리하여 변형할 필요가 있음

### 2021.07.27 사항

<br/>

- 리덕스 스토어 구조 변경함
- 최대한 코드 중복(보일러 플레이트 코드)을 줄일려고 했으나, 코드 중복을 줄일려고 하면 오히려 더 가독성이 떨어지는 것 같아서 고민이 많다.
- useSelector의 위치의 중요성 증가 (렌더링 최적화) -> 상위 포지션이 아닌 적절한 하위 포지션에 두어야 필요 없는 렌더링을 제거 할 수 있음
- useSelector를 사용하는 경우 만약 비동기 작업의 상황을 알려주는 state안에 값을 참조하여 가져오면 불필요한 렌더링이 많이 발생할 것 같다는 생각이 든다(pending, fullfilled 에 의한 loading, 완료 여부 값의 변화시 새로운 객체가 들어오기 때문에 같이 새롭게 변했다고 인지할 것 같다는 생각이 든다.)
  - 물론, 실험을 해봐야 할겠지만 우려가 되는 부분이다.
- history push를 통해서 데이터를 전달하는 방식으로 변경함
  - 기존 updateSelector, postSelector를 push와 함께 경로 이동시 state를 전달하는 방식으로 변경

<br/>

### component, container 구조 재계획

<br/>

- Home
  - allPostsContainer
    - post

<br/>

- Profile
- User
  - ProfileContainer
    - CurrentUserProfileContainer
    - UserProfileContainer
      - UserProfile
      - ProfilePostImages
  - PostContainer
    - PostOnToggle
      - CurrentUserPostsContainer
      - UserPostsContainer
        - Post

<br/>

- currentUser 와 user에 대한 container를 어떻게 제어 할 것인지가 중요 사항임
- 그리고 postOnToggle을 어떻게 비집고 넣을 것인지 중요함 (modal 방식의 children 사용한 HOC 방식을 사용할지 고민중)
