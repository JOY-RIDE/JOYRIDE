import { atom } from 'recoil';
import { MeetupFiltersState, MeetupOrderState } from 'types/meetup';

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

export const meetupOrderState = atom<MeetupOrderState>({
  key: 'meetupOrder',
  default: { name: '-createdAt', content: '최근 등록순' },
});
