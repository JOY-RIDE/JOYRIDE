import { atom } from 'recoil';
import { MeetupFilterState, MeetupOrderName } from 'types/meetup';

export const meetupFilterBoardState = atom<MeetupFilterState>({
  key: 'meetupFilterBoard',
  default: {
    minNumOfParticipants: { value: 0, content: '0' },
    maxNumOfParticipants: { value: 0, content: '0' },
  },
});

export const meetupOrderState = atom<MeetupOrderName>({
  key: 'meetupOrder',
  default: '-createdAt',
});
