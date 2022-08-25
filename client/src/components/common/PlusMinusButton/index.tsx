import styles from './PlusMinusButton.module.scss';
import { ClickHandler } from 'types/callback';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi';

interface CommonProps {
  name?: string;
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
  name,
  action,
  onDecrease,
  onIncrease,
}: PlusMinusButtonProps) => (
  <button
    type="button"
    name={name}
    className={styles.btn}
    onClick={action === 'decrease' ? onDecrease : onIncrease}
  >
    {action === 'decrease' ? <HiOutlineMinus /> : <HiOutlinePlus />}
  </button>
);

export default PlusMinusButton;
