# 프로젝트

이 프로젝트는 기존에 React & firebase를 통해서 만든 인스타그램 클론 프로젝트 리팩토링 프로젝트 입니다.

해당 프로젝트에서는 redux-toolkit을 사용하여 상태관리를 구현하고 있습니다.

더불어 나중에, styled component나 sass 중에 채택하여 css 작업을 할 예정 입니다.

<br/>

# 오늘 깨달은 것

<br/>

## 20210708

<br/>

- `Page의 Container는 없는게 좋을듯 하다.`

  - page는 말 그대로 page니까, Container 또는 Component 만을 배치하는 용도로 사용하는 것이 좋을 듯 하다.

<br/>

- `Error : A non-serializable value was detected in an action`

  - 엄청 큰 데이터를 받아서 하나의 Action 객체를 만들려고 하면 에러 발생함
  - ActionCreator에 데이터를 넣어 Action을 만들기 전에, 해당 데이터에 필요한 데이터만 가져오도록 하자
  - toolkit을 사용하면, slice에서 prepare 프로퍼티를 지정하면 action을 만들 데이터를 사전에 가공할 수 있음

<br/>

- `dispatch 사용시 ActionCreator를 참조하지 말고 꼭 호출하는 것을 잊지말자`

<br/>

- `createAsyncThunk 사용시 try-catch, async-await를 잊지 말자`

  - slice 방식을 사용하는 비동기 작업은 createAsyncThunk를 통해서 쉽게 구현할 수 있다.
  - 에러를 받고, 비동기 작업을 연속으로 처리하는 과정은 try-catch문, async-await 조합으로 하는게 깔끔하니 좋다.
  - then, catch 방식은 가독성이 떨어지는듯 하다.

<br/>

- `Detail Error 받기`

  - Detail Error를 받으려면 ExtraReducers에 `action.payload`로 Error를 받아오도록 해야한다.
  - action.error는 단지 rejected message 밖에 없다.

<br/>

- 나중에, redux-toolkit용 component, container, module/slice, rootReducer, store까지 설정해 놓은 **template를 만들어 놓으면 좋을 듯하다.**
  - modules/slice : Async, Initial State, Slice, actionCreator 영역을 주석으로 구분하고 각각 어느정도 구성을 해놓은 형태
  - container : component를 연결하는 형태
  - component : 간단한 jsx를 return하여 구분할 수 있는 형태
  - Router component : 간단한 Route 묶음 형태
  - rootReducer : slice.reducer를 묶는 combineReducers의 형태
  - store : rootReducer를 연결해 놓는 형태

<br/>
<br/>
<br/>

## 20210709

- 궁금한점

  - redux를 사용하는데, react-redux에서 제시하는 container component 개념으로 component를 깨끗하게 template로만 사용하는 용도 하고 싶다
  - 하지만, 너무 그렇게 하면 오히려 component를 더 많이 만드는 것이 아닌가라는 생각도 든다.
  - container 패턴에 딱 맞게 하는게 좋을 까 아니면, 융통성 있게 component를 작업 함수로 오염을 시켜도 될까?
  - contextAPI vs redux-toolkit vs graphql -> 과연 어느 상태 관리가 좋을 까?

- 깨달은 점

  - `input`을 구현할 때 controlled component 방식은 input의 event를 통해서 입력을 받아 react의 상태값을 일치 시키고 해당 값을 다시 input 컴포넌트에 반영하여 일치시키는 작업

    - 여러 input을 사용하는 경우 객체에 한번에 담아 사용하는 게 보기 좋은 듯함
    - 객체 안의 값은 변하는 값이지만, 객체 식별자가 참조하는 값(객체가 들어있는 메모리 주소)은 변하지 않기 때문에 react에서는 변한 값이라고 인식하지 못하여 render를 하지 않음
    - useState 사용시 화면이 rendering 될수 있게 새로운 객체가 setState 되게 해야함 (새로운 값이라고 인식하게 해야함)

  - `form`을 사용하는 이유는 짐작으로는 단지, enter를 통해서 해당 액션이 일어나게 하려는 것 같다.

    - 어차피 controlled component 방식으로 input을 사용하는 경우, react state에 반영되어서 이미 값을 가진 상태인데, button onClick으로 그냥 해당 액션을 요청하면 되지 않나라는 생각이 든다.

  - `useRef`는 실제 돔의 여러가지 상태를 조작해야 하는 경우 사용하는 것(비제어 컴포넌트)

<br/>
<br/>
<br/>

## Auth

### 20210710

- [x] Auth 로그인 화면, 가입화면 통합 하여 토글로 변경
  - [x] id, password 넣은 input은 공유하고, 가입화면에만 nickname input 추가 구현
- [x] email 로그인 구현
- [x] email 가입 구현
  - [x] 가입시 바로 로그인
  - [x] 가입시 nickname input으로 사용할 이름을 받아 사용자 profile displayName을 초기에 설정 (사용자 info는 로그인 해야 업데이트 할 수 있음)
- [x] error Auth 화면에 보이기
- [x] social 로그인 Popup -> Redirect (브라우저는 popup 띄우는것을 안좋아함, popup시 error로 중지는 안되지만 콘솔에 경고가 뜸)
