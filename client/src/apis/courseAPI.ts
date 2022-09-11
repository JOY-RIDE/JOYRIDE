import { joyrideAxios as axios } from './axios';
import { ServerIRoad } from '../types/course';

interface CourseAPI {
  createReview: (newReview: string) => Promise<void>;
  getReviewList: (crsNm: string) => Promise<ServerIRoad[]>;
}

export const courseAPI: CourseAPI = {
  async createReview(newReview: string) {
    const {
      data: { code },
    } = await axios.post('/courses/review', newReview, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    if (code !== 1000) {
      throw new Error(code);
    }
  },

  async getReviewList(crsNm: string) {
    const {
      data: { code, result },
    } = await axios.get(`/courses/review/${crsNm}`);

    if (code !== 1000) {
      throw new Error(code);
    }

    return result;
  },
};
