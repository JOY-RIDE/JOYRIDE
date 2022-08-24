import useToggle from 'hooks/useToggle';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import CheckBox from 'components/common/CheckBox';
import styles from './MeetupFilter.module.scss';
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
import { useCallback } from 'react';
import { MeetupFiltersState } from 'types/meetup';
import { FilterClickHandler, FiltersDispatchPayload } from 'types/common';
import { meetupFiltersState } from 'states/meetup';

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
  state: MeetupFiltersState,
  { key, ...data }: FiltersDispatchPayload
) {
  switch (key) {
    // 단일 선택 옵션들
    case 'location':
    case 'pathDifficulty':
    case 'minRidingSkill':
    case 'gender':
      // case 'minNumOfParticipants':
      // case 'maxNumOfParticipants':
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
    // case 'minNumOfParticipants':
    // case 'maxNumOfParticipants':
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
  return omit(state, [key]);
}

const IS_PARTICIPATION_FREE_PAYLOAD: FiltersDispatchPayload = {
  key: 'isParticipationFree',
  value: true,
  content: '참가비 없는 모임만',
};

const MeetupFilter = () => {
  const { isOpen, toggle, ref } = useToggle();
  const [filters, setFilters] = useRecoilState(meetupFiltersState);
  const resetFilters = useResetRecoilState(meetupFiltersState);
  console.log(filters);

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

  // const handleMaxNumOfParticipantsChange = (e: any) => {
  //   const value = Number(e.target.value);
  //   if (!value) {
  //     filter.minNumOfParticipants &&
  //       clearOption({ name: 'minNumOfParticipants', value });
  //     clearOption({ name: 'maxNumOfParticipants', value });
  //     return;
  //   }

  //   if (filter.minNumOfParticipants?.value >= value) {
  //     chooseOption({
  //       name: 'maxNumOfParticipants',
  //       value,
  //       content: String(value),
  //     });
  //   }
  // };

  const handleParticipationFeeToggle = useCallback(
    () => toggleOption(IS_PARTICIPATION_FREE_PAYLOAD),
    []
  );

  return (
    <div className={cn('boundary')} ref={ref}>
      <button className={cn('toggle-btn')} onClick={toggle}>
        <span>필터</span>
        {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>

      <form className={cn('filters', { hidden: !isOpen })}>
        <div className={cn('options-container')}>
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

          <div className={cn('filter')}>
            <label className={cn('label')}>인원</label>
            {/* <div className={cn('option')}>
              <OptionChip
                name="maxNumOfParticipants"
                value={0}
                content="전체"
                isChosen={!filter.maxNumOfParticipants.value}
                onTextClick={clearOption}
              />
              <div className={cn('regulator')}></div>
            </div> */}
          </div>

          <div className={cn('filter', 'participation-fee-container')}>
            <label className={cn('label')}>참가비 여부</label>
            <div className={cn('option')}>
              <CheckBox
                id={cn('participation-fee')}
                shape="square"
                isChecked={Boolean(filters.isParticipationFree)}
                onChange={handleParticipationFeeToggle}
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
              filters.bicycleTypes.map(
                ({ value, content }: FilterOptionData) => (
                  <OptionChip
                    key={String(value)}
                    type="removeOnly"
                    filtersKey="bicycleTypes"
                    value={value}
                    content={content}
                    isChosen
                    onXClick={removeOption}
                  />
                )
              )}
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
                  key={String(value)}
                  type="removeOnly"
                  filtersKey="age"
                  value={value}
                  content={content}
                  isChosen
                  onXClick={removeOption}
                />
              ))}
            {/* {filters.maxNumOfParticipants.value > 0 && (
              <OptionChip
                name="maxNumOfParticipants"
                value={filters.maxNumOfParticipants.value}
                content={`${filters.minNumOfParticipants.content}~${filters.maxNumOfParticipants.content}명`}
                isChosen
                onXClick={removeOption}
              />
            )} */}
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
    </div>
  );
};

export default MeetupFilter;
