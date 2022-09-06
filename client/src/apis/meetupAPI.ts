import { Meetup } from 'types/meetup';
import { joyrideAxios as axios } from './axios';
import { faker } from '@faker-js/faker';
import { GENDERS, LOCATIONS } from 'utils/constants';

interface MeetupAPI {
  getMeetupList: () => Meetup[];
}

// export const meetupAPI: MeetupAPI = {
//   async getMeetupList() {},
// };

// Mock
const mockMeetups: Meetup[] = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  title: faker.lorem.sentence(),
  image: faker.image.cats(undefined, undefined, true),
  meetingDate: faker.date.future(),
  dueDate: faker.date.soon(10),
  courseName: faker.datatype.number(1) ? faker.random.words(3) : null,
  path: faker.helpers.arrayElements(LOCATIONS),
  pathDifficulty: faker.helpers.arrayElement([1, 2, 3]),
  ridingSkill: faker.helpers.arrayElement([1, 2, 3]),
  bicycleTypes: faker.helpers.arrayElements(
    ['따릉이', 'MTB', '로드바이크', '하이브리드', '미니벨로', '기타'],
    3
  ),
  maxNumOfParticipants: faker.datatype.number(30),
  participants: Array.from(
    { length: faker.datatype.number({ min: 1, max: 15 }) },
    () => ({})
  ),
  location: faker.helpers.arrayElement(LOCATIONS),
  gender: faker.helpers.arrayElement(['mixed', ...GENDERS]),
  minBirthYear: 1990,
  maxBirthYear: 2000,
  participationFee: faker.datatype.number(20000),
  content: faker.lorem.sentences(10),
}));

export const mockMeetupAPI: MeetupAPI = {
  getMeetupList: () => mockMeetups,
};
