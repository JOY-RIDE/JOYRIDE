import axios from 'axios';

const JOYRIDE_DOMAIN = ''; // TODO
const JOYRIDE_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? JOYRIDE_DOMAIN
    : 'http://localhost:3000';

export const joyrideAxios = axios.create({
  baseURL: JOYRIDE_BASE_URL,
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
