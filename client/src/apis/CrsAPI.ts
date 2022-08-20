const BASE_URL = 'http://localhost:3000';

export function fetchCourses() {
  return fetch(`${BASE_URL}/courses`)
    .then(response => response.json())
    .then(json => json.result);
}

export function fetchCourseInfo(id: number | undefined) {
  return fetch(`${BASE_URL}/course:${id}`).then(response => response.json());
  // .then(json => json.response.body.items.item[0]);
}
