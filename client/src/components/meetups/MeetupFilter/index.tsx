import useToggle from 'hooks/useToggle';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import CheckBox from 'components/common/CheckBox';
import styles from './MeetupFilter.module.scss';
// import styles from '../../roads/Filter/Filter.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const MeetupFilter = () => {
  const { isOpen, toggle, ref } = useToggle();
  return (
    <div className={cn('boundary')} ref={ref}>
      <button className={cn('toggle-btn')} onClick={toggle}>
        <span>필터</span>
        {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>

      <form className={cn('filter', { hidden: !isOpen })}>
        <ul className={cn('options')}>
          <li className={cn('option')}>
            <label className={cn('label')}>지역</label>
            <ul className={cn('choices')}>공간</ul>
          </li>
          <li className={cn('option')}>
            <label className={cn('label')}>코스 난이도</label>
            <ul className={cn('choices')}>공간</ul>
          </li>
          <li className={cn('option')}>
            <label className={cn('label')}>자전거 종류</label>
            <ul className={cn('choices')}>공간</ul>
          </li>
          <li className={cn('option')}>
            <label className={cn('label')}>라이딩 실력</label>
            <ul className={cn('choices')}>공간</ul>
          </li>
          <li className={cn('option')}>
            <label className={cn('label')}>성별</label>
            <ul className={cn('choices')}>공간</ul>
          </li>
          <li className={cn('option')}>
            <label className={cn('label')}>연령대</label>
            <ul className={cn('choices')}>공간</ul>
          </li>
          <li className={cn('option')}>
            <label className={cn('label')}>인원</label>
            <div className={cn('choices')}>공간</div>
          </li>
          <li className={cn('option', 'participation-fee')}>
            <label className={cn('label')}>참가비 여부</label>
            <div className={cn('choices')}>
              <CheckBox shape="square" />
              <p>참가비 없는 모임만 보기</p>
            </div>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default MeetupFilter;
