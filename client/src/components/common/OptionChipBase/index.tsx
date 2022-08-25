import { VscChromeClose } from 'react-icons/vsc';
import styles from './OptionChipBase.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface OptionChipBaseProps {
  content: string;
  isActive: boolean;
  isDeletable: boolean;
  onClick: () => void;
}

const OptionChipBase = ({
  content,
  isActive,
  isDeletable,
  onClick,
}: OptionChipBaseProps) => (
  <li
    className={cn('option', { active: isActive })}
    onClick={!isDeletable ? onClick : undefined}
  >
    <span>{content}</span>
    <button
      type="button"
      className={cn('x-btn', { hidden: !isDeletable })}
      onClick={isDeletable ? onClick : undefined}
    >
      <VscChromeClose />
    </button>
  </li>
);

export default OptionChipBase;
