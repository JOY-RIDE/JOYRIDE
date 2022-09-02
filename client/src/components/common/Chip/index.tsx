import { VscChromeClose } from 'react-icons/vsc';
import styles from './Chip.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface ChipProps {
  content: string;
  isActive: boolean;
  isDeletable: boolean;
  onTextClick?: () => void;
  onXClick?: () => void;
}

const Chip = ({
  content,
  isActive,
  isDeletable,
  onTextClick,
  onXClick,
}: ChipProps) => (
  <li
    className={cn('option', { active: isActive })}
    onClick={!isActive ? onTextClick : undefined}
  >
    <span>{content}</span>
    <button
      type="button"
      className={cn('x-btn', { hidden: !isDeletable })}
      onClick={isDeletable ? onXClick : undefined}
    >
      <VscChromeClose />
    </button>
  </li>
);

export default Chip;
