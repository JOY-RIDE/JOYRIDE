import useToggle from 'hooks/useToggle';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import CheckBox from 'components/common/CheckBox';
import styles from './MeetupFilter.module.scss';
// import styles from '../../roads/Filter/Filter.module.scss';
import classNames from 'classnames/bind';
import { LOCATIONS } from 'utils/constants';
import Chip from 'components/common/Chip';
import { MeetupFilterState } from 'types/meetup';
import { omit } from 'lodash';
import { useRecoilState } from 'recoil';
import { meetupFilterState } from 'states/meetup';

const cn = classNames.bind(styles);

export type FilterAction = 'SELECT' | 'EXCLUDE';
export interface FilterPayload {
  name: string;
  value: number | string;
}

function meetupFilterReducer(
  state: MeetupFilterState,
  action: FilterAction,
  { name, value }: FilterPayload
) {
  switch (name) {
    case 'location':
      return action === 'SELECT'
        ? { ...state, location: value }
        : omit(state, ['location']);
    default:
      throw new Error();
  }
}

const MeetupFilter = () => {
  const { isOpen, toggle, ref } = useToggle();
  const [filter, setFilter] = useRecoilState(meetupFilterState);
  console.log(filter);

  const handleOptionClick = (action: FilterAction, payload: FilterPayload) =>
    setFilter(filter => meetupFilterReducer(filter, action, payload));

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
              {LOCATIONS.map(location => (
                <Chip
                  name="location"
                  value={location}
                  text={location}
                  isSelected={location === filter?.location}
                  onClick={handleOptionClick}
                />
              ))}
            </ul>
          </li>
          <li className={cn('row')}>
            <label className={cn('label')}>코스 난이도</label>
            <ul className={cn('options')}>공간</ul>
          </li>
          <li className={cn('row')}>
            <label className={cn('label')}>자전거 종류</label>
            <ul className={cn('options')}>공간</ul>
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
          <li className={cn('row', 'participation-fee')}>
            <label className={cn('label')}>참가비 여부</label>
            <div className={cn('option')}>
              <CheckBox shape="square" />
              <p>참가비 없는 모임만 보기</p>
            </div>
          </li>
        </ul>

        <div className={cn('selection')}>
          <ul className={cn('choices')}></ul>
        </div>

        <div className={cn('btns')}>
          <button type="button" className={cn('btn', 'reset-btn')}>
            초기화
          </button>
          <button className={cn('btn', 'submit-btn')}>확인</button>
        </div>
      </form>
    </div>
  );
};

export default MeetupFilter;
