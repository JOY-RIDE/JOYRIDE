import { FilterOptionData, FiltersDispatchPayload } from 'types/common';
import { MeetupFiltersState } from 'types/meetup';
import { omit } from 'lodash';
import { MEETUP_FILTERS_INITIAL_STATE } from 'states/meetup';

/** - 단일 선택 옵션을 가진 filtersState 형태: { key: {value: 값, content: 한글} }
 * - 다중 선택 옵션을 가진 filtersState 형태: { key: [{value: 값, content: 한글}] }
 */
// TODO: recoil
function meetupFiltersDispatchForChoosing(
  state: MeetupFiltersState,
  { key, ...data }: FiltersDispatchPayload
) {
  switch (key) {
    // 단일 선택 옵션들
    case 'location':
    case 'pathDifficulty':
    case 'minRidingSkill':
    case 'gender':
    case 'minNumOfParticipants':
    case 'maxNumOfParticipants':
      return { ...state, [key]: data };

    // 다중 선택 옵션들
    case 'bicycleTypes':
    case 'age': {
      const oldDataArray = state[key];
      return oldDataArray
        ? { ...state, [key]: oldDataArray.concat(data) }
        : { ...state, [key]: [data] };
    }

    default:
      throw new Error();
  }
}
function meetupFiltersDispatchForRemoving(
  state: MeetupFiltersState,
  { key, value }: FiltersDispatchPayload
) {
  switch (key) {
    // 단일 선택 옵션들
    case 'location':
    case 'pathDifficulty':
    case 'minRidingSkill':
    case 'gender':
    case 'isParticipationFree':
      return omit(state, [key]);

    // 다중 선택 옵션들
    case 'bicycleTypes':
    case 'age': {
      const oldDataArray = state[key];
      return oldDataArray.length > 1
        ? {
            ...state,
            [key]: oldDataArray.filter(
              (data: FilterOptionData) => data.value !== value
            ),
          }
        : omit(state, [key]);
    }

    default:
      throw new Error();
  }
}
function meetupFiltersDispatchForToggling(
  state: MeetupFiltersState,
  { key, ...data }: FiltersDispatchPayload
) {
  switch (key) {
    case 'isParticipationFree': {
      const oldData = state[key];
      return oldData ? omit(state, [key]) : { ...state, [key]: data };
    }

    default:
      throw new Error();
  }
}
function meetupFiltersDispatchForClearing(
  state: MeetupFiltersState,
  { key }: FiltersDispatchPayload
) {
  switch (key) {
    case 'maxNumOfParticipants':
      return { ...state, ...MEETUP_FILTERS_INITIAL_STATE };
    default:
      return omit(state, [key]);
  }
}

export const MEETUP_FILTERS_DISPATCHES = {
  choose: meetupFiltersDispatchForChoosing,
  remove: meetupFiltersDispatchForRemoving,
  toggle: meetupFiltersDispatchForToggling,
  clear: meetupFiltersDispatchForClearing,
};
