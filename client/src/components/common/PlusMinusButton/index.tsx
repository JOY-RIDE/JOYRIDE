import { ClickHandler } from 'types/callback';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi';
import styles from './PlusMinusButton.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface CommonProps {
  color: 'white' | 'grey';
  size: 'sm' | 'md';
  name?: string;
  label: string;
}

type ConditionalProps =
  | {
      action: 'increase';
      onIncrease: ClickHandler<HTMLButtonElement>;
      onDecrease?: never;
    }
  | {
      action: 'decrease';
      onIncrease?: never;
      onDecrease: ClickHandler<HTMLButtonElement>;
    };

type PlusMinusButtonProps = CommonProps & ConditionalProps;

const PlusMinusButton = ({
  color,
  size,
  name,
  label,
  action,
  onDecrease,
  onIncrease,
}: PlusMinusButtonProps) => (
  <button
    type="button"
    name={name}
    className={cn('btn', color, size)}
    aria-label={label}
    onClick={action === 'decrease' ? onDecrease : onIncrease}
  >
    {action === 'decrease' ? <HiOutlineMinus /> : <HiOutlinePlus />}
  </button>
);

export default PlusMinusButton;
