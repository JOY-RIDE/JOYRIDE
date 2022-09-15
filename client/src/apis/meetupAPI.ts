import {
  MeetupData,
  MeetupDetail,
  MeetupFiltersState,
} from './../types/meetup';
// import { MEETUP_DEFAULT_IMAGE } from 'utils/urls';
import { joyrideAxios as axios } from './axios';
// import { faker } from '@faker-js/faker';
// import { GENDERS, LOCATIONS } from 'utils/constants';
import { mapValues } from 'lodash';
import QueryString from 'qs';

interface MeetupAPI {
  getMeetupList: (filters?: MeetupFiltersState) => Promise<MeetupData[]>;
  getMyMeetupList: () => Promise<MeetupData[]>;
  getJoinedMeetupList: () => Promise<MeetupData[]>;
  getBookmarkedMeetupList: () => Promise<MeetupData[]>;

  getMeetupDetail: (meetupId: number) => Promise<MeetupDetail>;
  getIsMeetupBookmarked: (meetupId: number) => Promise<any>;

  createMeetup: (newMeetup: FormData) => Promise<void>;
  joinMeetup: (meetupId: number) => Promise<void>;
  toggleMeetupBookmark: (meetupId: number) => Promise<void>;

  closeMeetup: (meetupId: number) => Promise<void>;
  exitMeetup: (meetupId: number) => Promise<void>;
}

export const meetupAPI: MeetupAPI = {
  async getMeetupList(filters = {}) {
    const filtersWithValueOnly = mapValues(filters, 'value');
    if (!filtersWithValueOnly['minNumOfParticipants'])
      delete filtersWithValueOnly['minNumOfParticipants'];
    if (!filtersWithValueOnly['maxNumOfParticipants'])
      delete filtersWithValueOnly['maxNumOfParticipants'];
    const query = QueryString.stringify(filtersWithValueOnly, {
      encode: false,
    });

    const {
      data: { code, result },
    } = await axios.get('/meets' + (query && '?' + query));

    if (code !== 1000) {
      throw new Error(code);
    }
    return result;
  },

  async getMyMeetupList() {
    const {
      data: { code, result },
    } = await axios.get('/meets/host');

    if (code !== 1000) {
      throw new Error(code);
    }
    return result;
  },

  async getJoinedMeetupList() {
    const {
      data: { code, result },
    } = await axios.get('/meets/join');

    if (code !== 1000) {
      throw new Error(code);
    }
    return result;
  },

  async getBookmarkedMeetupList() {
    const {
      data: { code, result },
    } = await axios.get('/meets/bookmark');

    if (code !== 1000) {
      throw new Error(code);
    }
    return result;
  },

  async getMeetupDetail(meetupId) {
    const {
      data: { code, result },
    } = await axios.get('/meets/detail/' + meetupId);

    if (code !== 1000) {
      throw new Error(code);
    }
    return result;
  },

  async getIsMeetupBookmarked(meetupId) {
    const {
      data: { code, result },
    } = await axios.get('/meets/bookmark/' + meetupId);

    console.log(code, result);
    if (code !== 1000) {
      throw new Error(code);
    }
    return result;
  },

  async createMeetup(newMeetup) {
    const {
      data: { code },
    } = await axios.post('/meets', newMeetup, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (code !== 1000) {
      throw new Error(code);
    }
  },

  async joinMeetup(meetupId) {
    const {
      data: { code },
    } = await axios.post('/meets/' + meetupId);

    if (code !== 1000) {
      throw new Error(code);
    }
  },

  // TODO
  async toggleMeetupBookmark(meetupId) {
    const {
      data: { code, result },
    } = await axios.post('/meets/bookmark/' + meetupId);
    console.log(code, result);

    if (code !== 1000) {
      throw new Error(code);
    }
  },

  async closeMeetup(meetupId) {
    const {
      data: { code },
    } = await axios.patch('/meets/' + meetupId);

    if (code !== 1000) {
      throw new Error(code);
    }
  },

  async exitMeetup(meetupId) {
    const {
      data: { code },
    } = await axios.delete('/meets/join/' + meetupId);

    if (code !== 1000) {
      throw new Error(code);
    }
  },
};

// Mock
// const mockMeetups: Meetup[] = Array.from({ length: 10 }, (_, index) => ({
//   id: index,
//   title: faker.lorem.sentence(),
//   image: faker.datatype.number(1)
//     ? MEETUP_DEFAULT_IMAGE
//     : faker.image.cats(undefined, undefined, true),
//   meetingDate: faker.date.future(),
//   dueDate: faker.date.soon(10),
//   gatheringPlace: '목동 스타벅스',
//   courseName: faker.datatype.number(1) ? faker.random.words(3) : null,
//   path: faker.helpers.arrayElements(LOCATIONS),
//   pathDifficulty: faker.helpers.arrayElement([1, 2, 3]),
//   ridingSkill: faker.helpers.arrayElement([1, 2, 3]),
//   bicycleTypes: faker.helpers.arrayElements(
//     ['따릉이', 'MTB', '로드바이크', '하이브리드', '미니벨로', '기타'],
//     3
//   ),
//   maxNumOfParticipants: faker.datatype.number(30),
//   participants: Array.from(
//     { length: faker.datatype.number({ min: 1, max: 15 }) },
//     () => ({})
//   ),
//   location: faker.helpers.arrayElement(LOCATIONS),
//   gender: faker.helpers.arrayElement(['mixed', ...GENDERS]),
//   minBirthYear: 1990,
//   maxBirthYear: 2000,
//   participationFee: faker.datatype.number({ min: 5000, max: 20000 }),
//   content: faker.lorem.sentences(10),
// }));
//
// @ts-ignore
// export const mockMeetupAPI: MeetupAPI = {
//   getMeetupList: () => mockMeetups,
// };
