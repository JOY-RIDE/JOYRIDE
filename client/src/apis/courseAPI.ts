import { joyrideAxios as axios } from './axios';
import { ServerIRoad } from '../types/course';

const BASE_URL = process.env.REACT_APP_JOYRIDE_API_URL;

interface CourseAPI {
  createReview: (newReview: string) => Promise<void>;
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
};

export function fetchFilteredReviews(
  courseNm: string | undefined,
  filter: string | undefined
) {
  return fetch(`${BASE_URL}/courses/review/${courseNm}/${filter}`)
    .then(response => response.json())
    .then(json => json.result);
}
