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
