import styles from './CourseFilterChoices.module.scss';
import { useSetRecoilState } from 'recoil';
import { courseBoardFiltersState, courseFiltersState } from 'states/course';
import OptionChip from 'components/common/OptionChip';
import { FilterOptionData } from 'types/common';
import useClientFilter from 'hooks/useClientFilter';
import { COURSE_FILTERS_DISPATCHES } from 'utils/filter';
import classNames from 'classnames/bind';
import { useEffect } from 'react';

const cn = classNames.bind(styles);

interface CourseFilterChoicesProp {
  onBoard?: boolean;
}

const CourseFilterChoices = ({ onBoard }: CourseFilterChoicesProp) => {
  const state = onBoard ? courseBoardFiltersState : courseFiltersState;
  const { filters, handleRemove } = useClientFilter(
    state,
    COURSE_FILTERS_DISPATCHES
  );

  const setBoardFiltersState = useSetRecoilState(courseBoardFiltersState);
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
    </ul>
  );
};

export default CourseFilterChoices;
