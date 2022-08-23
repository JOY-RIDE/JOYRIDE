import { memo } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import styles from './OptionChip.module.scss';
import classNames from 'classnames/bind';
import { MeetupFilterOptionName } from 'types/meetup';
import { FilterDispatchPayload } from 'types/common';

const cn = classNames.bind(styles);

interface OptionChipProps {
  name: MeetupFilterOptionName;
  value: number | string;
  content: string;
  isChosen: boolean;
  onTextClick: (payload: FilterDispatchPayload) => void;
  onXClick?: (payload: FilterDispatchPayload) => void;
}

const OptionChip = memo(
  ({
    name,
    value,
    content,
    isChosen,
    onTextClick,
    onXClick,
  }: OptionChipProps) => {
    const handleTextClick = isChosen
      ? undefined
      : () => onTextClick({ name, value, content });
    const handleXClick = onXClick
      ? () => onXClick({ name, value, content })
      : undefined;
    return (
      <div
        className={cn('option', { active: isChosen })}
        onClick={handleTextClick}
      >
        <span>{content}</span>
        <button
          type="button"
          className={cn('x-btn', { hidden: !isChosen || !onXClick })}
          onClick={handleXClick}
        >
          <VscChromeClose />
        </button>
      </div>
    );
  }
);

export default OptionChip;
