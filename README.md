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

- profile 이미지 url 삭제에 관한 에러 처리 문제 해결
  - https://goforit.tistory.com/182

<br/>

### 2021.07.19 사항

- 전체적인 redux state 관리 구조 개편, common slice 생성
  - https://goforit.tistory.com/183

<br/>

### 2021.07.20 사항

- 현재 유저의 profile 보여주기 구현 ,users database 구현, profile update시 users db로 관리 구현
  - https://goforit.tistory.com/184

### 2021.07.21 사항

- 유저 데이터 베이스를 활용하도록 변경함

- `소셜 로그인시` -> 기존의 유저 데이터베이스에 정보가 있는지를 확인해서 소셜 로그인의 정보로 세팅함, 없는 정보는 Default 값을 줌 (displayName이 없으면 uuid로 random으로 넣어줌, 이미지가 없으면 기본 이미지를 넣어줌)
  - 어쨌거나, 한번 최초 로그인 하면 유저 데이터 베이스에 정보가 생김
- `일반 이메일 가입시` -> 닉네임은 무조건 받기로 되어 있고 유저 이미지는 Default 값을 줌

- 유저 profile 수정시, 기존에 작성한 글의 user 정보와 users 데이터 베이스에 있는 정보도 수정하게 함
- 기존의 updateDisplayName, updateImageUrl의 경우 합쳐서 만들었음
  - `updatePostUserInfoThunk` : posts에 있는 유저가 작성한 post에 있는 유저 정보 수정
  - `setCurrentUserInfoThunk` : users 데이터베이스의 현재 유저의 user 데이터를 수정
  - `getCurrentUserInfoThunk` : 현재 users 데이터베이스의 현재 유저의 user 데이터를 가져옴

## 깨달은 것

- **데이터가 없는 경우에 유연하게 해당 데이터를 넣지 않는 스프레드 문법의 표현식**
  - 기존의 값을 유지한 상태에서 변하는 값만 update 한 새로운 object를 만들 수 있음
  - 재사용성을 높여주는 방식임

```js
const init = {
	name: '',
	weight: 0,
	tall: 0,
	isAnimal: false,
	isbird: false,
};

const Raccoon = {
	name: 'Raccoon',
	weight: 75,
	tall: 180,
};

const Jerry = {
	name: 'Jerry',
	weight: 10,
	tall: 14,
	isAnimal: true,
};

const { name, weight, tall, isAnimal, isbird } = Raccoon;
// 값이 없으면, 해당 프로퍼티는 undefined로 할당되어 없는 값을 undefined로 update함

const newInfo1 = { ...init, name, weight, tall, isAnimal, isbird };
console.log(newInfo1);
// {name: "Raccoon", weight: 75, tall: 180, isAnimal: undefined, isbird: undefined}

const newInfo = {
	...init,
	...(name && { name }),
	...(weight && { weight }),
	...(tall && { tall }),
	...(isAnimal && { isAnimal }),
	...(isbird && { isbird }),
};
console.log(newInfo); // {name: "Raccoon", weight: 75, tall: 180, isAnimal: false, isbird: false}
// 있는 정보만 스프레드 문법의 대상이 됨
```
