# JOYRIDE

https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5896127f-546b-49eb-9eee-d51ef4b36680/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221023%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221023T162239Z&X-Amz-Expires=86400&X-Amz-Signature=de4cd438504efdfe81f57652fac20dd0a8fa7a396b9144edc4765d4ffe3dd4df&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject

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
