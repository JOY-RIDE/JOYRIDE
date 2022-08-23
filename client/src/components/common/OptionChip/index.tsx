import { memo } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import styles from './OptionChip.module.scss';
import classNames from 'classnames/bind';
import { MeetupFilterOption } from 'types/meetup';
import { FilterDispatchPayload } from 'types/common';

const cn = classNames.bind(styles);

interface OptionChipProps {
  name: MeetupFilterOption;
  value: number | string;
  text: string;
  isActive: boolean;
  onTextClick: (payload: FilterDispatchPayload) => void;
  onXClick?: (payload: FilterDispatchPayload) => void;
}

const OptionChip = memo(
  ({ text, isActive, onTextClick, onXClick, ...payload }: OptionChipProps) => {
    const handleTextClick = isActive ? undefined : () => onTextClick(payload);
    const handleXClick = onXClick ? () => onXClick(payload) : undefined;
    return (
      <div
        className={cn('option', { active: isActive })}
        onClick={handleTextClick}
      >
        <span>{text}</span>
        <button
          type="button"
          className={cn('x-btn', { hidden: !isActive || !onXClick })}
          onClick={handleXClick}
        >
          <VscChromeClose />
        </button>
      </div>
    );
  }
);

export default OptionChip;
