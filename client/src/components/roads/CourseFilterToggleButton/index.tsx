import useToggle from 'hooks/useToggle';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import styles from './CourseFilterToggleButton.module.scss';
import classNames from 'classnames/bind';
import CourseFilterBoard from '../CourseFilterBoard';

const cn = classNames.bind(styles);

const CourseFilterToggleButton = () => {
  const { isOpen, toggle, close, ref } = useToggle();
  return (
    <div className={cn('boundary')} ref={ref}>
      <button className={cn('toggle-btn')} onClick={toggle}>
        <span>필터</span>
        {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>
      <div className={cn('board-container', { hidden: !isOpen })}>
        <CourseFilterBoard closeBoard={close} />
      </div>
    </div>
  );
};

export default CourseFilterToggleButton;
