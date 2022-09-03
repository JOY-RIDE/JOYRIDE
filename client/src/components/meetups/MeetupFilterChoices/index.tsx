import styles from './MeetupFilterChoices.module.scss';
import { useSetRecoilState } from 'recoil';
import {
  meetupBoardFiltersState,
  meetupFiltersState,
  MEETUP_FILTERS_INITIAL_STATE,
} from 'states/meetup';
import { FilterOptionData } from 'types/common';
import useClientFilter from 'hooks/useClientFilter';
import { MEETUP_FILTERS_REDUCERS } from 'utils/filter';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import FilterOptionChip from 'components/common/FilterOptionChip';

const cn = classNames.bind(styles);

interface MeetupFilterChoicesProp {
  onBoard?: boolean;
}

const MeetupFilterChoices = ({ onBoard }: MeetupFilterChoicesProp) => {
  const state = onBoard ? meetupBoardFiltersState : meetupFiltersState;
  const { filters, handleRemove, handleClear, handleReset } = useClientFilter(
    state,
    MEETUP_FILTERS_REDUCERS
  );

  const setBoardFiltersState = useSetRecoilState(meetupBoardFiltersState);
  useEffect(() => {
    if (onBoard) return;
    setBoardFiltersState(filters);
  }, [filters]);

  return (
    <ul className={cn('choices', { wide: !onBoard })}>
      {filters.location && (
        <FilterOptionChip
          type="removeOnly"
          filtersKey="location"
          value={filters.location.value}
          content={filters.location.content}
          isActive
          onXClick={handleRemove}
        />
      )}
      {filters.pathDifficulty && (
        <FilterOptionChip
          type="removeOnly"
          filtersKey="pathDifficulty"
          value={filters.pathDifficulty.value}
          content={filters.pathDifficulty.content}
          isActive
          onXClick={handleRemove}
        />
      )}
      {filters.bicycleTypes && (
        <FilterOptionChip
          type="removeOnly"
          filtersKey="bicycleTypes"
          value={filters.bicycleTypes.value}
          content={filters.bicycleTypes.content}
          isActive
          onXClick={handleRemove}
        />
      )}
      {/* {filters.bicycleTypes &&
        filters.bicycleTypes.map(({ value, content }: FilterOptionData) => (
          <FilterOptionChip
            key={`${value}`}
            type="removeOnly"
            filtersKey="bicycleTypes"
            value={value}
            content={content}
            isActive
            onXClick={handleRemove}
          />
        ))} */}
      {filters.ridingSkill && (
        <FilterOptionChip
          type="removeOnly"
          filtersKey="ridingSkill"
          value={filters.ridingSkill.value}
          content={filters.ridingSkill.content}
          isActive
          onXClick={handleRemove}
        />
      )}
      {filters.gender && (
        <FilterOptionChip
          type="removeOnly"
          filtersKey="gender"
          value={filters.gender.value}
          content={filters.gender.content}
          isActive
          onXClick={handleRemove}
        />
      )}
      {filters.age && (
        <FilterOptionChip
          type="removeOnly"
          filtersKey="age"
          value={filters.age.value}
          content={filters.age.content}
          isActive
          onXClick={handleRemove}
        />
      )}
      {/* {filters.age &&
        filters.age.map(({ value, content }: FilterOptionData) => (
          <FilterOptionChip
            key={`${value}`}
            type="removeOnly"
            filtersKey="age"
            value={value}
            content={content}
            isActive
            onXClick={handleRemove}
          />
        ))} */}
      {Boolean(
        filters.minNumOfParticipants.value || filters.maxNumOfParticipants.value
      ) && (
        <FilterOptionChip
          type="removeOnly"
          filtersKey="maxNumOfParticipants"
          value={filters.maxNumOfParticipants.value}
          content="인원 설정"
          isActive
          onXClick={handleClear}
        />
      )}
      {filters.isParticipationFree && (
        <FilterOptionChip
          type="removeOnly"
          filtersKey="isParticipationFree"
          value={filters.isParticipationFree.value}
          content={filters.isParticipationFree.content}
          isActive
          onXClick={handleRemove}
        />
      )}
      {!onBoard &&
        JSON.stringify(filters) !==
          JSON.stringify(MEETUP_FILTERS_INITIAL_STATE) && (
          <FilterOptionChip
            type="reset"
            content="초기화"
            isActive={false}
            onTextClick={handleReset}
          />
        )}
    </ul>
  );
};

export default MeetupFilterChoices;
