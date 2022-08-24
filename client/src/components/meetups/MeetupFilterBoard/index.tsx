import CheckBox from 'components/common/CheckBox';
import styles from './MeetupFilterBoard.module.scss';
import classNames from 'classnames/bind';
import {
  AGES,
  BICYCLE_TYPES,
  GENDERS,
  LOCATIONS,
  MEETUP_PATH_DIFFICULTIES,
  RIDING_SKILLS,
} from 'utils/constants';
import OptionChip from 'components/common/OptionChip';
import { omit } from 'lodash';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  stringifyAge,
  stringifyDifficulty,
  stringifyGender,
  stringifyRidingSkill,
} from 'utils/stringify';
import { useCallback, useEffect } from 'react';
import { FilterOptionData, FiltersDispatchPayload } from 'types/common';
import {
  meetupBoardFiltersState,
  meetupFiltersState,
  MEETUP_FILTERS_INITIAL_STATE,
} from 'states/meetup';
import { ChangeHandler, ClickHandler, SubmitHandler } from 'types/callback';
import PlusMinusButton from 'components/common/PlusMinusButton';
import { MeetupFiltersState } from 'types/meetup';
import useFilterBoard from 'hooks/useFilterBoard';
import { toastMessageState } from 'states/common';
import MeetupFilterChoices from '../MeetupFilterChoices';

const cn = classNames.bind(styles);

interface MeetupFilterBoardProp {
  closeBoard: () => void;
}

// Functions

/** - 단일 선택 옵션을 가진 filtersState 형태: { key: {value: 값, content: 한글} }
 * - 다중 선택 옵션을 가진 filtersState 형태: { key: [{value: 값, content: 한글}] }
 */

// TODO: recoil
function filtersDispatchForChoosing(
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
function filtersDispatchForRemoving(
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
function filtersDispatchForToggling(
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
function filtersDispatchForClearing(
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
  choose: filtersDispatchForChoosing,
  remove: filtersDispatchForRemoving,
  toggle: filtersDispatchForToggling,
  clear: filtersDispatchForClearing,
};

const IS_PARTICIPATION_FREE_PAYLOAD: FiltersDispatchPayload = {
  key: 'isParticipationFree',
  value: true,
  content: '참가비 없는 모임만',
};

const MeetupFilterBoard = ({ closeBoard }: MeetupFilterBoardProp) => {
  const boardFilters = useRecoilValue(meetupBoardFiltersState);
  const {
    chooseOption,
    removeOption,
    toggleOption,
    clearOptions,
    resetFilterBoard,
  } = useFilterBoard(meetupBoardFiltersState, MEETUP_FILTERS_DISPATCHES);

  useEffect(() => resetFilterBoard, []);
  useEffect(() => {
    const min = boardFilters.minNumOfParticipants.value;
    if (boardFilters.maxNumOfParticipants.value < min) {
      chooseOption({
        key: 'maxNumOfParticipants',
        value: min,
        content: `${min}`,
      });
    }
  }, [boardFilters.minNumOfParticipants.value]);

  const toggleSpecificOption = useCallback(
    (payload: FiltersDispatchPayload) => () => toggleOption(payload),
    []
  );

  const handleNumOfParticipantsDecrease: ClickHandler<
    HTMLButtonElement
  > = e => {
    if (!(e.currentTarget instanceof HTMLButtonElement)) return;
    const { name: key } = e.currentTarget;
    if (key !== 'minNumOfParticipants' && key !== 'maxNumOfParticipants')
      return;

    const oldValue = boardFilters[key].value;
    if (!oldValue) return;
    chooseOption({
      key,
      value: oldValue - 1,
      content: `${oldValue - 1}`,
    });
  };

  const handleNumOfParticipantsIncrease: ClickHandler<
    HTMLButtonElement
  > = e => {
    if (!(e.currentTarget instanceof HTMLButtonElement)) return;
    const { name: key } = e.currentTarget;
    if (key !== 'minNumOfParticipants' && key !== 'maxNumOfParticipants')
      return;

    const oldValue = boardFilters[key].value;
    if (oldValue === 99) return;
    chooseOption({
      key,
      value: oldValue + 1,
      content: `${oldValue + 1}`,
    });
  };

  // TODO: max 제출 시 에러 처리
  const handleNumOfParticipantsChange: ChangeHandler = e => {
    const { name: key, value, max } = e.target;
    if (key !== 'minNumOfParticipants' && key !== 'maxNumOfParticipants') {
      return;
    }
    const input = Number(value);
    if (Number(max) < input) return;

    e.target.value = '';
    chooseOption({
      key,
      value: input,
      content: `${input}`,
    });
  };

  const showToastMessage = useSetRecoilState(toastMessageState);
  const setFilters = useSetRecoilState(meetupFiltersState);
  const handleSubmit: SubmitHandler = e => {
    e.preventDefault();
    if (
      boardFilters.minNumOfParticipants.value >
      boardFilters.maxNumOfParticipants.value
    ) {
      showToastMessage('인원을 다시 확인해 주세요');
      return;
    }
    setFilters(boardFilters);
    closeBoard();
  };

  return (
    <form className={cn('board')} onSubmit={handleSubmit}>
      <div className={cn('filters')}>
        <div className={cn('filter')}>
          <label className={cn('label')}>지역</label>
          <ul className={cn('options')}>
            <OptionChip
              type="all"
              filtersKey="location"
              value="all"
              content="전체"
              isChosen={!boardFilters.location}
              onTextClick={clearOptions}
            />
            {LOCATIONS.map(location => (
              <OptionChip
                key={location}
                type="normal"
                filtersKey="location"
                value={location}
                content={location}
                isChosen={location === boardFilters.location?.value}
                onTextClick={chooseOption}
                onXClick={removeOption}
              />
            ))}
          </ul>
        </div>

        <div className={cn('filter')}>
          <label className={cn('label')}>코스 난이도</label>
          <ul className={cn('options')}>
            <OptionChip
              type="all"
              filtersKey="pathDifficulty"
              value="all"
              content="전체"
              isChosen={!boardFilters.pathDifficulty}
              onTextClick={clearOptions}
            />
            {MEETUP_PATH_DIFFICULTIES.map(difficulty => (
              <OptionChip
                key={difficulty}
                type="normal"
                filtersKey="pathDifficulty"
                value={difficulty}
                content={stringifyDifficulty(difficulty)}
                isChosen={difficulty === boardFilters.pathDifficulty?.value}
                onTextClick={chooseOption}
                onXClick={removeOption}
              />
            ))}
          </ul>
        </div>

        <div className={cn('filter')}>
          <label className={cn('label')}>자전거 종류</label>
          <ul className={cn('options')}>
            <OptionChip
              type="all"
              filtersKey="bicycleTypes"
              value="all"
              content="전체"
              isChosen={!boardFilters.bicycleTypes}
              onTextClick={clearOptions}
            />
            {BICYCLE_TYPES.map(type => (
              <OptionChip
                key={type.toString()}
                type="normal"
                filtersKey="bicycleTypes"
                value={type}
                content={type}
                isChosen={
                  boardFilters.bicycleTypes &&
                  boardFilters.bicycleTypes.some(
                    (data: FilterOptionData) => data.value === type
                  )
                }
                onTextClick={chooseOption}
                onXClick={removeOption}
              />
            ))}
          </ul>
        </div>

        <div className={cn('filter')}>
          <label className={cn('label')}>최소 라이딩 실력</label>
          <ul className={cn('options')}>
            <OptionChip
              type="all"
              filtersKey="minRidingSkill"
              value="all"
              content="전체"
              isChosen={!boardFilters.minRidingSkill}
              onTextClick={clearOptions}
            />
            {RIDING_SKILLS.map(skill => (
              <OptionChip
                key={skill}
                type="normal"
                filtersKey="minRidingSkill"
                value={skill}
                content={stringifyRidingSkill(skill)}
                isChosen={skill === boardFilters.minRidingSkill?.value}
                onTextClick={chooseOption}
                onXClick={removeOption}
              />
            ))}
          </ul>
        </div>

        <div className={cn('filter')}>
          <label className={cn('label')}>성별</label>
          <ul className={cn('options')}>
            <OptionChip
              type="all"
              filtersKey="gender"
              value="all"
              content="전체"
              isChosen={!boardFilters.gender}
              onTextClick={clearOptions}
            />
            {GENDERS.map(gender => (
              <OptionChip
                key={gender}
                type="normal"
                filtersKey="gender"
                value={gender}
                content={stringifyGender(gender)}
                isChosen={gender === boardFilters.gender?.value}
                onTextClick={chooseOption}
                onXClick={removeOption}
              />
            ))}
          </ul>
        </div>

        <div className={cn('filter')}>
          <label className={cn('label')}>연령대</label>
          <ul className={cn('options')}>
            <OptionChip
              type="all"
              filtersKey="age"
              value="all"
              content="전체"
              isChosen={!boardFilters.age}
              onTextClick={clearOptions}
            />
            {AGES.map(age => (
              <OptionChip
                key={age}
                type="normal"
                filtersKey="age"
                value={age}
                content={stringifyAge(age)}
                isChosen={
                  boardFilters.age &&
                  boardFilters.age.some(
                    (data: FilterOptionData) => data.value === age
                  )
                }
                onTextClick={chooseOption}
                onXClick={removeOption}
              />
            ))}
          </ul>
        </div>

        <div className={cn('filter', 'participants')}>
          <label className={cn('label')}>인원</label>
          {/* // Range? */}
          <div className={cn('option')}>
            <OptionChip
              type="all"
              filtersKey="maxNumOfParticipants"
              value={0}
              content="전체"
              isChosen={
                !(
                  boardFilters.minNumOfParticipants.value ||
                  boardFilters.maxNumOfParticipants.value
                )
              }
              onTextClick={clearOptions}
            />
            <div className={cn('regulators')}>
              <div className={cn('regulator')}>
                <PlusMinusButton
                  name="minNumOfParticipants"
                  action="decrease"
                  onDecrease={handleNumOfParticipantsDecrease}
                />
                <input
                  type="number"
                  name="minNumOfParticipants"
                  min={0}
                  max={99}
                  value={boardFilters.minNumOfParticipants.value}
                  onChange={handleNumOfParticipantsChange}
                  className={cn('number')}
                />
                <PlusMinusButton
                  name="minNumOfParticipants"
                  action="increase"
                  onIncrease={handleNumOfParticipantsIncrease}
                />
                <span>명</span>
              </div>

              <span className={cn('tilde')}>~</span>

              <div className={cn('regulator')}>
                <PlusMinusButton
                  name="maxNumOfParticipants"
                  action="decrease"
                  onDecrease={handleNumOfParticipantsDecrease}
                />
                <input
                  type="number"
                  name="maxNumOfParticipants"
                  min={0}
                  max={99}
                  value={boardFilters.maxNumOfParticipants.value}
                  onChange={handleNumOfParticipantsChange}
                  className={cn('number')}
                />
                <PlusMinusButton
                  name="maxNumOfParticipants"
                  action="increase"
                  onIncrease={handleNumOfParticipantsIncrease}
                />
                <span>명</span>
              </div>
            </div>
          </div>
        </div>

        <div className={cn('filter', 'participation-fee-container')}>
          <label className={cn('label')}>참가비 여부</label>
          <div className={cn('option')}>
            <CheckBox
              id={cn('participation-fee')}
              shape="square"
              isChecked={Boolean(boardFilters.isParticipationFree)}
              onChange={toggleSpecificOption(IS_PARTICIPATION_FREE_PAYLOAD)}
            />
            <label htmlFor={cn('participation-fee')}>
              참가비 없는 모임만 보기
            </label>
          </div>
        </div>
      </div>

      <div className={cn('choices-container')}>
        <MeetupFilterChoices onBoard />
      </div>

      <div className={cn('btns')}>
        <button
          type="button"
          className={cn('btn', 'reset-btn')}
          onClick={resetFilterBoard}
        >
          초기화
        </button>
        <button className={cn('btn', 'submit-btn')}>확인</button>
      </div>
    </form>
  );
};

export default MeetupFilterBoard;
