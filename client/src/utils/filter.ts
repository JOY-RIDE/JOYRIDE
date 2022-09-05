import { FiltersReducerPayload } from 'types/common';
import { MeetupFiltersState } from 'types/meetup';
import { omit } from 'lodash';
import { MEETUP_FILTERS_INITIAL_STATE } from 'states/meetup';

/** - 단일 선택 옵션을 가진 filtersState 형태: { key: {value: 값, content: 한글} }
 * - 다중 선택 옵션을 가진 filtersState 형태: { key: [{value: 값, content: 한글}] }
 */
// TODO: recoil
function meetupFiltersReducerForChoosing(
  state: MeetupFiltersState,
  { key, ...data }: FiltersReducerPayload
) {
  switch (key) {
    // 단일 선택 옵션들
    case 'location':
    case 'pathDifficulty':
    case 'ridingSkill':
    case 'gender':
    case 'minNumOfParticipants':
    case 'maxNumOfParticipants':
    case 'bicycleTypes':
    case 'age':
      return { ...state, [key]: data };

    // 다중 선택 옵션들
    // case 'bicycleTypes':
    // case 'age': {
    //   const oldDataArray = state[key];
    //   return oldDataArray
    //     ? { ...state, [key]: oldDataArray.concat(data) }
    //     : { ...state, [key]: [data] };
    // }

    default:
      throw new Error();
  }
}
function meetupFiltersReducerForRemoving(
  state: MeetupFiltersState,
  { key, value }: FiltersReducerPayload
) {
  switch (key) {
    // 단일 선택 옵션들
    case 'location':
    case 'pathDifficulty':
    case 'ridingSkill':
    case 'gender':
    case 'isParticipationFree':
    case 'bicycleTypes':
    case 'age':
      return omit(state, [key]);

    // 다중 선택 옵션들
    // case 'bicycleTypes':
    // case 'age': {
    //   const oldDataArray = state[key];
    //   return oldDataArray.length > 1
    //     ? {
    //         ...state,
    //         [key]: oldDataArray.filter(
    //           (data: FilterOptionData) => data.value !== value
    //         ),
    //       }
    //     : omit(state, [key]);
    // }

    default:
      throw new Error();
  }
}
function meetupFiltersReducerForToggling(
  state: MeetupFiltersState,
  { key, ...data }: FiltersReducerPayload
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
function meetupFiltersReducerForClearing(
  state: MeetupFiltersState,
  { key }: FiltersReducerPayload
) {
  switch (key) {
    case 'maxNumOfParticipants':
      return { ...state, ...MEETUP_FILTERS_INITIAL_STATE };
    default:
      return omit(state, [key]);
  }
}

export const MEETUP_FILTERS_REDUCERS = {
  choose: meetupFiltersReducerForChoosing,
  remove: meetupFiltersReducerForRemoving,
  toggle: meetupFiltersReducerForToggling,
  clear: meetupFiltersReducerForClearing,
};
