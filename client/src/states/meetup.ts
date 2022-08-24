import { atom } from 'recoil';
import { MeetupFilterState, MeetupOrderName } from 'types/meetup';

export const MEETUP_FILTER_INITIAL_STATE = {
  minNumOfParticipants: { value: 0, content: '0' },
  maxNumOfParticipants: { value: 0, content: '0' },
};

export const meetupFilterBoardState = atom<MeetupFilterState>({
  key: 'meetupFilterBoard',
  default: MEETUP_FILTER_INITIAL_STATE,
});

export const meetupOrderState = atom<MeetupOrderName>({
  key: 'meetupOrder',
  default: '-createdAt',
});
