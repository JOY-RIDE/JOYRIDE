import CheckBox from 'components/common/CheckBox';
import styles from './CourseFilterBoardOptions.module.scss';
import classNames from 'classnames/bind';
import { LOCATIONS, COURSE_DIFFICULTY } from 'utils/constants';
import OptionChip from 'components/common/OptionChip';
import { useRecoilValue } from 'recoil';
import { useCallback, useEffect } from 'react';
import { FilterOptionData, FiltersDispatchPayload } from 'types/common';
import { courseBoardFiltersState } from 'states/course';
import { ChangeHandler, ClickHandler } from 'types/callback';
import useClientFilter from 'hooks/useClientFilter';
import { COURSE_FILTERS_DISPATCHES } from 'utils/filter';

const cn = classNames.bind(styles);

const IS_CYCLE_PAYLOAD: FiltersDispatchPayload = {
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
  } = useClientFilter(courseBoardFiltersState, COURSE_FILTERS_DISPATCHES);

  const toggleSpecificOption = useCallback(
    (payload: FiltersDispatchPayload) => () => handleToggle(payload),
    []
  );

  return (
    <div className={cn('filters')}>
      <div className={cn('filter')}>
        <label className={cn('label')}>지역</label>
        <ul className={cn('options')}>
          <OptionChip
            type="all"
            filtersKey="location"
            value="all"
            content="전체"
            isChosen={!boardFilters.location}
            onTextClick={handleClear}
          />
          {LOCATIONS.map(location => (
            <OptionChip
              key={location}
              type="normal"
              filtersKey="location"
              value={location}
              content={location}
              isChosen={location === boardFilters.location?.value}
              onTextClick={handleChoose}
              onXClick={handleRemove}
            />
          ))}
        </ul>
      </div>

      <div className={cn('filter')}>
        <label className={cn('label')}>코스 난이도</label>
        <ul className={cn('options')}>
          <OptionChip
            type="all"
            filtersKey="pathDifficulty"
            value="all"
            content="전체"
            isChosen={!boardFilters.pathDifficulty}
            onTextClick={handleClear}
          />
          {COURSE_DIFFICULTY.map(difficulty => (
            <OptionChip
              key={difficulty}
              type="normal"
              filtersKey="pathDifficulty"
              value={difficulty}
              content={
                difficulty === '1' ? '하' : difficulty === '2' ? '중' : '상'
              }
              isChosen={difficulty === boardFilters.pathDifficulty?.value}
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
