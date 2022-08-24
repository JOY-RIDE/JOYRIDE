import useToggle from 'hooks/useToggle';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import styles from './MeetupFilter.module.scss';
import classNames from 'classnames/bind';
import MeetupFilterBoard from '../MeetupFilterBoard';

const cn = classNames.bind(styles);

const MeetupFilter = () => {
  const { isOpen, toggle, ref } = useToggle();

  return (
    <div className={cn('boundary')} ref={ref}>
      <button className={cn('toggle-btn')} onClick={toggle}>
        <span>필터</span>
        {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>
      <div className={cn('board-container', { hidden: !isOpen })}>
        <MeetupFilterBoard />
      </div>
    </div>
  );
};

export default MeetupFilter;
