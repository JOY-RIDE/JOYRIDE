import { atom } from 'recoil';
import { MeetupFiltersState, MeetupOrderName } from "types/meetup';

export const meetupFiltersState = atom<MeetupFiltersState>({
  key: 'meetupFilters',
  default: {
    minNumOfParticipants: { value: 0, content: '0' },
    maxNumOfParticipants: { value: 0, content: '0' },
  },
});

export const meetupOrderState = atom<MeetupOrderName>({
  key: 'meetupOrder',
  default: '-createdAt',
});
