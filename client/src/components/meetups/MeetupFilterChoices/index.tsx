import styles from './MeetupFilterChoices.module.scss';
import { useRecoilValue } from 'recoil';
import { meetupBoardFiltersState, meetupFiltersState } from 'states/meetup';
import OptionChip from 'components/common/OptionChip';
import { FilterOptionData } from 'types/common';
import useClientFilter from 'hooks/useClientFilter';
import { MEETUP_FILTERS_DISPATCHES } from '../MeetupFilterBoard';

type MeetupFilterChoicesProp = {
  onBoard: boolean;
};

const MeetupFilterChoices = ({ onBoard }: MeetupFilterChoicesProp) => {
  const state = onBoard ? meetupBoardFiltersState : meetupFiltersState;
  const filters = useRecoilValue(state);
  const { removeOption, clearOptions } = useClientFilter(
    state,
    MEETUP_FILTERS_DISPATCHES
  );
  return (
    <ul className={styles.choices}>
      {filters.location && (
        <OptionChip
          type="removeOnly"
          filtersKey="location"
          value={filters.location.value}
          content={filters.location.content}
          isChosen
          onXClick={removeOption}
        />
      )}
      {filters.pathDifficulty && (
        <OptionChip
          type="removeOnly"
          filtersKey="pathDifficulty"
          value={filters.pathDifficulty.value}
          content={filters.pathDifficulty.content}
          isChosen
          onXClick={removeOption}
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
            onXClick={removeOption}
          />
        ))}
      {filters.minRidingSkill && (
        <OptionChip
          type="removeOnly"
          filtersKey="minRidingSkill"
          value={filters.minRidingSkill.value}
          content={filters.minRidingSkill.content}
          isChosen
          onXClick={removeOption}
        />
      )}
      {filters.gender && (
        <OptionChip
          type="removeOnly"
          filtersKey="gender"
          value={filters.gender.value}
          content={filters.gender.content}
          isChosen
          onXClick={removeOption}
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
            onXClick={removeOption}
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
          onXClick={clearOptions}
        />
      )}
      {filters.isParticipationFree && (
        <OptionChip
          type="removeOnly"
          filtersKey="isParticipationFree"
          value={filters.isParticipationFree.value}
          content={filters.isParticipationFree.content}
          isChosen
          onXClick={removeOption}
        />
      )}
    </ul>
  );
};

export default MeetupFilterChoices;
