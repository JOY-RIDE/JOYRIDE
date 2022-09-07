import { FiltersDispatch } from 'types/common';
import { Resetter } from 'recoil';
import Chip from '../Chip';
import { memo } from 'react';
import styles from './FilterOptionChip.module.scss';

type FilterOptionChipType = 'all' | 'default' | 'removeOnly' | 'reset';

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

type FilterOptionChipProps = CommonProps & ConditionalProps;

function checkIfActive(type: FilterOptionChipType, isActive: boolean) {
  if (type === 'all' && isActive) return true;
  if (type === 'default' && isActive) return true;
  if (type === 'removeOnly') return true;
  if (type === 'reset') return false;
  return false;
}
function checkIfDeletable(type: FilterOptionChipType, isActive: boolean) {
  if ((type === 'default' && isActive) || type === 'removeOnly') return true;
  else return false;
}

// TODO: refactor
const FilterOptionChip = memo(
  ({
    type,
    filtersKey,
    value,
    content,
    isActive,
    onTextClick,
    onXClick,
  }: FilterOptionChipProps) => {
    const handleTextClick = !onTextClick
      ? undefined
      : type === 'reset'
      ? onTextClick
      : () => onTextClick({ key: filtersKey, value, content });
    const handleXClick = !onXClick
      ? undefined
      : () => onXClick({ key: filtersKey, value });
    return (
      // TODO: cursor
      <li className={styles.option}>
        <Chip
          content={content}
          isActive={checkIfActive(type, isActive)}
          isDeletable={checkIfDeletable(type, isActive)}
          onTextClick={handleTextClick}
          onXClick={handleXClick}
        />
      </li>
    );
  }
);

export default FilterOptionChip;
