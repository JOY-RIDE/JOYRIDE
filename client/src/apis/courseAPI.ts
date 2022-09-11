import { joyrideAxios as axios } from './axios';
import { ServerIRoad } from '../types/course';

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
