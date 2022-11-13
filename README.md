# JOYRIDE

![joyrideUI](https://user-images.githubusercontent.com/90044231/200184168-2d2cf3ab-389d-463d-86af-425f6279ffbb.png)

<div align='center'>https://joyride.site/</div>

<br>

## 🚲 서비스 소개

> 자전거 코스 정보부터 맞춤형 모임까지, 내게 필요한 자전거 라이딩 서비스

<br/>

국내 라이더들이 자전거 코스에 대해 원하는 정보를 편리하게 모아볼 수 있도록 할 수는 없을까?

본인에게 딱 맞는 조건의 모임에 참가하여 즐겁게 라이딩을 즐길 수 있도록 할 수는 없을까?

**JOYRIDE**는 라이더들이 즐겁고 편리하게 이용할 수 있는 서비스를 만들고 싶다는 고민에서 탄생했습니다.

<br/>

JOYRIDE는 한국관광공사의 API를 통해 <u>신뢰할 수 있는 국내 자전거 코스 정보</u>를 제공합니다.

거리, 소요 시간, 난이도 등 기본 정보 뿐만 아니라 화장실, 식당 등 코스 주변의 편의시설까지 확인해 보세요!

경관, 편의시설, 접근성, 안전 등 라이더들이 중요하게 생각하는 요소들에 대한 정보는 라이더들의 항목별 코스 리뷰로 확인할 수 있습니다.

<br/>

JOYRIDE에서는 다양한 옵션 필터링을 통해 <u>니즈에 맞는 자전거 모임</u>을 개설하거나 참가할 수 있습니다.

지역, 난이도, 자전거 종류, 성별, 나이 등 다양한 필터를 통해 모임을 찾아보세요!

모임 집결지와 대략적인 루트도 확인할 수 있으며, 댓글을 통해 모임 참가자들과 소통할 수 있습니다.

<br/>

JOYRIDE를 통해 즐겁고 편리한 라이딩을 즐겨보세요 🚴‍♂️

<br/>

#### 🌱 Demo 계정

Email: unhyif@gmail.com

Password: Tour2022!

---

## 🗺️ 사이트맵

![Sitemap](https://user-images.githubusercontent.com/93528293/200178733-d8c3ff72-6ad5-4514-baf3-775dd00be688.png)

<br>

## ☝️ 주요 기능

### 1. 메인 페이지

![Mainpage](https://user-images.githubusercontent.com/90044231/200187302-6477d79e-fb39-41f1-8adf-de6809706ea5.png)

### 2. 회원가입, 로그인

![SignupLogin](https://user-images.githubusercontent.com/90044231/200187551-49e82d1b-d0c0-42af-b47d-7c2bd41ff1c3.png)

### 3. 코스 정보

#### 3-1. 코스 정보 목록

다양한 코스 탐색 및 기준별 정렬

![CourseList](https://user-images.githubusercontent.com/90044231/200187943-e81d2791-f48d-491a-9c25-69fe98bf2e79.png)

#### 3-2. 코스 정보 디테일

코스 기본 정보, 주변 시설, 항목별 코스 리뷰

![CourseDetail](https://user-images.githubusercontent.com/90044231/200188114-938cee2e-cbe2-4a56-bd6a-3aed9e09f258.png)

### 4. 자전거 모임

#### 4-1. 자전거 모임 목록

필터링을 통한 모임 탐색 및 모임 생성

![MeetupList](https://user-images.githubusercontent.com/90044231/200188307-2ef54923-ee51-4e9a-849b-d73e777f24b9.png)

#### 4-2. 자전거 모임 디테일

모임 정보, 모임 참가, 댓글

![MeetupDetail](https://user-images.githubusercontent.com/90044231/200188386-a8e18bc4-7f92-46ea-95a8-a8e5cae30772.png)

### 5. 마이페이지

좋아요한 코스, 개설한 모임, 참가한 모임, 북마크한 모임 등 모아보기

![Mypage](https://user-images.githubusercontent.com/90044231/200188522-af8d3fc8-133f-480d-8875-4d3d77d96b37.png)

<br>

## ⚒️ 기술 스택

- Frontend: TypeScript, React, Recoil, React Query, SCSS, Material UI
- Backend: Java, Spring Boot
- Design: [Figma](https://www.figma.com/file/SdFr421vxg8o2MfQs3RVPo/JOYRIDE-Design?node-id=0%3A1)
- Communication: Notion, Slack, Google Drive

<br>

## 📁 폴더 구조

#### Frontend

```
client
└── src
   ├── apis
   ├── assets
   |  ├── icons
   |  └── images
   ├── components
   |  ├── common
   |  ├── home
   |  ├── layout
   |  ├── login
   |  ├── meetup
   |  ├── meetups
   |  ├── mypage
   |  ├── resetPassword
   |  ├── road
   |  ├── roads
   |  ├── search
   |  ├── signup
   |  └── transitions
   ├── hooks
   |  ├── common
   |  ├── signup
   ├── routes
   |  ├── Auth
   |  ├── Home
   |  ├── Layout
   |  ├── Meetup
   |  ├── Meetups
   |  ├── Mypage
   |  ├── Road
   |  ├── Roads
   |  └── Search
   ├── states
   ├── styles
   ├── types
   └── utils
```

#### Backend

```
  src
   ├── test
   |   └── java
   |       └── joyride
   └── main
       └── java
       |   ├── util
       |   ├── src
       |   |   ├── auth
       |   |   |   ├── dto
       |   |   |   ├── model
       |   |   ├── course
       |   |   |   ├── dto
       |   |   |   ├── model
       |   |   ├── meet
       |   |   |   ├── dto
       |   |   |   ├── model
       |   |   ├── user
       |   |   |   ├── model
       |   |   ├── jwt
       |   |   |   └── filter
       |   |   |   └── handler
       |   |   ├── config
       |   └── JoyriderServerApplication
       └── resources
```

<br>

## 📗 개발 Wiki

[Git 컨벤션, 코드 컨벤션 보기](https://github.com/JOY-RIDE/JOYRIDE/wiki/%EA%B0%9C%EB%B0%9C-Wiki)

<br>

## 👨‍👩‍👧‍👦 만든 사람들

- Frontend Developers: [김지현](https://github.com/unhyif), [김수현](https://github.com/SuehyunKim)
- Backend Developers: [신원석](https://github.com/tkddls23), [신상우](https://github.com/sangwoonoel)
- Designer: [권윤](https://github.com/yoonk2)

<br>

## 📧 Contact

[joyride.webservice@gmail.com](mailto:joyride.webservice@gmail.com)
