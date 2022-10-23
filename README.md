# JOYRIDE

![joyrideUI](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c3db21ec-0f8a-475f-9bcd-e30c249759f1/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221023%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221023T162424Z&X-Amz-Expires=86400&X-Amz-Signature=191e4a927811a0a7d50bec648dd5617313313c27cd848153a82eb97ea63105e8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

### 서비스 소개
#### 바로가기 : https://joyride.site/
#### 코스 정보부터 맞춤형 모임까지, 내게 필요한 라이딩 웹 서비스

### 프론트엔드 폴더 구조

```
client
├── public
└── src
   ├── apis
   ├── assets
   |  └── images
   ├── components
   |  ├── common
   |  ├── home
   |  ├── layout
   |  ├── login
   |  ├── meetups
   |  ├── road
   |  ├── roads
   |  └── signup
   ├── hooks
   ├── routes
   |  ├── Error
   |  ├── Home
   |  ├── Layout
   |  ├── Login
   |  ├── Meetup
   |  ├── Meetups
   |  ├── Mypage
   |  ├── Road
   |  ├── Roads
   |  ├── Search
   |  └── Signup
   ├── states
   ├── styles
   ├── types
   └── utils
```

### 백엔드 폴더 구조

```
JOYRIDE
└── src
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

### JOYRIDE GitHub flow

![GitHub flow](https://user-images.githubusercontent.com/78777461/183014551-24e1c15b-d1d9-4f62-9c73-464fbbd662c0.png)
