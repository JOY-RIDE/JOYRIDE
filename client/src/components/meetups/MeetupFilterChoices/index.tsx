import styles from './MeetupFilterChoices.module.scss';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { meetupBoardFiltersState, meetupFiltersState } from 'states/meetup';
import OptionChip from 'components/common/OptionChip';
import { FilterOptionData } from 'types/common';
import useClientFilter from 'hooks/useClientFilter';
import { MEETUP_FILTERS_DISPATCHES } from 'utils/filter';
import classNames from 'classnames/bind';
import { useEffect } from 'react';

const cn = classNames.bind(styles);

interface MeetupFilterChoicesProp {
  onBoard?: boolean;
}

const MeetupFilterChoices = ({ onBoard }: MeetupFilterChoicesProp) => {
  const state = onBoard ? meetupBoardFiltersState : meetupFiltersState;
  const { filters, handleRemove, handleClear } = useClientFilter(
    state,
    MEETUP_FILTERS_DISPATCHES
  );

  const setBoardFiltersState = useSetRecoilState(meetupBoardFiltersState);
  useEffect(() => {
    if (onBoard) return;
    setBoardFiltersState(filters);
  }, [filters]);

  return (
    <ul className={cn('choices', { wide: !onBoard })}>
      {filters.location && (
        <OptionChip
          type="removeOnly"
          filtersKey="location"
          value={filters.location.value}
          content={filters.location.content}
          isChosen
          onXClick={handleRemove}
        />
      )}
      {filters.pathDifficulty && (
        <OptionChip
          type="removeOnly"
          filtersKey="pathDifficulty"
          value={filters.pathDifficulty.value}
          content={filters.pathDifficulty.content}
          isChosen
          onXClick={handleRemove}
        />
      )}
      {filters.bicycleTypes &&
        filters.bicycleTypes.map(({ value, content }: FilterOptionData) => (
          <OptionChip
            key={`${value}`}
            type="removeOnly"
            filtersKey="bicycleTypes"
            value={value}
            content={content}
            isChosen
            onXClick={handleRemove}
          />
        ))}
      {filters.minRidingSkill && (
        <OptionChip
          type="removeOnly"
          filtersKey="minRidingSkill"
          value={filters.minRidingSkill.value}
          content={filters.minRidingSkill.content}
          isChosen
          onXClick={handleRemove}
        />
      )}
      {filters.gender && (
        <OptionChip
          type="removeOnly"
          filtersKey="gender"
          value={filters.gender.value}
          content={filters.gender.content}
          isChosen
          onXClick={handleRemove}
        />
      )}
      {filters.age &&
        filters.age.map(({ value, content }: FilterOptionData) => (
          <OptionChip
            key={`${value}`}
            type="removeOnly"
            filtersKey="age"
            value={value}
            content={content}
            isChosen
            onXClick={handleRemove}
          />
        ))}
      {Boolean(
        filters.minNumOfParticipants.value || filters.maxNumOfParticipants.value
      ) && (
        <OptionChip
          type="removeOnly"
          filtersKey="maxNumOfParticipants"
          value={filters.maxNumOfParticipants.value}
          content="인원 설정"
          isChosen
          onXClick={handleClear}
        />
      )}
      {filters.isParticipationFree && (
        <OptionChip
          type="removeOnly"
          filtersKey="isParticipationFree"
          value={filters.isParticipationFree.value}
          content={filters.isParticipationFree.content}
          isChosen
          onXClick={handleRemove}
        />
      )}
    </ul>
  );
};

export default MeetupFilterChoices;
