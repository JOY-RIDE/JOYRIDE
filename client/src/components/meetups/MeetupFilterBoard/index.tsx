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
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  stringifyAge,
  stringifyDifficulty,
  stringifyGender,
  stringifyRidingSkill,
} from 'utils/stringify';
import { useCallback, useEffect } from 'react';
import { FilterClickHandler, FiltersDispatchPayload } from 'types/common';
import {
  meetupFilterBoardState,
  MEETUP_FILTER_INITIAL_STATE,
} from 'states/meetup';
import { MeetupFilterState } from 'types/meetup';
import { ChangeHandler, ClickHandler } from 'types/callback';
import PlusMinusButton from '../PlusMinusButton';

const cn = classNames.bind(styles);

interface FilterOptionData {
  value: number | string | boolean;
  content: string;
}

// Functions

/** - 단일 선택 옵션을 가진 filtersState 형태: { key: {value: 값, content: 한글} }
 * - 다중 선택 옵션을 가진 filtersState 형태: { key: [{value: 값, content: 한글}] }
 */

// TODO: recoil
function filtersDispatchForChoosing(
  state: MeetupFilterState,
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
  state: MeetupFilterState,
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
  state: MeetupFilterState,
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
  state: MeetupFilterState,
  { key }: FiltersDispatchPayload
) {
  switch (key) {
    case 'maxNumOfParticipants':
      return { ...state, ...MEETUP_FILTER_INITIAL_STATE };
    default:
      return omit(state, [key]);
  }
}

const IS_PARTICIPATION_FREE_PAYLOAD: FiltersDispatchPayload = {
  key: 'isParticipationFree',
  value: true,
  content: '참가비 없는 모임만',
};

const MeetupFilterBoard = () => {
  const [filters, setFilters] = useRecoilState(meetupFilterBoardState);
  const resetFilters = useResetRecoilState(meetupFilterBoardState);
  console.log(filters);

  useEffect(() => {
    return resetFilters;
  }, []);

  useEffect(() => {
    const min = filters.minNumOfParticipants.value;
    if (filters.maxNumOfParticipants.value < min) {
      chooseOption({
        key: 'maxNumOfParticipants',
        value: min,
        content: `${min}`,
      });
    }
  }, [filters.minNumOfParticipants.value]);

  const chooseOption: FilterClickHandler = useCallback(
    payload =>
      setFilters(filters => filtersDispatchForChoosing(filters, payload)),
    []
  );
  const removeOption: FilterClickHandler = useCallback(
    payload =>
      setFilters(filters => filtersDispatchForRemoving(filters, payload)),
    []
  );
  const toggleOption: FilterClickHandler = payload =>
    setFilters(filters => filtersDispatchForToggling(filters, payload));
  const clearOptions: FilterClickHandler = useCallback(
    payload =>
      setFilters(filters => filtersDispatchForClearing(filters, payload)),
    []
  );

  const handleCheckBoxClick = useCallback(
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

    const oldValue = filters[key].value;
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

    const oldValue = filters[key].value;
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

  return (
    <form className={cn('board')}>
      <div className={cn('filters')}>
        <div className={cn('filter')}>
          <label className={cn('label')}>지역</label>
          <ul className={cn('options')}>
            <OptionChip
              type="all"
              filtersKey="location"
              value="all"
              content="전체"
              isChosen={!filters.location}
              onTextClick={clearOptions}
            />
            {LOCATIONS.map(location => (
              <OptionChip
                key={location}
                type="normal"
                filtersKey="location"
                value={location}
                content={location}
                isChosen={location === filters.location?.value}
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
              isChosen={!filters.pathDifficulty}
              onTextClick={clearOptions}
            />
            {MEETUP_PATH_DIFFICULTIES.map(difficulty => (
              <OptionChip
                key={difficulty}
                type="normal"
                filtersKey="pathDifficulty"
                value={difficulty}
                content={stringifyDifficulty(difficulty)}
                isChosen={difficulty === filters.pathDifficulty?.value}
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
              isChosen={!filters.bicycleTypes}
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
                  filters.bicycleTypes &&
                  filters.bicycleTypes.some(
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
              isChosen={!filters.minRidingSkill}
              onTextClick={clearOptions}
            />
            {RIDING_SKILLS.map(skill => (
              <OptionChip
                key={skill}
                type="normal"
                filtersKey="minRidingSkill"
                value={skill}
                content={stringifyRidingSkill(skill)}
                isChosen={skill === filters.minRidingSkill?.value}
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
              isChosen={!filters.gender}
              onTextClick={clearOptions}
            />
            {GENDERS.map(gender => (
              <OptionChip
                key={gender}
                type="normal"
                filtersKey="gender"
                value={gender}
                content={stringifyGender(gender)}
                isChosen={gender === filters.gender?.value}
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
              isChosen={!filters.age}
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
                  filters.age &&
                  filters.age.some(
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
                  filters.minNumOfParticipants.value ||
                  filters.maxNumOfParticipants.value
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
                  value={filters.minNumOfParticipants.value}
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
                  value={filters.maxNumOfParticipants.value}
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
              isChecked={Boolean(filters.isParticipationFree)}
              onChange={handleCheckBoxClick(IS_PARTICIPATION_FREE_PAYLOAD)}
            />
            <label htmlFor={cn('participation-fee')}>
              참가비 없는 모임만 보기
            </label>
          </div>
        </div>
      </div>

      <div className={cn('choices-container')}>
        <ul className={cn('choices')}>
          {filters.location && (
            <OptionChip
              type="removeOnly"
              filtersKey="location"
              value={filters.location.value}
              content={filters.location.content}
              isChosen
              onXClick={removeOption}
            />
          )}
          {filters.pathDifficulty && (
            <OptionChip
              type="removeOnly"
              filtersKey="pathDifficulty"
              value={filters.pathDifficulty.value}
              content={filters.pathDifficulty.content}
              isChosen
              onXClick={removeOption}
            />
          )}
          {filters.bicycleTypes &&
            filters.bicycleTypes.map(({ value, content }: FilterOptionData) => (
              <OptionChip
                key={`${value}`}
                type="removeOnly"
                filtersKey="bicycleTypes"
                value={value}
                content={content}
                isChosen
                onXClick={removeOption}
              />
            ))}
          {filters.minRidingSkill && (
            <OptionChip
              type="removeOnly"
              filtersKey="minRidingSkill"
              value={filters.minRidingSkill.value}
              content={filters.minRidingSkill.content}
              isChosen
              onXClick={removeOption}
            />
          )}
          {filters.gender && (
            <OptionChip
              type="removeOnly"
              filtersKey="gender"
              value={filters.gender.value}
              content={filters.gender.content}
              isChosen
              onXClick={removeOption}
            />
          )}
          {filters.age &&
            filters.age.map(({ value, content }: FilterOptionData) => (
              <OptionChip
                key={`${value}`}
                type="removeOnly"
                filtersKey="age"
                value={value}
                content={content}
                isChosen
                onXClick={removeOption}
              />
            ))}
          {Boolean(
            filters.minNumOfParticipants.value ||
              filters.maxNumOfParticipants.value
          ) && (
            <OptionChip
              type="removeOnly"
              filtersKey="maxNumOfParticipants"
              value={filters.maxNumOfParticipants.value}
              content="인원 설정"
              isChosen
              onXClick={clearOptions}
            />
          )}
          {filters.isParticipationFree && (
            <OptionChip
              type="removeOnly"
              filtersKey="isParticipationFree"
              value={filters.isParticipationFree.value}
              content={filters.isParticipationFree.content}
              isChosen
              onXClick={removeOption}
            />
          )}
        </ul>
      </div>

      <div className={cn('btns')}>
        <button
          type="button"
          className={cn('btn', 'reset-btn')}
          onClick={resetFilters}
        >
          초기화
        </button>
        <button className={cn('btn', 'submit-btn')}>확인</button>
      </div>
    </form>
  );
};

export default MeetupFilterBoard;
