import { Meetup } from 'types/meetup';
import { joyrideAxios as axios } from './axios';
import { faker } from '@faker-js/faker';

interface MeetupAPI {
  getAllMeetups: () => Meetup[];
}

// export const meetupAPI: MeetupAPI = {
//   async getAllMeetups() {},
// };

export const mockMeetupAPI: MeetupAPI = {
  getAllMeetups: () =>
    Array.from({ length: 10 }, (_, index) => ({
      id: index,
      title: faker.lorem.words(),
      image: faker.image.cats(undefined, undefined, true),
      meetingDate: faker.date.future(),
      dueDate: faker.date.soon(10),
      courseLevel: faker.helpers.arrayElement([1, 2, 3]),
      ridingLevels: faker.helpers.arrayElements([1, 2, 3], 2),
      bicycleTypes: faker.helpers.arrayElements(
        ['MTB', '로드 바이크', 'a', 'b', 'c'],
        2
      ),
      currentParticipants: Array.from(
        { length: faker.datatype.number(15) },
        () => ({})
      ),
      maxNumOfParticipants: faker.datatype.number(30),
      courseName: faker.datatype.number(1) ? faker.random.words() : null,
      ridingPath: '서울-인천-경기-강원-충청-전라-경상-제주',
      location: faker.random.word(),
      gender: faker.helpers.arrayElement(['all', 'm', 'f']),
      ages: faker.helpers.arrayElements([1, 2, 3, 4, 5], 2),
      participationFee: faker.datatype.number(20000),
    })),
};
