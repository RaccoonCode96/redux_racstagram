# Racstagram_V2 (Redux-toolkit)

<br/>

![instagram_logo](https://user-images.githubusercontent.com/76491635/125172632-b7b10180-e1f5-11eb-98a8-a5977759bd42.png)

<br/>

## 📄 프로젝트 설명

<br/>

이 프로젝트는 기존에 React & firebase를 통해서 만든 인스타그램 클론 프로젝트(Racstagram Version1) 리팩토링 프로젝트 입니다. Racstagram_v1에 비해서 더 많은 기능과 디테일을 갖추었습니다.

<br/>

## 상태 관리

해당 프로젝트에서는 `redux-toolkit(Slice 모델)`을 사용하여 상태관리를 구현하고 있습니다.

<br/>

## 스타일

현재 SCSS를 채택하여 css 작업을 진행중에 있으며, 부분적으로 Material UI를 사용하고 있습니다.
대부분의 경우에는, Material UI와 React 호환성 문제로 대부분은 SCSS로 직접 구현하고 있습니다.

<br/>

- 여러가지 다른 활동을 자세히 보고 싶으시다면, [ '라쿤코드의 개발블로그'](https://goforit.tistory.com/)에서 확인 가능합니다.

<br/>
<br/>
<br/>

## 💻 화면

### Auth (로그인, 회원가입)

![auth](https://user-images.githubusercontent.com/76491635/132431708-7c9036cd-94dc-43dd-9c46-0467b57d353b.gif)

- 이메일 로그인
- 이메일 회원가입
  - 회원가입: 이메일, 비밀번호 형식에 맞아야 하고 사용자 이름의 자동 중복체크가 통과되어야 가입하기 버튼이 활성화 됩니다.
- 소셜 로그인
  - 구글 로그인
  - 깃헙 로그인

<br/>

### Profile (유저 프로필)

![profile_cu](https://user-images.githubusercontent.com/76491635/132432083-a1bee863-ad7c-4989-84d9-0e0d7ed87f3a.gif)

- 현재 유저와 다른 유저의 프로필을 담당하는 화면으로, 현재 유저만 자신의 프로필의 수정 버튼에 접근 가능합니다.
- 프로필 Update 또한 사용자 이름 중복 체크와 프로필 사진이 무조건 존재해야 합니다.
- 선택사항으로 SubName, Webstie, Intro를 넣을 수 있습니다.

![profile_r_web](https://user-images.githubusercontent.com/76491635/132432374-9c4a9af3-e4f7-449f-b97e-9c485bd46884.gif)

- 완성된 프로필 화면에서 게시글 숫자를 확인 할 수 있으며, 등록된 Website 클릭시 해당 페이지를 새탭으로 띄웁니다.

![user_read](https://user-images.githubusercontent.com/76491635/132432380-c00f73d4-e55f-440e-a13a-30fea9ec7b44.gif)

- 게시글의 작성자 이름, 댓글 작성자 이름을 클릭 하거나 유저 추천 영역에서 특정 사용자 보기를 클릭하면 특정 사용자의 프로필을 볼 수 있습니다. 

<br/>

### Post (게시글)

![post_cr](https://user-images.githubusercontent.com/76491635/132432593-d5c70acd-352e-473e-aaaa-8e38dd2fa027.gif)
![post_ud](https://user-images.githubusercontent.com/76491635/132432604-85291b84-e740-4843-98ad-c5429f2563ec.gif)

- 게시글의 경우 CRUD가 가능합니다.
- 게시글은 항상 게시글 사진과 내용이 의무적으로 필요합니다.
- 게시글 수정은 해당 게시글 좌측 상단 메뉴를 클릭하여 모달창에서 클릭시 수정 또는 삭제가 가능합니다.

<br/>

### Infinite Scroll (무한 스크롤)

![infinite](https://user-images.githubusercontent.com/76491635/132433019-01b3464f-20d1-4427-b262-2e6fd8cd4935.gif)

- home 또는 user post 화면에서 게시글을 6개를 먼저 들고오고 무한스크롤을 통해 추가적으로 6개씩 들고 옵니다.
- user profile의 이미지 테이블의 경우에도 무한 스크롤이 적용되어 있습니다.

<br/>

### Recommend (유저 추천)

![recommend](https://user-images.githubusercontent.com/76491635/132432810-6dda3bd3-0d3e-445a-81f1-77f86e68d99d.gif)

- 유저 추천의 경우 본인을 제외한 유저 2명을 랜덤으로 가져와 추천합니다.
- 보기 클릭시 해당 유저의 프로필을 확인 할 수 있습니다.
- racstagram 로고 클릭시 update 되어 다른 유저를 볼 수 있습니다.

<br/>

### Comment (댓글)

![comments](https://user-images.githubusercontent.com/76491635/132433263-cfbd8ea7-bfff-4168-b9e6-baeff0f59667.gif)

- 댓글의 경우 CREATE와 DELTE 만 가능합니다.
- 해당 게시글의 '댓글 0개 모두 보기' 또는 중앙에 있는 말풍선을 클릭하면 댓글을 모두 볼수 있습니다.
- 최근 2개의 댓글은 게시글에서 바로 확인할 수 있습니다.
- 댓글은 내용이 입력이 되어야 작성 버튼이 활성화 되고, 현재 유저만 자신의 댓글 오른쪽에 휴지통 모양의 삭제 버튼이 나타나며 접근 가능합니다.

<br/>

### Like, MorePostContent (좋아요, 게시글 내용 더 보기)

![like_more](https://user-images.githubusercontent.com/76491635/132433670-3bd0c5c8-209b-4981-9631-0fb96d67fc5d.gif)

- 좋아요는 모든 게시물에 좋아요를 ON/OFF 할 수 있습니다.
- 모든 게시글의 내용은 35자 또는 개행 포함시 그 부분까지로 짧게 나타나며, 게시글 내용 더보기 버튼이 활성화 되어 클릭시 모든 내용을 볼 수 있습니다. 


<br/>

## 아쉬운 부분

- propTypes나 TypeScript를 사용하지 않아서, 다른 개발자가 보기에 어떤 타입이 오는지 이해하기 어렵습니다.
- 전체적으로 프로젝트 컴포넌트 구성에 대한 지도를 제작해보지 못해서 아쉽습니다. (어떻게 연결되어 있는지를 다른 개발자가 잘 이해할 수 있도록 시각적인 그림을 제시하고 싶었습니다.)
- 다른 브라우저에서의 검증이 되지 않았습니다.
- 테스트 코드를 작성하지 않았기 때문에 지속 가능한 테스트 환경이 없습니다.
- Firebase말고 Nodejs, express 등과 같은 백엔드와의 연결 구조로 만들지 않은 것이 아쉽습니다.
- 깔끔하고, 알아보기 쉬운 코드를 작성하지 못한 점이 아쉽습니다. 

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

### 2021.08.06 사항

- 드롭 메뉴 스타일 변경
- Auth Error Code를 통한 Message 설정
- Profile 수정 페이지 스타일링 및 website, subDisplayName input 추가
- 정규 표현식을 통한 사용자 website Url 포맷팅
- 게시글 개수 표시 구현
- Noto Sans KR 폰트 적용
  - https://goforit.tistory.com/201

<br/>

### 2021.08.08 사항

- Post Detail View로 이동시 해당 글의 scrollTop 위치로 이동하게 구현하기
  - 다른 유저 및 자신의 프로필에 있는 post Image table에서 특정 이미지 클릭시 해당 글위치로 이동 함
  - https://goforit.tistory.com/203

<br/>

### 2021.08.09사항

- 본인을 제외한 랜덤 유저 추천 기능 구현
- side 컴포넌트 스타일링 (회원 추천 + 푸터)
  - https://goforit.tistory.com/204

<br/>

### 2021.08.11사항

- 무한스크롤 구현 (IntersectionObserver)
- 불필요한 데이터 요청 제거 및 데이터 요청 시기 조정
- 코드 중복 제거를 위한 통합에 대한 고찰
- https://goforit.tistory.com/205

<br/>

### 2021.08.13 사항

- 랜덤 유저 추천 개선(useRandom 구현)
- 스크롤 위치 기억(useScroll 구현), useLayoutEffect
  - https://goforit.tistory.com/206

<br/>

### 2021.08.14 사항

- 댓글 기능을 위한 Component 및 페이지 Component 설계
- Comments DB 설계
- Redux Comment Slice 설계 및 Read, Create 구현
  - https://goforit.tistory.com/207

<br/>

### 2021.08.15 사항

- 댓글 관련 컴포넌트 스타일링
- 컴포넌트에 Comment Read, Create 연결 하기
- Comment delete 구현하기
  - https://goforit.tistory.com/208

<br/>

### 2021.08.16사항

- 최신 댓글 최대 2개 보이기 구현
- 댓글 총 개수 보이기 구현
- useRandom hook 유지 보수
- 신규 유저 가입시 count 넘버링 버그 해결
- 로직 수정에 따른 React devServer 반영 문제

  - https://goforit.tistory.com/209

### 2021.08.17 사항

- 댓글 작성 요청 개선
- 댓글 지우기 요청 기능 구현
- 댓글 창에서 해당 게시글의 text 보기 추가
- 축약된 PostText 더 보기 구현
  - https://goforit.tistory.com/210

<br/>

### 2021.08.18 사항

- 자동 중복 체크 구현(debounce)
- React 에서 debounce 사용시 주의점
- 무한스크롤 데이터 끝 처리 버그 발생
  - https://goforit.tistory.com/212

<br/>

### 2021.08.19 사항

- 무한 스크롤 개선
- Intersection Observer API 활용
- 무한 스크롤 더 이상 데이터가 없는 경우 처리(버그 해결)
  - https://goforit.tistory.com/213

<br/>

### 2021.08.20 사항

- 좋아요 기능 구현
- 좋아요 db 설계
  - https://goforit.tistory.com/214

<br/>

### 2021.08.23, 24 사항

- 유효성 검사 및 피드백, Material UI TextField 커스텀 스타일 적용하기
- 유효성 검사에 따른 submit 버튼 disabled 처리
  - https://goforit.tistory.com/215

<br/>

### 2021.08.25 ~ 30

- 아버지 사과 과수원 수확 도와드림으로 인해 이슈 고찰 정도만 함
- 현재 프로젝트에서의 좋아요 기능 구현의 딜레마
  - https://goforit.tistory.com/216

### 2021.08.31 사항

- 좋아요 기능의 딜레마에서 빠져나오고자, getMoreLikes의 구현을 없애고 각 페이지에 getAllLikes, getCurrentUserLikes, getUserLikes가 getMoreLikes 기능을 각각 가지고 있게 구현하였습니다.
- 하지만, 이런식으로 getMoreLikes 기능도 하나의 함수에 포함시키는 경우 해당 함수에서 분류 해야할 조건이 많아져서 해당 경우의 수를 고려한 구현시 오히려 식이 복잡해 지고 화면에 연결할 때도 복잡한 조건으로 연결하게 되는 경우가 생기게 되었습니다.


# 나중에 구현하고 싶은 기술

<br/>

- [ ] 유저 이름 검색을 통한 프로필 보기 (이름 검색)
- [ ] 익스플로어 화면 (탐색 페이지)
- [ ] 게시글 장소 태그로 장소 지도 보기 (지도 API)
