import { memo } from 'react';
import { FilterClickHandler } from 'types/common';
import { Resetter } from 'recoil';
import { VscChromeClose } from 'react-icons/vsc';
import styles from './OptionChip.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface CommonProps {
  content: string;
}

type ConditionalProps =
  | AllTypeProps
  | DefaultTypeProps
  | RemoveOnlyTypeProps
  | ResetTypeProps;

interface AllTypeProps {
  filtersKey: string;
  type: 'all';
  value?: never;
  isChosen: boolean;
  onClick: FilterClickHandler;
}
interface DefaultTypeProps {
  filtersKey: string;
  type: 'default';
  value: number | string | boolean;
  isChosen: boolean;
  onClick: FilterClickHandler;
}
interface RemoveOnlyTypeProps {
  filtersKey: string;
  type: 'removeOnly';
  value: number | string | boolean;
  isChosen?: never;
  onClick: FilterClickHandler;
}
interface ResetTypeProps {
  filtersKey?: never;
  type: 'reset';
  value?: never;
  isChosen?: never;
  onClick: Resetter;
}

type OptionChipProps = CommonProps & ConditionalProps;

// TODO: refactor
const OptionChip = memo(
  ({
    type,
    filtersKey,
    value,
    content,
    isChosen,
    onClick,
  }: OptionChipProps) => {
    const isActive =
      (type === 'all' && isChosen) ||
      (type === 'default' && isChosen) ||
      type === 'removeOnly';
    const isDeletable =
      (type === 'default' && isChosen) || type === 'removeOnly';
    const handleClick = () => {
      switch (type) {
        case 'all':
          return onClick({ key: filtersKey });
        case 'default':
          return onClick({ key: filtersKey, value, content });
        case 'removeOnly':
          return onClick({ key: filtersKey, value });
        case 'reset':
          return onClick();
      }
    };

    return (
      <li
        className={cn('option', { active: isActive })}
        onClick={!isDeletable ? handleClick : undefined}
      >
        <span>{content}</span>
        <button
          type="button"
          className={cn('x-btn', { hidden: !isDeletable })}
          onClick={isDeletable ? handleClick : undefined}
        >
          <VscChromeClose />
        </button>
      </li>
    );
  }
);

export default OptionChip;
