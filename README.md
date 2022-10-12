# C-Flix (씨플릭스)

![](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
<br>

**React**를 이용한 넷플릭스 클론 사이트입니다.<br>

<br>

---

## 🌐 프로젝트 링크

[클릭](https://wannabeing.github.io/c-flix/#)하시면 이동합니다.

---

## 🚀 개발환경

- **프론트엔드**: React
- **배포**: Github Page
- **라이브러리**: npm, react-query, styled-componenet 등
- **언어**: JavaScript, TypeScript

---

## 📦 프로젝트 구조

    src
    ├── apis/*              # 영화/드라마 API 폴더
    └── assets              # static 폴더
        └── images/*        # image 폴더
    └── components          # 리액트 컴포넌트 폴더
        └── movies/*        # 영화 컴포넌트 폴더
        └── tv/*            # 드라마 컴포넌트 폴더
        └── Header.tsx      # Header 컴포넌트.tsx
        └── Loader.tsx      # Loader 컴포넌트.tsx
    ├── Routes/*            # 리액트 라우터 폴더
    ├── utils/*             # JS 유틸 폴더
    ├── App.tsx             # 컴포넌트 관계 정의 컴포넌트.tsx
    ├── index.css           # css 초기화 컴포넌트.tsx
    ├── index.tsx           # 메인 컴포넌트.tsx
    ├── react-app-env.d.ts  # 타입스크립트 설정
    ├── styled.d.ts         # 컬러 변수 설정
    └── theme.tsx           # 컬러 설정

---

## ⚙️ 기능

- **영화/드라마**

  - API 요청 전, 로딩 페이지 구현
  - 다양한 카테고리 별 영화/드라마 출력
  - 슬라이드 기능 구현
  - 상세 페이지 모달 기능 구현
  - 영화/드라마 검색 기능 구현

- **이외**
  - 스타일 컴포넌트를 통한 css 컴포넌트 통합
  - React-Query를 통한 API 패치
  - React-Hook-Form을 통한 검색 기능 구현

---

## ⏱️ 앞으로 추가/수정할 수 있는 기능

    - 쿼리요청이 너무 많아 사이트가 약간 버벅이는 현상
    - 배우 정보 상세페이지 구현
    - 영화/드라마 상세 설명페이지 구현
    - 토렌트 API를 통한 파일 제공?

---

## 🎞 상세 페이지 정보

<details>
<summary>메인 페이지</summary>

> ### 로딩상태
>
> ![ezgif com-gif-maker](https://user-images.githubusercontent.com/79440384/195429883-602aa6d8-e2d6-4d8b-bb78-019e8632dab5.gif)

> ### 로딩 후
>
> ![image](https://user-images.githubusercontent.com/79440384/195436637-6636f6f6-04d9-4b94-99e4-f7bdc7a924d6.png)

</details>
<details>
<summary> 영화/드라마 페이지 </summary>

> ### 슬라이더 기능
>
> ![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/79440384/195431698-d52fe419-543b-4947-8f61-9d9b74e0f91e.gif)

> ### 상세 페이지
>
> ![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/79440384/195431529-e1b5ec61-fa1b-4189-a0ba-95c3cf3f5c41.gif)

</details>
<details>
<summary> 검색 페이지 </summary>

>     검색어가 들어간 영화/드라마 텍스트 출력
>     검색어가 들어간 영화/드라마 컴포넌트 출력
>
> ![](https://velog.velcdn.com/images/wannabeing/post/7b3d1e4e-1c0c-4533-88b5-279347a7aa5b/image.png)

</details>

---

## 👩‍💻 느낀 점

- SPA/SSR/CSR에 대해 공부할 수 있던 경험이었다.
  씨튜브 프로젝트에선 볼 수 없었던 빠른 페이지 전환이 인상적이었다.
- 컴포넌트 단위로 페이지를 만들고, 스타일컴포넌트를 통해 css도 컴포넌트 안에서 정의하면서 정말 편리했다.
- 또한 타입스크립트는 개발자를 보호해준다는 느낌을 받았다.
  아직은 불편하다고 느끼기 때문에 빨리 적응해야겠다.
- 리액트쿼리와 Recoil을 통해 비동기 데이터 관리 및 상태관리 시스템의 편리함을 느꼈다.
- 리액트훅폼은 씨튜브에선 정말 한땀한땀 했어야 됐던 걸 라이브러리 하나로 구현 할 수 있다는게 현타가 왔다.
- **아쉬웠던 점은**, 쿼리요청이 한 컴포넌트에서 너무 많이 일어나 앱이 느려진다는 것이 있다. 정리하면서 보니 리팩토링 할 부분이 산더미인거같다.ㅠ
