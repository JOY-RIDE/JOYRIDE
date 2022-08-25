import { atom } from 'recoil';
import { MeetupFiltersState, MeetupOrderName } from 'types/meetup';

export const MEETUP_FILTERS_INITIAL_STATE = {
  minNumOfParticipants: { value: 0, content: '0' },
  maxNumOfParticipants: { value: 0, content: '0' },
};

export const meetupFiltersState = atom<MeetupFiltersState>({
  key: 'meetupFilters',
  default: MEETUP_FILTERS_INITIAL_STATE,
});
export const meetupBoardFiltersState = atom<MeetupFiltersState>({
  key: 'meetupFilterBoard',
  default: MEETUP_FILTERS_INITIAL_STATE,
});

export const meetupOrderState = atom<MeetupOrderName>({
  key: 'meetupOrder',
  default: '-createdAt',
});
