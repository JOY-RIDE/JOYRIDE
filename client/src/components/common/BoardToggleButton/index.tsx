import useToggle from 'hooks/useToggle';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import styles from './BoardToggleButton.module.scss';
import classNames from 'classnames/bind';
import { ReactElement } from 'react';

const cn = classNames.bind(styles);

interface BoardProp {
  closeBoard: () => void;
}
interface BoardToggleButtonProps {
  title: string;
  Board: ({ closeBoard }: BoardProp) => ReactElement;
}

const BoardToggleButton = ({ title, Board }: BoardToggleButtonProps) => {
  const { isOpen, toggle, close, ref } = useToggle();
  return (
    <div className={cn('boundary')} ref={ref}>
      <button className={cn('toggle-btn')} onClick={toggle}>
        <span>{title}</span>
        {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>
      <div className={cn('board-container', { hidden: !isOpen })}>
        <Board closeBoard={close} />
      </div>
    </div>
  );
};

export default BoardToggleButton;
