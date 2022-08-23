import { memo } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import styles from './OptionChip.module.scss';
import classNames from 'classnames/bind';
import { MeetupFilterOption } from 'types/meetup';
import { FilterAction, FilterPayload } from 'components/meetups/MeetupFilter';

const cn = classNames.bind(styles);

interface OptionChipProps {
  name: MeetupFilterOption;
  value: number | string;
  text: string;
  isSelected: boolean;
  onClick: (action: FilterAction, payload: FilterPayload) => void;
}

const OptionChip = memo(
  ({ text, isSelected, onClick, ...payload }: OptionChipProps) => {
    const handleOptionSelect = () => onClick('SELECT', payload);
    const handleOptionExclude = () => onClick('EXCLUDE', payload);
    return (
      <div
        className={cn('option', { selected: isSelected })}
        onClick={!isSelected ? handleOptionSelect : undefined}
      >
        <span>{text}</span>
        <button
          type="button"
          className={cn('exclude-btn', { hidden: !isSelected })}
          onClick={handleOptionExclude}
        >
          <VscChromeClose />
        </button>
      </div>
    );
  }
);

export default OptionChip;
