import { memo } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import styles from './OptionChip.module.scss';
import classNames from 'classnames/bind';
import { MeetupFiltersKey } from 'types/meetup';
import { FilterClickHandler } from 'types/common';

const cn = classNames.bind(styles);

interface CommonProps {
  filtersKey: MeetupFiltersKey;
  value: number | string | boolean; // TODO: refactor
  content: string;
  isChosen: boolean;
}

type ConditionalProps = AllTypeProps | NormalTypeProps | RemoveOnlyTypeProps;
interface AllTypeProps {
  type: 'all';
  onTextClick: FilterClickHandler;
  onXClick?: never;
}
interface NormalTypeProps {
  type: 'normal';
  onTextClick: FilterClickHandler;
  onXClick: FilterClickHandler;
}
interface RemoveOnlyTypeProps {
  type: 'removeOnly';
  onTextClick?: never;
  onXClick: FilterClickHandler;
}

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
