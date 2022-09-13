import { joyrideAxios as axios } from './axios';

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
