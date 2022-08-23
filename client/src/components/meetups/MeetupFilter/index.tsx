import useToggle from 'hooks/useToggle';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import CheckBox from 'components/common/CheckBox';
import styles from './MeetupFilter.module.scss';
// import styles from '../../roads/Filter/Filter.module.scss';
import classNames from 'classnames/bind';
import {
  BICYCLE_TYPES,
  LOCATIONS,
  MEETUP_PATH_DIFFICULTIES,
} from 'utils/constants';
import OptionChip from 'components/common/OptionChip';
import { MeetupBicycleType, MeetupFilterState } from 'types/meetup';
import { omit } from 'lodash';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { meetupFilterState } from 'states/meetup';
import { FilterDispatchAction, FilterDispatchPayload } from 'types/common';
import { stringifyDifficulty } from 'utils/stringify';

const cn = classNames.bind(styles);

interface OptionData {
  value: number | string;
  content: string;
}

/** - 단일 선택 옵션 형태: { 옵션명: {value: 값, content: 한글} }
 * - 다중 선택 옵션 형태: { 옵션명: [{value: 값, content: 한글}] }
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
        case 'location':
        case 'pathDifficulty':
          return { ...state, [name]: data };

        case 'bicycleType': {
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
        case 'location':
        case 'pathDifficulty':
          return omit(state, [name]);

        case 'bicycleType': {
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

    default:
      throw new Error();
  }
}

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

  return (
    <div className={cn('boundary')} ref={ref}>
      <button className={cn('toggle-btn')} onClick={toggle}>
        <span>필터</span>
        {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>

      <form className={cn('filter', { hidden: !isOpen })}>
        <ul className={cn('options-container')}>
          <li className={cn('row')}>
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
          </li>

          <li className={cn('row')}>
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
          </li>

          <li className={cn('row')}>
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
          </li>

          <li className={cn('row')}>
            <label className={cn('label')}>라이딩 실력</label>
            <ul className={cn('options')}>공간</ul>
          </li>
          <li className={cn('row')}>
            <label className={cn('label')}>성별</label>
            <ul className={cn('options')}>공간</ul>
          </li>
          <li className={cn('row')}>
            <label className={cn('label')}>연령대</label>
            <ul className={cn('options')}>공간</ul>
          </li>
          <li className={cn('row')}>
            <label className={cn('label')}>인원</label>
            <div className={cn('option')}>공간</div>
          </li>
          <li className={cn('row', 'participation-fee-container')}>
            <label className={cn('label')}>참가비 여부</label>
            <div className={cn('option')}>
              <CheckBox shape="square" id={cn('participation-fee')} />
              <label htmlFor={cn('participation-fee')}>
                참가비 없는 모임만 보기
              </label>
            </div>
          </li>
        </ul>

        <div className={cn('choices-container')}>
          <ul className={cn('choices')}>
            {filter.location && (
              <li>
                <OptionChip
                  name="location"
                  value={filter.location.value}
                  content={filter.location.content}
                  isChosen
                  onTextClick={chooseOption}
                  onXClick={removeOption}
                />
              </li>
            )}

            {filter.pathDifficulty && (
              <li>
                <OptionChip
                  name="pathDifficulty"
                  value={filter.pathDifficulty.value}
                  content={filter.pathDifficulty.content}
                  isChosen
                  onTextClick={chooseOption}
                  onXClick={removeOption}
                />
              </li>
            )}

            {filter.bicycleType &&
              filter.bicycleType.map(({ value, content }: OptionData) => (
                <li key={value}>
                  <OptionChip
                    name="bicycleType"
                    value={value}
                    content={content}
                    isChosen
                    onTextClick={chooseOption}
                    onXClick={removeOption}
                  />
                </li>
              ))}
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
