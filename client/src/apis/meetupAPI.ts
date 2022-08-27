import { Meetup } from 'types/meetup';
import { joyrideAxios as axios } from './axios';
import { faker } from '@faker-js/faker';
import { BICYCLE_TYPES, LOCATIONS } from 'utils/constants';

interface MeetupAPI {
  getAllMeetups: () => Meetup[];
}

// export const meetupAPI: MeetupAPI = {
//   async getAllMeetups() {},
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
  bicycleTypes: faker.helpers.arrayElements(BICYCLE_TYPES, 3),
  minNumOfParticipants: faker.datatype.number(30),
  maxNumOfParticipants: faker.datatype.number(30),
  participants: Array.from({ length: faker.datatype.number(15) }, () => ({})),
  location: faker.helpers.arrayElement(LOCATIONS),
  gender: faker.helpers.arrayElement(['m', 'f']),
  ages: faker.helpers.arrayElements([1, 2, 3, 4, 5]),
  participationFee: faker.datatype.number(20000),
}));

export const mockMeetupAPI: MeetupAPI = {
  getAllMeetups: () => mockMeetups,
};
