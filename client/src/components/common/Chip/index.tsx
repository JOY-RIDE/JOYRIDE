import { memo } from 'react';
import { ChangeHandler, ClickHandler } from 'types/callback';
import { VscChromeClose } from 'react-icons/vsc';
import styles from './Chip.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface ChipProps {
  name: string;
  value: number | string;
  text: string;
  isSelected?: boolean;
  onSelect?: ClickHandler<HTMLDivElement>;
  onDelete?: ClickHandler<HTMLButtonElement>;
  onChange?: ChangeHandler;
}

const Chip = memo(
  ({
    name,
    value,
    text,
    isSelected,
    onSelect,
    onDelete,
    onChange,
  }: ChipProps) => {
    return (
      <>
        <input
          type="checkbox"
          checked={isSelected}
          name={name}
          value={value}
          className={cn('input')}
          onChange={onChange}
        />
        <div
          className={cn('chip')}
          onClick={!isSelected ? onSelect : undefined}
        >
          <span>{text}</span>

          {onDelete && (
            <button
              type="button"
              className={cn('delete-btn')}
              onClick={onDelete}
            >
              <VscChromeClose />
            </button>
          )}
        </div>
      </>
    );
  }
);

export default Chip;
