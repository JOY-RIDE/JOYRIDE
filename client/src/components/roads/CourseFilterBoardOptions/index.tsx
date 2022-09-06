import CheckBox from 'components/common/CheckBox';
import styles from './CourseFilterBoardOptions.module.scss';
import classNames from 'classnames/bind';
import { LOCATIONS, COURSE_DIFFICULTY } from 'utils/constants';
import { useRecoilValue } from 'recoil';
import { useCallback, useEffect } from 'react';
import { FilterOptionData, FiltersReducerPayload } from 'types/common';
import { courseBoardFiltersState } from 'states/course';
import { ChangeHandler, ClickHandler } from 'types/callback';
import useClientFilter from 'hooks/useClientFilter';
import { COURSE_FILTERS_DISPATCHES } from 'utils/filter';
import FilterOptionChip from 'components/common/FilterOptionChip';

const cn = classNames.bind(styles);

const IS_CYCLE_PAYLOAD: FiltersReducerPayload = {
  key: 'isCycle',
  value: true,
  content: '순환형 코스만',
};

const CourseFilterBoardOptions = () => {
  const {
    filters: boardFilters,
    handleChoose,
    handleRemove,
    handleToggle,
    handleClear,
    // @ts-ignore
  } = useClientFilter(courseBoardFiltersState, COURSE_FILTERS_DISPATCHES);

  const toggleSpecificOption = useCallback(
    (payload: FiltersReducerPayload) => () => handleToggle(payload),
    []
  );

  return (
    <div className={cn('filters')}>
      <div className={cn('filter')}>
        <label className={cn('label')}>지역</label>
        <ul className={cn('options')}>
          <FilterOptionChip
            type="all"
            filtersKey="location"
            content="전체"
            isActive={!boardFilters.location}
            onTextClick={handleClear}
          />
          {LOCATIONS.map(location => (
            <FilterOptionChip
              key={location}
              type="default"
              filtersKey="location"
              value={location}
              content={location}
              isActive={location === boardFilters.location?.value}
              onTextClick={handleChoose}
              onXClick={handleRemove}
            />
          ))}
        </ul>
      </div>

      <div className={cn('filter')}>
        <label className={cn('label')}>코스 난이도</label>
        <ul className={cn('options')}>
          <FilterOptionChip
            type="all"
            filtersKey="pathDifficulty"
            content="전체"
            isActive={!boardFilters.pathDifficulty}
            onTextClick={handleClear}
          />
          {COURSE_DIFFICULTY.map(difficulty => (
            <FilterOptionChip
              key={difficulty}
              type="default"
              filtersKey="pathDifficulty"
              value={difficulty}
              content={
                difficulty === '1' ? '하' : difficulty === '2' ? '중' : '상'
              }
              isActive={difficulty === boardFilters.pathDifficulty?.value}
              onTextClick={handleChoose}
              onXClick={handleRemove}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseFilterBoardOptions;
