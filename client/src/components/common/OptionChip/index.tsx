import { memo } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import styles from './OptionChip.module.scss';
import classNames from 'classnames/bind';
import { FilterClickHandler } from 'types/common';
import { Resetter } from 'recoil';

const cn = classNames.bind(styles);

interface CommonProps {
  value: number | string | boolean; // TODO: refactor
  content: string;
  isChosen: boolean;
}

type ConditionalProps = AllTypeProps | NormalTypeProps | RemoveOnlyTypeProps;
// | resetTypeProps;
interface AllTypeProps {
  filtersKey: string;
  type: 'all';
  onTextClick: FilterClickHandler;
  onXClick?: never;
}
interface NormalTypeProps {
  filtersKey: string;
  type: 'normal';
  onTextClick: FilterClickHandler;
  onXClick: FilterClickHandler;
}
interface RemoveOnlyTypeProps {
  filtersKey: string;
  type: 'removeOnly';
  onTextClick?: never;
  onXClick: FilterClickHandler;
}
// interface resetTypeProps {
//   filtersKey?: never;
//   type: 'reset';
//   onTextClick: Resetter;
//   onXClick?: never;
// }

type OptionChipProps = CommonProps & ConditionalProps;

const OptionChip = memo(
  ({
    type,
    filtersKey,
    value,
    content,
    isChosen,
    onTextClick,
    onXClick,
  }: OptionChipProps) => {
    const handleTextClick =
      type === 'removeOnly'
        ? undefined
        : isChosen
        ? undefined
        : () => onTextClick({ key: filtersKey, value, content });

    const handleXClick =
      type === 'all' ? undefined : () => onXClick({ key: filtersKey, value });

    return (
      <li
        className={cn('option', { active: isChosen })}
        onClick={handleTextClick}
      >
        <span>{content}</span>
        <button
          type="button"
          className={cn('x-btn', { hidden: type === 'all' || !isChosen })}
          onClick={handleXClick}
        >
          <VscChromeClose />
        </button>
      </li>
    );
  }
);

export default OptionChip;
