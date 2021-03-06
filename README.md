# Racstagram_V2 (Redux-toolkit)

<br/>

![instagram_logo](https://user-images.githubusercontent.com/76491635/125172632-b7b10180-e1f5-11eb-98a8-a5977759bd42.png)

<br/>


## ๐ ํ๋ก์ ํธ ์ค๋ช

<br/>

์ด ํ๋ก์ ํธ๋ ๊ธฐ์กด์ React & firebase๋ฅผ ํตํด์ ๋ง๋  ์ธ์คํ๊ทธ๋จ ํด๋ก  ํ๋ก์ ํธ(Racstagram Version1) ๋ฆฌํฉํ ๋ง ํ๋ก์ ํธ ์๋๋ค. Racstagram_v1์ ๋นํด์ ๋ ๋ง์ ๊ธฐ๋ฅ๊ณผ ๋ํ์ผ์ ๊ฐ์ถ์์ต๋๋ค.

<br/>

### ์ํ ๊ด๋ฆฌ

ํด๋น ํ๋ก์ ํธ์์๋ `redux-toolkit(Slice ๋ชจ๋ธ)`์ ์ฌ์ฉํ์ฌ ์ํ๊ด๋ฆฌ๋ฅผ ๊ตฌํํ๊ณ  ์์ต๋๋ค.

<br/>

### ์คํ์ผ

ํ์ฌ SCSS๋ฅผ ์ฑํํ์ฌ css ์์์ ์งํ์ค์ ์์ผ๋ฉฐ, ๋ถ๋ถ์ ์ผ๋ก Material UI๋ฅผ ์ฌ์ฉํ๊ณ  ์์ต๋๋ค.
๋๋ถ๋ถ์ ๊ฒฝ์ฐ์๋, Material UI์ React ํธํ์ฑ ๋ฌธ์ ๋ก ๋๋ถ๋ถ์ SCSS๋ก ์ง์  ๊ตฌํํ๊ณ  ์์ต๋๋ค.

<br/>

### Back End (Server, DB)

Firebase์ Auth, firestore, storage ์๋น์ค๋ฅผ ํ์ฉํ์์ต๋๋ค.  

<br/>

### ์ฃผ์ ๊ธฐ๋ฅ

- ์ด๋ฉ์ผ ๋ก๊ทธ์ธ, ์ด๋ฉ์ผ ํ์๊ฐ์, ์์ ๋ก๊ทธ์ธ
- ๊ฒ์๊ธ CRUD
- ์ข์์ On/Off (Read , Update)
- ๋๊ธ (Create, Delete)
- ์ ์  ์ ๋ณด CRUD
    - ์ฌ์ฉ์ ์ด๋ฆ (Display Name, ์๋ฌด)
    - ์ฌ์ฉ์ ํ๋กํ ์ฌ์ง (Profile Image, ์๋ฌด)
    - ์ฌ์ฉ์ ์๊ฐ (์ ํ)
    - ์ฌ์ฉ์ Sub ์ด๋ฆ (์ ํ)
    - ์ฌ์ฉ์ Website (์ ํ)
- ๋ฌดํ ์คํฌ๋กค
- ๋๋ค ์ ์  ์ถ์ฒ

<br/>

### ์ฃผ์ ์ฌํญ

- Redux์ ๋ง์ ์ฝ๋ ์์ฑ ๋ฐฉ์ ๋๋ฌธ์ Redux-Actions๋ ์ฌ์ฉํด ๋ณด์์ง๋ง, ๋ง์กฑํ์ง ๋ชปํ์ฌ **Redux-Toolkit์ ํ์ฉํ์ฌ ์ข ๋ ํจ์จ์ ์ธ ์ฝ๋ ์์ผ๋ก ๊ฐ๋ฐ์ ์งํํ์์ต๋๋ค.**
- **ํนํ ์ฌ์ฉ์ ๊ด์ ์์ ์ ๊ทผํ์ฌ "๋ฌดํ ์คํฌ๋กค์ ์คํฌ๋กค ์์น ๊ธฐ์ต" ๊ณผ "์ข์์ ๊ธฐ๋ฅ๋ง์ ๋ ๋๋ง"์ ์ํด์ ์ํ ๊ด๋ฆฌ ์ฝ๋๋ฅผ ๊ตฌ์ํ๊ณ  ํ๋ก์ ํธ๋ก ์์ฑํ์ต๋๋ค.**
- **Front-End ๋ฟ๋ง ์๋๋ผ Firebase์ DB๋ฅผ ํตํด ๊ฒ์๊ธ(Posts), ๋๊ธ(Comments), ์ข์์(Likes), User(์ฌ์ฉ์) Data๋ฅผ ์ด๋ป๊ฒ ๊ตฌ์ถํ๊ณ  ๊ด๋ฆฌํ ์ง ๊ณ ๋ฏผํ๊ณ  ํ๋ก์ ํธ๋ฅผ ๋ง๋ค์์ต๋๋ค.**

<br/>
<br/>
<br/>

- ์ฌ๋ฌ๊ฐ์ง ๋ค๋ฅธ ํ๋์ ์์ธํ ๋ณด๊ณ  ์ถ์ผ์๋ค๋ฉด, [ '๋ผ์ฟค์ฝ๋์ ๊ฐ๋ฐ๋ธ๋ก๊ทธ'](https://goforit.tistory.com/)์์ ํ์ธ ๊ฐ๋ฅํฉ๋๋ค.

<br/>

## ๐ป ํ๋ฉด

<br/>

> ### Auth (๋ก๊ทธ์ธ, ํ์๊ฐ์)

<br/>

![auth](https://user-images.githubusercontent.com/76491635/132431708-7c9036cd-94dc-43dd-9c46-0467b57d353b.gif)

- ์ด๋ฉ์ผ ๋ก๊ทธ์ธ
- ์ด๋ฉ์ผ ํ์๊ฐ์
  - ํ์๊ฐ์: ์ด๋ฉ์ผ, ๋น๋ฐ๋ฒํธ ํ์์ ๋ง์์ผ ํ๊ณ  ์ฌ์ฉ์ ์ด๋ฆ์ ์๋ ์ค๋ณต์ฒดํฌ๊ฐ ํต๊ณผ๋์ด์ผ ๊ฐ์ํ๊ธฐ ๋ฒํผ์ด ํ์ฑํ ๋ฉ๋๋ค.
- ์์ ๋ก๊ทธ์ธ
  - ๊ตฌ๊ธ ๋ก๊ทธ์ธ
  - ๊นํ ๋ก๊ทธ์ธ

<br/>

> ### Profile (์ ์  ํ๋กํ)

<br/>

![profile_cu](https://user-images.githubusercontent.com/76491635/132432083-a1bee863-ad7c-4989-84d9-0e0d7ed87f3a.gif)

- ํ์ฌ ์ ์ ์ ๋ค๋ฅธ ์ ์ ์ ํ๋กํ์ ๋ด๋นํ๋ ํ๋ฉด์ผ๋ก, ํ์ฌ ์ ์ ๋ง ์์ ์ ํ๋กํ์ ์์  ๋ฒํผ์ ์ ๊ทผ ๊ฐ๋ฅํฉ๋๋ค.
- ํ๋กํ Update ๋ํ ์ฌ์ฉ์ ์ด๋ฆ ์ค๋ณต ์ฒดํฌ์ ํ๋กํ ์ฌ์ง์ด ๋ฌด์กฐ๊ฑด ์กด์ฌํด์ผ ํฉ๋๋ค.
- ์ ํ์ฌํญ์ผ๋ก SubName, Webstie, Intro๋ฅผ ๋ฃ์ ์ ์์ต๋๋ค.

![profile_r_web](https://user-images.githubusercontent.com/76491635/132432374-9c4a9af3-e4f7-449f-b97e-9c485bd46884.gif)

- ์์ฑ๋ ํ๋กํ ํ๋ฉด์์ ๊ฒ์๊ธ ์ซ์๋ฅผ ํ์ธ ํ  ์ ์์ผ๋ฉฐ, ๋ฑ๋ก๋ Website ํด๋ฆญ์ ํด๋น ํ์ด์ง๋ฅผ ์ํญ์ผ๋ก ๋์๋๋ค.

![user_read](https://user-images.githubusercontent.com/76491635/132432380-c00f73d4-e55f-440e-a13a-30fea9ec7b44.gif)

- ๊ฒ์๊ธ์ ์์ฑ์ ์ด๋ฆ, ๋๊ธ ์์ฑ์ ์ด๋ฆ์ ํด๋ฆญ ํ๊ฑฐ๋ ์ ์  ์ถ์ฒ ์์ญ์์ ํน์  ์ฌ์ฉ์ ๋ณด๊ธฐ๋ฅผ ํด๋ฆญํ๋ฉด ํน์  ์ฌ์ฉ์์ ํ๋กํ์ ๋ณผ ์ ์์ต๋๋ค.

<br/>

> ### Post (๊ฒ์๊ธ)

<br/>

![post_cr](https://user-images.githubusercontent.com/76491635/132432593-d5c70acd-352e-473e-aaaa-8e38dd2fa027.gif)
![post_ud](https://user-images.githubusercontent.com/76491635/132432604-85291b84-e740-4843-98ad-c5429f2563ec.gif)

- ๊ฒ์๊ธ์ ๊ฒฝ์ฐ CRUD๊ฐ ๊ฐ๋ฅํฉ๋๋ค.
- ๊ฒ์๊ธ์ ํญ์ ๊ฒ์๊ธ ์ฌ์ง๊ณผ ๋ด์ฉ์ด ์๋ฌด์ ์ผ๋ก ํ์ํฉ๋๋ค.
- ๊ฒ์๊ธ ์์ ์ ํด๋น ๊ฒ์๊ธ ์ข์ธก ์๋จ ๋ฉ๋ด๋ฅผ ํด๋ฆญํ์ฌ ๋ชจ๋ฌ์ฐฝ์์ ํด๋ฆญ์ ์์  ๋๋ ์ญ์ ๊ฐ ๊ฐ๋ฅํฉ๋๋ค.

<br/>

> ### Infinite Scroll (๋ฌดํ ์คํฌ๋กค)

<br/>

![infinite](https://user-images.githubusercontent.com/76491635/132433019-01b3464f-20d1-4427-b262-2e6fd8cd4935.gif)

- home ๋๋ user post ํ๋ฉด์์ ๊ฒ์๊ธ์ 6๊ฐ๋ฅผ ๋จผ์  ๋ค๊ณ ์ค๊ณ  ๋ฌดํ์คํฌ๋กค์ ํตํด ์ถ๊ฐ์ ์ผ๋ก 6๊ฐ์ฉ ๋ค๊ณ  ์ต๋๋ค.
- user profile์ ์ด๋ฏธ์ง ํ์ด๋ธ์ ๊ฒฝ์ฐ์๋ ๋ฌดํ ์คํฌ๋กค์ด ์ ์ฉ๋์ด ์์ต๋๋ค.

<br/>

> ### Recommend (์ ์  ์ถ์ฒ)

<br/>

![recommend](https://user-images.githubusercontent.com/76491635/132432810-6dda3bd3-0d3e-445a-81f1-77f86e68d99d.gif)

- ์ ์  ์ถ์ฒ์ ๊ฒฝ์ฐ ๋ณธ์ธ์ ์ ์ธํ ์ ์  2๋ช์ ๋๋ค์ผ๋ก ๊ฐ์ ธ์ ์ถ์ฒํฉ๋๋ค.
- ๋ณด๊ธฐ ํด๋ฆญ์ ํด๋น ์ ์ ์ ํ๋กํ์ ํ์ธ ํ  ์ ์์ต๋๋ค.
- racstagram ๋ก๊ณ  ํด๋ฆญ์ update ๋์ด ๋ค๋ฅธ ์ ์ ๋ฅผ ๋ณผ ์ ์์ต๋๋ค.

<br/>

> ### Comment (๋๊ธ)

<br/>

![comments](https://user-images.githubusercontent.com/76491635/132433263-cfbd8ea7-bfff-4168-b9e6-baeff0f59667.gif)

- ๋๊ธ์ ๊ฒฝ์ฐ CREATE์ DELTE ๋ง ๊ฐ๋ฅํฉ๋๋ค.
- ํด๋น ๊ฒ์๊ธ์ '๋๊ธ 0๊ฐ ๋ชจ๋ ๋ณด๊ธฐ' ๋๋ ์ค์์ ์๋ ๋งํ์ ์ ํด๋ฆญํ๋ฉด ๋๊ธ์ ๋ชจ๋ ๋ณผ์ ์์ต๋๋ค.
- ์ต๊ทผ 2๊ฐ์ ๋๊ธ์ ๊ฒ์๊ธ์์ ๋ฐ๋ก ํ์ธํ  ์ ์์ต๋๋ค.
- ๋๊ธ์ ๋ด์ฉ์ด ์๋ ฅ์ด ๋์ด์ผ ์์ฑ ๋ฒํผ์ด ํ์ฑํ ๋๊ณ , ํ์ฌ ์ ์ ๋ง ์์ ์ ๋๊ธ ์ค๋ฅธ์ชฝ์ ํด์งํต ๋ชจ์์ ์ญ์  ๋ฒํผ์ด ๋ํ๋๋ฉฐ ์ ๊ทผ ๊ฐ๋ฅํฉ๋๋ค.

<br/>

> ### Like, MorePostContent (์ข์์, ๊ฒ์๊ธ ๋ด์ฉ ๋ ๋ณด๊ธฐ)

<br/>

![like_more](https://user-images.githubusercontent.com/76491635/132433670-3bd0c5c8-209b-4981-9631-0fb96d67fc5d.gif)

- ์ข์์๋ ๋ชจ๋  ๊ฒ์๋ฌผ์ ์ข์์๋ฅผ ON/OFF ํ  ์ ์์ต๋๋ค.
- ๋ชจ๋  ๊ฒ์๊ธ์ ๋ด์ฉ์ 35์ ๋๋ ๊ฐํ ํฌํจ์ ๊ทธ ๋ถ๋ถ๊น์ง๋ก ์งง๊ฒ ๋ํ๋๋ฉฐ, ๊ฒ์๊ธ ๋ด์ฉ ๋๋ณด๊ธฐ ๋ฒํผ์ด ํ์ฑํ ๋์ด ํด๋ฆญ์ ๋ชจ๋  ๋ด์ฉ์ ๋ณผ ์ ์์ต๋๋ค.


<br/>
<br/>
<br/>

# ๐ ๊ฐ๋ฐ์ผ์ง TIL (Today I Learned, ์ค๋ ๊นจ๋ฌ์ ๊ฒ๋ค)

<br/>

### 2021.07.08 ์ฌํญ

- ํ๋ก์ ํธ ์์, ๊ธฐ๋ณธ ํ๊ฒฝ์ค์ , ํ์ํ ํด๋ ๊ตฌ์กฐ ๋ฐ ํ์ผ Template ์์, Router ์ฐ๊ฒฐ ๊ตฌํ
  - https://goforit.tistory.com/168

<br/>

### 2021.07.09 ์ฌํญ

- ๋ก๊ทธ์ธ ์ต์ ๋ฒ(๋ฆฌ์ค๋), ๋ก๊ทธ์ธ ๊ตฌํ(Social, Email ๋ก๊ทธ์ธ)
  - https://goforit.tistory.com/169

<br/>

### 2021.07.10 ์ฌํญ

- Auth ์ฌํธ์ฑ, ํ์๊ฐ์ ๊ตฌํ, Auth ๊ด๋ จ ์ฌํญ ๋ง๋ฌด๋ฆฌ
  - https://goforit.tistory.com/170

<br/>

### 2021.07.12 ์ฌํญ

- Navigation, ๊ธ ์์ฑ, ๊ธ ๊ฐ์ ธ์ค๊ธฐ ๊ตฌํ (Create, Read ๊ตฌํ)
  - https://goforit.tistory.com/173

<br/>

### 2021.07.13 ์ฌํญ

- ๊ธ ์์ , ๊ธ ์ญ์  ๊ตฌํ (Update, Delete ๊ตฌํ)
  - https://goforit.tistory.com/176

<br/>

### 2021.07.14 ์ฌํญ

- ํ๋กํ ์์  ๊ตฌํ
- profile ์ด๋ฏธ์ง url ์ฒ๋ฆฌ์ ๊ดํ ๋ฌธ์  ๋ฐ์๊ณผ ๊ณ ๋ฏผ
  - https://goforit.tistory.com/177

<br/>

### 2021.07.15 ์ฌํญ

- profile ์ด๋ฏธ์ง url ์ญ์ ์ ๊ดํ ์๋ฌ ์ฒ๋ฆฌ ๋ฌธ์  ํด๊ฒฐ
  - https://goforit.tistory.com/182

<br/>

### 2021.07.19 ์ฌํญ

- ์ ์ฒด์ ์ธ redux state ๊ด๋ฆฌ ๊ตฌ์กฐ ๊ฐํธ
- common slice ์์ฑ
  - https://goforit.tistory.com/183

<br/>

### 2021.07.20 ์ฌํญ

- ํ์ฌ ์ ์ ์ profile ๋ณด์ฌ์ฃผ๊ธฐ ๊ตฌํ
- users database ๊ตฌํ
- profile update์ users db๋ก ๊ด๋ฆฌ ๊ตฌํ
  - https://goforit.tistory.com/184

<br/>

### 2021.07.21 ์ฌํญ

- ์ต์ด ์์ ๋ก๊ทธ์ธ ๋ฐ ๊ฐ์ ์ดํ์ users ๋ฐ์ดํฐ ๋ฒ ์ด์ค ๊ด๋ฆฌ
- Profile Update ๊ตฌํ(userIntro ํฌํจ, users ํ์ฉ)
- falsyํ ํ๋กํผํฐ ๊ฐ์ ๋ฐ๋ฅธ ์ ํ์  ์คํ๋ ๋ ํ ๋น
  - https://goforit.tistory.com/185

<br/>

### 2021.07.22 ์ฌํญ

- imageUrl์ ๋ํ ์๋ฌ(๋ํ์ผ) ์ฒ๋ฆฌ
- fileํ์ input ์๋ฌ ์ฒ๋ฆฌ
- ๋ชจ๋ฌ HOC ๊ตฌํ
- Post ์์ &์ ๊ฑฐ ์ ๊ทผ ์ ํ ๊ตฌํ
  - https://goforit.tistory.com/187

<br/>

### 2021.07.23 ์ฌํญ

- ํ์ฌ ์ ์ &๋ค๋ฅธ ์ ์  profile ํ๋ฉด์ userPosts, userInfo ๊ตฌํ
- ๋ค๋ก๊ฐ๊ธฐ ์ ํ์ ์ํ history๊ด๋ฆฌ
  - https://goforit.tistory.com/188

<br/>

### 2021.07.24 ์ฌํญ

- firebase ๋ณด์ ๊ท์น ์์ , react ์ด๋ฒคํธ ๋ฒ๋ธ๋ง(stopPropagation ์๋ ์๋ฌ), displayName ๊ณ ์ ํ๋ฅผ ์ํ userName ์ค๋ณต check ๊ตฌํ
  - https://goforit.tistory.com/189

<br/>

### 2021.07.26 ์ฌํญ

- Post detail view ๋ง๋ค๊ธฐ, ๋ณด์ผ๋ฌ ํ๋ ์ดํธ ์ฝ๋์ ๋ํ ๊ณ ๋ฏผ
  - https://goforit.tistory.com/190

<br/>

### 2021.07.27 ์ฌํญ

<br/>

- ๋ฆฌ๋์ค store state ๊ตฌ์กฐ ๊ฐํธ, useSelector์ ๋ํ ๋ ๋๋ง์ ๋ํ ๊ณ ๋ฏผ, history๋ฅผ ํ์ฉํ ์ ๋ณด ์ ๋ฌ
  - https://goforit.tistory.com/191

<br/>

### 2021.07.28 ์ฌํญ

- Container ๊ตฌ์กฐ ๋ฆฌํฉํ ๋ง, ์ด๋ฏธ์ง ๋ฆฌ์ฌ์ด์ง
  - https://goforit.tistory.com/192

<br/>

### 2021.07.29 ์ฌํญ

- ์คํ์ผ๋ง ์์ ๋ฐฉ์ ์ ํ, SCSS ์คํ์ผ๋ง์ ์ํ ๋๋  ๊ตฌ์กฐ, Load, Navigation ์ปดํฌ๋ํธ, ํด๋ ๊ตฌ์กฐ ํ์ธ CLI command
  - https://goforit.tistory.com/194

<br/>

### 2021.07.30 ์ฌํญ

- material ui ๋์, ๋ก๊ทธ์ธ, ํ์๊ฐ์ ์ฐฝ ์คํ์ผ๋ง
  - https://goforit.tistory.com/195

<br/>

### 2021.08.01 ์ฌํญ

- Taget container is not a Dom element ์๋ฌ ํด๊ฒฐ, React ๋ ๋๋ง์ ๋ํ ๊ณ ์ฐฐ
  - https://goforit.tistory.com/196

<br/>

### 2021.08.02 ์ฌํญ

- Home ํ์ด์ง ์คํ์ผ๋ง ์์ , Write ํ์ด์ง ์คํ์ผ๋ง
  - https://goforit.tistory.com/197

<br/>

### 2021.08.03 ์ฌํญ

- Material UI findDOMNode Error, Drop Menu UI ๊ตฌํ (๋๋กญ ๋ฉ๋ด), Modal UI ์ฌ๊ตฌํ, Confirm UI ๊ตฌํ
  - https://goforit.tistory.com/198

<br/>

### 2021.08.04 ์ฌํญ

- ํ์ด์ง ๋ฐ์ํ Navigation Icon
- Profile ํ์ด์ง ์คํ์ผ๋ง ๊ตฌํ
- ์ธ์คํ๊ทธ๋จ์ Image Table ๊ตฌํํ๊ธฐ
- SCSS '/' (๋๋๊ธฐ ์ฐ์ฐ์) ๊ธฐ๋ฅ Deprecated ๊ฒฝ๊ณ  ํด๊ฒฐ
- ๋ฐ์ํ ์น์ ์ํ ์์ ์ค ์์ ์์ ๊ตฌ์กฐ ๋ณ๊ฒฝ ํ์์ ์ํ useWindowSize ์ฌ์ฉ
- a ํ๊ทธ ํด๋ฆญ์ ์ํญ์ผ๋ก ์ด๊ธฐ(target: '\_blank')
  - https://goforit.tistory.com/199

<br/>

### 2021.08.05 ์ฌํญ

- Profile ํ์ด์ง, User ํ์ด์ง ํตํฉ
- Presentaional ์ปดํฌ๋ํธ ์ญํ ์ธ PostUpdate์ PostForm ํตํฉ(PostForm ์ฌ์ฌ์ฉ)
- PostForm ์ปดํฌ๋ํธ์ input ์์๋ค์ required ์์ฑ์ผ๋ก ์ธํ validation error ํด๊ฒฐ
- Post, Auth ํ์ด์ง ์ปดํฌ๋ํธ ๊ด๋ จ input๋ค input ์ ๋ฌด ์ฒดํฌํ์ฌ ๋ด๋ถ ์ ์ธ alertํ์ ๊ตฌํ
  - https://goforit.tistory.com/200

<br/>

### 2021.08.06 ์ฌํญ

- ๋๋กญ ๋ฉ๋ด ์คํ์ผ ๋ณ๊ฒฝ
- Auth Error Code๋ฅผ ํตํ Message ์ค์ 
- Profile ์์  ํ์ด์ง ์คํ์ผ๋ง ๋ฐ website, subDisplayName input ์ถ๊ฐ
- ์ ๊ท ํํ์์ ํตํ ์ฌ์ฉ์ website Url ํฌ๋งทํ
- ๊ฒ์๊ธ ๊ฐ์ ํ์ ๊ตฌํ
- Noto Sans KR ํฐํธ ์ ์ฉ
  - https://goforit.tistory.com/201

<br/>

### 2021.08.08 ์ฌํญ

- Post Detail View๋ก ์ด๋์ ํด๋น ๊ธ์ scrollTop ์์น๋ก ์ด๋ํ๊ฒ ๊ตฌํํ๊ธฐ
  - ๋ค๋ฅธ ์ ์  ๋ฐ ์์ ์ ํ๋กํ์ ์๋ post Image table์์ ํน์  ์ด๋ฏธ์ง ํด๋ฆญ์ ํด๋น ๊ธ์์น๋ก ์ด๋ ํจ
  - https://goforit.tistory.com/203

<br/>

### 2021.08.09์ฌํญ

- ๋ณธ์ธ์ ์ ์ธํ ๋๋ค ์ ์  ์ถ์ฒ ๊ธฐ๋ฅ ๊ตฌํ
- side ์ปดํฌ๋ํธ ์คํ์ผ๋ง (ํ์ ์ถ์ฒ + ํธํฐ)
  - https://goforit.tistory.com/204

<br/>

### 2021.08.11์ฌํญ

- ๋ฌดํ์คํฌ๋กค ๊ตฌํ (IntersectionObserver)
- ๋ถํ์ํ ๋ฐ์ดํฐ ์์ฒญ ์ ๊ฑฐ ๋ฐ ๋ฐ์ดํฐ ์์ฒญ ์๊ธฐ ์กฐ์ 
- ์ฝ๋ ์ค๋ณต ์ ๊ฑฐ๋ฅผ ์ํ ํตํฉ์ ๋ํ ๊ณ ์ฐฐ
- https://goforit.tistory.com/205

<br/>

### 2021.08.13 ์ฌํญ

- ๋๋ค ์ ์  ์ถ์ฒ ๊ฐ์ (useRandom ๊ตฌํ)
- ์คํฌ๋กค ์์น ๊ธฐ์ต(useScroll ๊ตฌํ), useLayoutEffect
  - https://goforit.tistory.com/206

<br/>

### 2021.08.14 ์ฌํญ

- ๋๊ธ ๊ธฐ๋ฅ์ ์ํ Component ๋ฐ ํ์ด์ง Component ์ค๊ณ
- Comments DB ์ค๊ณ
- Redux Comment Slice ์ค๊ณ ๋ฐ Read, Create ๊ตฌํ
  - https://goforit.tistory.com/207

<br/>

### 2021.08.15 ์ฌํญ

- ๋๊ธ ๊ด๋ จ ์ปดํฌ๋ํธ ์คํ์ผ๋ง
- ์ปดํฌ๋ํธ์ Comment Read, Create ์ฐ๊ฒฐ ํ๊ธฐ
- Comment delete ๊ตฌํํ๊ธฐ
  - https://goforit.tistory.com/208

<br/>

### 2021.08.16์ฌํญ

- ์ต์  ๋๊ธ ์ต๋ 2๊ฐ ๋ณด์ด๊ธฐ ๊ตฌํ
- ๋๊ธ ์ด ๊ฐ์ ๋ณด์ด๊ธฐ ๊ตฌํ
- useRandom hook ์ ์ง ๋ณด์
- ์ ๊ท ์ ์  ๊ฐ์์ count ๋๋ฒ๋ง ๋ฒ๊ทธ ํด๊ฒฐ
- ๋ก์ง ์์ ์ ๋ฐ๋ฅธ React devServer ๋ฐ์ ๋ฌธ์ 

  - https://goforit.tistory.com/209

### 2021.08.17 ์ฌํญ

- ๋๊ธ ์์ฑ ์์ฒญ ๊ฐ์ 
- ๋๊ธ ์ง์ฐ๊ธฐ ์์ฒญ ๊ธฐ๋ฅ ๊ตฌํ
- ๋๊ธ ์ฐฝ์์ ํด๋น ๊ฒ์๊ธ์ text ๋ณด๊ธฐ ์ถ๊ฐ
- ์ถ์ฝ๋ PostText ๋ ๋ณด๊ธฐ ๊ตฌํ
  - https://goforit.tistory.com/210

<br/>

### 2021.08.18 ์ฌํญ

- ์๋ ์ค๋ณต ์ฒดํฌ ๊ตฌํ(debounce)
- React ์์ debounce ์ฌ์ฉ์ ์ฃผ์์ 
- ๋ฌดํ์คํฌ๋กค ๋ฐ์ดํฐ ๋ ์ฒ๋ฆฌ ๋ฒ๊ทธ ๋ฐ์
  - https://goforit.tistory.com/212

<br/>

### 2021.08.19 ์ฌํญ

- ๋ฌดํ ์คํฌ๋กค ๊ฐ์ 
- Intersection Observer API ํ์ฉ
- ๋ฌดํ ์คํฌ๋กค ๋ ์ด์ ๋ฐ์ดํฐ๊ฐ ์๋ ๊ฒฝ์ฐ ์ฒ๋ฆฌ(๋ฒ๊ทธ ํด๊ฒฐ)
  - https://goforit.tistory.com/213

<br/>

### 2021.08.20 ์ฌํญ

- ์ข์์ ๊ธฐ๋ฅ ๊ตฌํ
- ์ข์์ db ์ค๊ณ
  - https://goforit.tistory.com/214

<br/>

### 2021.08.23, 24 ์ฌํญ

- ์ ํจ์ฑ ๊ฒ์ฌ ๋ฐ ํผ๋๋ฐฑ, Material UI TextField ์ปค์คํ ์คํ์ผ ์ ์ฉํ๊ธฐ
- ์ ํจ์ฑ ๊ฒ์ฌ์ ๋ฐ๋ฅธ submit ๋ฒํผ disabled ์ฒ๋ฆฌ
  - https://goforit.tistory.com/215

<br/>

### 2021.08.25 ~ 30

- ์๋ฒ์ง ์ฌ๊ณผ ๊ณผ์์ ์ํ ๋์๋๋ฆผ์ผ๋ก ์ธํด ์ด์ ๊ณ ์ฐฐ ์ ๋๋ง ํจ
- ํ์ฌ ํ๋ก์ ํธ์์์ ์ข์์ ๊ธฐ๋ฅ ๊ตฌํ์ ๋๋ ๋ง
  - https://goforit.tistory.com/216

### 2021.08.31 ์ฌํญ

- ์ข์์ ๊ธฐ๋ฅ ๊ตฌํ์ ๋๋ ๋ง์์ ๋ฒ์ด๋๊ณ ์ ๋๋์ ์ผ๋ก ๋ฆฌํฉํ ๋ง ์ค์
  - https://goforit.tistory.com/217

### 2021.09.07 ์ฌํญ

- ๋ง์ด ๋ชจ์๋ผ์ง๋ง, ์ฃผ์ ๊ธฐ๋ฅ ๊ตฌํ์ดํ ๋ฐฐํฌํด๋ณด์์ต๋๋ค.
  - https://goforit.tistory.com/218

<br/>

# ๋์ค์ ๊ตฌํํ๊ณ  ์ถ์ ๊ธฐ์ 

<br/>

- [ ] ์ ์  ์ด๋ฆ ๊ฒ์์ ํตํ ํ๋กํ ๋ณด๊ธฐ (์ด๋ฆ ๊ฒ์)
- [ ] ์ต์คํ๋ก์ด ํ๋ฉด (ํ์ ํ์ด์ง)
- [ ] ๊ฒ์๊ธ ์ฅ์ ํ๊ทธ๋ก ์ฅ์ ์ง๋ ๋ณด๊ธฐ (์ง๋ API)
