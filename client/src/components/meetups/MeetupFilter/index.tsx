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
import { FiltersDispatchPayload } from 'types/common';

const cn = classNames.bind(styles);

interface FilterOptionData {
  value: number | string | boolean;
  content?: string;
}

// Functions

/** - 단일 선택 옵션을 가진 filtersState 형태: { key: {value: 값, content: 한글} }
 * - 다중 선택 옵션을 가진 filtersState 형태: { key: [{value: 값, content: 한글}] }
 */

function filtersDispatchForChoosing(
  state: MeetupFiltersState,
  { key, ...data }: FiltersDispatchPayload
) {
  switch (key) {
    // 단일 선택 옵션들
    case 'location':
    case 'pathDifficulty':
    case 'ridingSkill':
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
    case 'ridingSkill':
    case 'gender':
    // case 'minNumOfParticipants':
    // case 'maxNumOfParticipants':
    case 'hasParticipationFee':
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
    case 'hasParticipationFee': {
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

const HAS_PARTICIPATION_FEE_PAYLOAD: FiltersDispatchPayload = {
  key: 'hasParticipationFee',
  value: false,
  content: '참가비 없는 모임만',
};

const MeetupFilter = () => {
  const { isOpen, toggle, ref } = useToggle();
  const [filters, setFilters] = useRecoilState(meetupFiltersState);
  const resetFilters = useResetRecoilState(meetupFiltersState);
  console.log(filters);

  const chooseOption = useCallback(
    (payload: FiltersDispatchPayload) =>
      setFilters(filters => filtersDispatchForChoosing(filters, payload)),
    []
  );
  const removeOption = useCallback(
    (payload: FiltersDispatchPayload) =>
      setFilters(filters => filtersDispatchForRemoving(filters, payload)),
    []
  );
  const toggleOption = useCallback(
    (payload: FiltersDispatchPayload) =>
      setFilters(filters => filtersDispatchForToggling(filters, payload)),
    []
  );
  const clearOptions = useCallback(
    (payload: FiltersDispatchPayload) =>
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

  const handleParticipationFeeToggle = () =>
    toggleOption(HAS_PARTICIPATION_FEE_PAYLOAD);

  return (
    <div className={cn('boundary')} ref={ref}>
      <button className={cn('toggle-btn')} onClick={toggle}>
        <span>필터</span>
        {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>

      <form className={cn('filter', { hidden: !isOpen })}>
        <div className={cn('options-container')}>
          <div className={cn('row')}>
            <label className={cn('label')}>지역</label>
            <ul className={cn('options')}>
              <OptionChip
                name="location"
                value="all"
                content="전체"
                isChosen={!filter.location}
                onTextClick={clearOption}
              />
              {LOCATIONS.map((location, index) => (
                <OptionChip
                  key={index}
                  name="location"
                  value={location}
                  content={location}
                  isChosen={location === filter.location?.value}
                  onTextClick={chooseOption}
                  onXClick={removeOption}
                />
              ))}
            </ul>
          </div>

          <div className={cn('row')}>
            <label className={cn('label')}>코스 난이도</label>
            <ul className={cn('options')}>
              <OptionChip
                name="pathDifficulty"
                value="all"
                content="전체"
                isChosen={!filter.pathDifficulty}
                onTextClick={clearOption}
              />
              {MEETUP_PATH_DIFFICULTIES.map((difficulty, index) => (
                <OptionChip
                  key={index}
                  name="pathDifficulty"
                  value={difficulty}
                  content={stringifyDifficulty(difficulty)}
                  isChosen={difficulty === filter.pathDifficulty?.value}
                  onTextClick={chooseOption}
                  onXClick={removeOption}
                />
              ))}
            </ul>
          </div>

          <div className={cn('row')}>
            <label className={cn('label')}>자전거 종류</label>
            <ul className={cn('options')}>
              <OptionChip
                name="bicycleType"
                value="all"
                content="전체"
                isChosen={!filter.bicycleType}
                onTextClick={clearOption}
              />
              {BICYCLE_TYPES.map((type, index) => (
                <OptionChip
                  key={index}
                  name="bicycleType"
                  value={type}
                  content={type}
                  isChosen={
                    filter.bicycleType &&
                    filter.bicycleType.some(
                      (data: FilterOptionData) => data.value === type
                    )
                  }
                  onTextClick={chooseOption}
                  onXClick={removeOption}
                />
              ))}
            </ul>
          </div>

          <div className={cn('row')}>
            <label className={cn('label')}>최소 라이딩 실력</label>
            <ul className={cn('options')}>
              <OptionChip
                name="ridingSkill"
                value="all"
                content="전체"
                isChosen={!filter.ridingSkill}
                onTextClick={clearOption}
              />
              {RIDING_SKILLS.map((skill, index) => (
                <OptionChip
                  key={index}
                  name="ridingSkill"
                  value={skill}
                  content={stringifyRidingSkill(skill)}
                  isChosen={skill === filter.ridingSkill?.value}
                  onTextClick={chooseOption}
                  onXClick={removeOption}
                />
              ))}
            </ul>
          </div>

          <div className={cn('row')}>
            <label className={cn('label')}>성별</label>
            <ul className={cn('options')}>
              <OptionChip
                name="gender"
                value="all"
                content="전체"
                isChosen={'all' === filter.gender.value}
                onTextClick={chooseOption}
              />
              {GENDERS.map((gender, index) => (
                <OptionChip
                  key={index}
                  name="gender"
                  value={gender}
                  content={stringifyGender(gender)}
                  isChosen={gender === filter.gender.value}
                  onTextClick={chooseOption}
                  onXClick={removeOption}
                />
              ))}
            </ul>
          </div>

          <div className={cn('row')}>
            <label className={cn('label')}>연령대</label>
            <ul className={cn('options')}>
              <OptionChip
                name="age"
                value="all"
                content="전체"
                isChosen={!filter.age}
                onTextClick={clearOption}
              />
              {AGES.map((age, index) => (
                <OptionChip
                  key={index}
                  name="age"
                  value={age}
                  content={stringifyAge(age)}
                  isChosen={
                    filter.age &&
                    filter.age.some(
                      (data: FilterOptionData) => data.value === age
                    )
                  }
                  onTextClick={chooseOption}
                  onXClick={removeOption}
                />
              ))}
            </ul>
          </div>

          <div className={cn('row')}>
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

          <div className={cn('row', 'participation-fee-container')}>
            <label className={cn('label')}>참가비 여부</label>
            <div className={cn('option')}>
              <CheckBox
                id={cn('participation-fee')}
                shape="square"
                isChecked={Boolean(filter.participationFee)}
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
            {filter.location && (
              <OptionChip
                name="location"
                value={filter.location.value}
                content={filter.location.content}
                isChosen
                onXClick={removeOption}
              />
            )}
            {filter.pathDifficulty && (
              <OptionChip
                name="pathDifficulty"
                value={filter.pathDifficulty.value}
                content={filter.pathDifficulty.content}
                isChosen
                onXClick={removeOption}
              />
            )}
            {filter.bicycleType &&
              filter.bicycleType.map(({ value, content }: FilterOptionData) => (
                <OptionChip
                  name="bicycleType"
                  value={value}
                  content={content}
                  isChosen
                  onXClick={removeOption}
                />
              ))}
            {filter.ridingSkill && (
              <OptionChip
                name="ridingSkill"
                value={filter.ridingSkill.value}
                content={filter.ridingSkill.content}
                isChosen
                onXClick={removeOption}
              />
            )}
            {filter.gender.value !== 'all' && (
              <OptionChip
                name="gender"
                value={filter.gender.value}
                content={filter.gender.content}
                isChosen
                onXClick={removeOption}
              />
            )}
            {filter.age &&
              filter.age.map(({ value, content }: FilterOptionData) => (
                <OptionChip
                  name="age"
                  value={value}
                  content={content}
                  isChosen
                  onXClick={removeOption}
                />
              ))}
            {/* {filter.maxNumOfParticipants.value > 0 && (
              <OptionChip
                name="maxNumOfParticipants"
                value={filter.maxNumOfParticipants.value}
                content={`${filter.minNumOfParticipants.content}~${filter.maxNumOfParticipants.content}명`}
                isChosen
                onXClick={removeOption}
              />
            )} */}
            {filter.participationFee && (
              <OptionChip
                name="participationFee"
                value={filter.participationFee.value}
                content={filter.participationFee.content}
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
            onClick={resetFilter}
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
