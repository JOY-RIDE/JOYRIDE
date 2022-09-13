import { joyrideAxios as axios } from './axios';

const BASE_URL = process.env.REACT_APP_JOYRIDE_API_URL;

interface CourseAPI {
  createReview: (newReview: string) => Promise<void>;
  getLikedCourseList: (userId: number) => Promise<any[]>;
}

export const courseAPI: CourseAPI = {
  async createReview(newReview: string) {
    const {
      data: { code },
    } = await axios.post('/courses/review', newReview, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (code !== 1000) {
      throw new Error(code);
    }
  },

  async getLikedCourseList(userId) {
    const {
      data: { code, result },
    } = await axios.get(`/courses/${userId}/like`);

    if (code !== 1000) {
      throw new Error(code);
    }
    return result;
  },
};

export function fetchFilteredReviews(
  courseNm: string | undefined,
  filter: string | undefined
) {
  return fetch(`${BASE_URL}/courses/review/${courseNm}/${filter}`)
    .then(response => response.json())
    .then(json => json.result);
}
