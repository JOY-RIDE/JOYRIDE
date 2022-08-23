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
import { MeetupFilterState } from 'types/meetup';
import { omit } from 'lodash';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { meetupFilterState } from 'states/meetup';
import { FilterDispatchAction, FilterDispatchPayload } from 'types/common';
import {
  stringifyAge,
  stringifyDifficulty,
  stringifyGender,
  stringifyRidingSkill,
} from 'utils/stringify';

const cn = classNames.bind(styles);

interface OptionData {
  value: number | string;
  content: string;
}

/** - 단일 선택 옵션을 가진 filterState 형태: { 옵션명: {value: 값, content: 한글} }
 * - 다중 선택 옵션을 가진 filterState 형태: { 옵션명: [{value: 값, content: 한글}] }
 */
function meetupFilterDispatch(
  state: MeetupFilterState,
  action: FilterDispatchAction,
  { name, value, content }: FilterDispatchPayload
) {
  const data = { value, content };
  switch (action) {
    case 'CHOOSE':
      switch (name) {
        // 단일 선택 옵션들
        case 'location':
        case 'pathDifficulty':
        case 'ridingSkill':
        case 'gender':
          return { ...state, [name]: data };

        // 다중 선택 옵션들
        case 'bicycleType':
        case 'age': {
          const oldDataArray = state[name];
          return oldDataArray
            ? { ...state, [name]: oldDataArray.concat(data) }
            : { ...state, [name]: [data] };
        }
        default:
          throw new Error();
      }

    case 'REMOVE':
      switch (name) {
        // 단일 선택 옵션들
        case 'location':
        case 'pathDifficulty':
        case 'ridingSkill':
          return omit(state, [name]);
        case 'gender':
          return { ...state, [name]: { value: 'all', content: '전체' } };

        // 다중 선택 옵션들
        case 'bicycleType':
        case 'age': {
          const oldDataArray = state[name];
          return oldDataArray.length > 1
            ? {
                ...state,
                [name]: oldDataArray.filter(
                  (data: OptionData) => data.value !== value
                ),
              }
            : omit(state, [name]);
        }
        default:
          throw new Error();
      }

    case 'CLEAR':
      return omit(state, [name]);

    case 'TOGGLE': {
      switch (name) {
        case 'participationFee': {
          const oldData = state[name];
          return oldData ? omit(state, [name]) : { ...state, [name]: data };
        }
        default:
          throw new Error();
      }
    }

    default:
      throw new Error();
  }
}

const participationFeeOption = {
  name: 'participationFee',
  value: false,
  content: '참가비 없는 모임만',
};

const MeetupFilter = () => {
  const { isOpen, toggle, ref } = useToggle();
  const [filter, setFilter] = useRecoilState(meetupFilterState);
  const resetFilter = useResetRecoilState(meetupFilterState);
  console.log(filter);

  const chooseOption = (payload: FilterDispatchPayload) =>
    setFilter(filter => meetupFilterDispatch(filter, 'CHOOSE', payload));
  const removeOption = (payload: FilterDispatchPayload) =>
    setFilter(filter => meetupFilterDispatch(filter, 'REMOVE', payload));
  const clearOption = (payload: FilterDispatchPayload) =>
    setFilter(filter => meetupFilterDispatch(filter, 'CLEAR', payload));

  const handleParticipationFeeChange = () =>
    setFilter(filter =>
      meetupFilterDispatch(filter, 'TOGGLE', participationFeeOption)
    );

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
                value="전체"
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
                value="전체"
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
                value="전체"
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
                      (data: OptionData) => data.value === type
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
                value="전체"
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
                value="전체"
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
                    filter.age.some((data: OptionData) => data.value === age)
                  }
                  onTextClick={chooseOption}
                  onXClick={removeOption}
                />
              ))}
            </ul>
          </div>

          <div className={cn('row')}>
            <label className={cn('label')}>인원</label>
            <div className={cn('option')}>공간</div>
          </div>

          <div className={cn('row', 'participation-fee-container')}>
            <label className={cn('label')}>참가비 여부</label>
            <div className={cn('option')}>
              <CheckBox
                id={cn('participation-fee')}
                shape="square"
                isChecked={Boolean(filter.participationFee)}
                onChange={handleParticipationFeeChange}
              />
              <label htmlFor={cn('participation-fee')}>
                {participationFeeOption.content} 보기
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
              filter.bicycleType.map(({ value, content }: OptionData) => (
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
              filter.age.map(({ value, content }: OptionData) => (
                <OptionChip
                  name="age"
                  value={value}
                  content={content}
                  isChosen
                  onXClick={removeOption}
                />
              ))}
            {filter.participationFee && (
              <OptionChip
                name="participationFee"
                value={filter.participationFee.value}
                content={filter.participationFee.content}
                isChosen
                onXClick={handleParticipationFeeChange}
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
