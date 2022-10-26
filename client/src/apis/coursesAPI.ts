import { COURSE_FILTERS_INITIAL_STATE } from 'states/course';
import QueryString from 'qs';
import { mapValues, uniqBy } from 'lodash';
// const BASE_URL = 'http://localhost:3000';
const BASE_URL = `https://apis.data.go.kr/B551011/Durunubi/courseList?MobileOS=ETC&MobileApp=joyride&ServiceKey=${process.env.REACT_APP_TOUR_API_KEY}&brdDiv=DNBW`;
const SERVER_URL = process.env.REACT_APP_JOYRIDE_API_URL;

function getTotalCount() {
  return fetch(`${BASE_URL}&_type=json`)
    .then(response => response.json())
    .then(json => json.response.body.totalCount)
    .then(data => console.log(data));
}

export function fetchCourses() {
  return fetch(`${BASE_URL}&numOfRows=114&_type=json`)
    .then(response => response.json())
    .then(json => json.response.body.items.item);
}

export function fetchFilteredCourses(
  level: number | undefined,
  sigun: string | undefined
) {
  return fetch(`${SERVER_URL}/courses/filter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      level: level,
      sigun: `${sigun}`,
    }),
  })
    .then(response => response.json())
    .then(json => json.result);
}

export function fetchCourseInfo(courseNm: string | undefined) {
  return fetch(`${BASE_URL}&crsKorNm=${courseNm}&_type=json`)
    .then(response => response.json())
    .then(json => json.response.body.items.item[0]);
  //   return fetch(`${BASE_URL}/course:${id}`).then(response => response.json());
}

export function fetchCoursesFromServer(filters = COURSE_FILTERS_INITIAL_STATE) {
  const filtersWithValueOnly = mapValues(filters, 'value');
  const query = QueryString.stringify(filtersWithValueOnly, {
    encode: false,
  });
  return fetch(`${SERVER_URL}/courses` + (query && '?' + query))
    .then(response => response.json())
    .then(json => json.result);
}

export function fetchCourseFromServer(crsNm: string | undefined) {
  return fetch(`${SERVER_URL}/courses/${crsNm}`)
    .then(response => response.json())
    .then(json => json.result);
}

export async function getCourseNames() {
  let courses = await fetchCourses();
  courses = uniqBy(courses, 'crsKorNm');
  const courseNames = courses.map((course: any) => course.crsKorNm);
  return courseNames.sort();
}
