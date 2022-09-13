import axios from 'axios';

export const joyrideAxios = axios.create({
  baseURL: process.env.REACT_APP_JOYRIDE_API_URL,
  withCredentials: true,
});

// const TOUR_API_KEY =
//   process.env.NODE_ENV === 'production'
//     ? ''
//     : process.env.REACT_APP_TOUR_API_KEY;
// const TOUR_BASE_URL = `https://apis.data.go.kr/B551011/Durunubi/courseList?MobileOS=ETC&MobileApp=joyride&ServiceKey=${TOUR_API_KEY}&brdDiv=DNBW&numOfRows=114&_type=json`;

// export const tourAxios = axios.create({
//   baseURL: TOUR_BASE_URL,
// });
