import { atom } from 'recoil';
import { MeetupFilterOption, MeetupOrderOption } from './../types/meetup';

export const meetupFilterState = atom<null | MeetupFilterOption[]>({
  key: 'meetupFilter',
  default: null,
});
export const meetupOrderState = atom<MeetupOrderOption>({
  key: 'meetupOrder',
  default: '-createdAt',
});

// const meetups = mockMeetupAPI.getAllMeetups();

// export const meetupsState = selector<Meetup[]>({
//   key: 'meetups',
//   get: async ({ get }) => {
//     const selectedFilters = get(selectedMeetupFiltersState);
//     if (!selectedFilters) return meetups; // 초기화
//     const pathDifficultyFilter = selectedFilters.find(
//       filter => filter.name === 'pathDifficulty'
//     );
//     if (!pathDifficultyFilter) return meetups; // 다른 필터 선택 시
//     return meetups.filter(
//       meetup => meetup.pathDifficulty === pathDifficultyFilter.payload
//     );
//   },
// });
