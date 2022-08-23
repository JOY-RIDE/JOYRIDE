import { atom } from 'recoil';
import { MeetupFilterState, MeetupOrderOptionName } from 'types/meetup';

export const meetupFilterState = atom<MeetupFilterState>({
  key: 'meetupFilter',
  default: { gender: { value: 'all', content: '전체' } },
});
export const meetupOrderState = atom<MeetupOrderOptionName>({
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
