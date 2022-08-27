import { memo } from 'react';
import { FiltersDispatch } from 'types/common';
import { Resetter } from 'recoil';
import { VscChromeClose } from 'react-icons/vsc';
import styles from './OptionChip.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type ChipType = 'all' | 'default' | 'removeOnly' | 'reset';

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
  isActive: boolean;
  onTextClick: FiltersDispatch;
  onXClick?: never;
}
interface DefaultTypeProps {
  filtersKey: string;
  type: 'default';
  value: number | string | boolean;
  isActive: boolean;
  onTextClick: FiltersDispatch;
  onXClick?: FiltersDispatch;
}
interface RemoveOnlyTypeProps {
  filtersKey: string;
  type: 'removeOnly';
  value: number | string | boolean;
  isActive: true;
  onTextClick?: never;
  onXClick: FiltersDispatch;
}
interface ResetTypeProps {
  filtersKey?: never;
  type: 'reset';
  value?: never;
  isActive: false;
  onTextClick: Resetter;
  onXClick?: never;
}

type OptionChipProps = CommonProps & ConditionalProps;

function checkIfActive(type: ChipType, isActive: boolean) {
  if (type === 'all' && isActive) return true;
  if (type === 'default' && isActive) return true;
  if (type === 'removeOnly') return true;
  if (type === 'reset') return false;
}

function checkIfDeletable(type: ChipType, isActive: boolean) {
  if ((type === 'default' && isActive) || type === 'removeOnly') return true;
  else return false;
}

// TODO: refactor
const OptionChip = memo(
  ({
    type,
    filtersKey,
    value,
    content,
    isActive,
    onTextClick,
    onXClick,
  }: OptionChipProps) => {
    const handleTextClick = !onTextClick
      ? undefined
      : type === 'reset'
      ? onTextClick
      : () => onTextClick({ key: filtersKey, value, content });
    const handleXClick = !onXClick
      ? undefined
      : () => onXClick({ key: filtersKey, value });

    return (
      <li
        className={cn('option', { active: checkIfActive(type, isActive) })}
        onClick={!checkIfActive(type, isActive) ? handleTextClick : undefined}
      >
        <span>{content}</span>
        <button
          type="button"
          className={cn('x-btn', { hidden: !checkIfDeletable(type, isActive) })}
          onClick={checkIfDeletable(type, isActive) ? handleXClick : undefined}
        >
          <VscChromeClose />
        </button>
      </li>
    );
  }
);

export default OptionChip;
