import { joyrideAxios as axios } from './axios';
import { faker } from '@faker-js/faker';

interface Meetup {
  title: string;
  image: string;
  meetingDate: Date;
  dueDate: Date;
  courseLevel: number;
  ridingLevel: number[]; // TODO
  bicycleType: string[];
  numberOfParticipants: number; // TODO
  maxNumberOfParticipants: number;
  courseName: null | string;
  path: string;
  location: string;
  gender: string;
  age: number[];
  participationFee: number;
}
interface MeetupAPI {
  getAllMeetups: () => Meetup[];
}

// export const meetupAPI: MeetupAPI = {
//   async getAllMeetups() {},
// };

export const mockMeetupAPI: MeetupAPI = {
  getAllMeetups: () =>
    Array(10).map(() => ({
      title: faker.lorem.words(),
      image: faker.image.animals(undefined, undefined, true),
      meetingDate: faker.date.future(),
      dueDate: faker.date.soon(),
      courseLevel: faker.helpers.arrayElement([1, 2, 3]),
      ridingLevel: faker.helpers.arrayElements([1, 2, 3], 2),
      bicycleType: faker.helpers.arrayElements(
        ['MTB', '로드 바이크', 'a', 'b', 'c'],
        2
      ),
      numberOfParticipants: faker.datatype.number(15),
      maxNumberOfParticipants: faker.datatype.number(30),
      courseName: faker.datatype.number(1) ? faker.random.words() : null,
      path: '서울-인천-경기-강원-충청-전라-경상-제주',
      location: faker.random.word(),
      gender: faker.helpers.arrayElement(['all', 'm', 'f']),
      age: faker.helpers.arrayElements([1, 2, 3, 4, 5], 2),
      participationFee: faker.datatype.number(20000),
    })),
};
