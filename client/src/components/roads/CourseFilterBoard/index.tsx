import styles from './CourseFilterBoard.module.scss';
import classNames from 'classnames/bind';
import { useSetRecoilState } from 'recoil';
import { courseBoardFiltersState, courseFiltersState } from 'states/course';
import { SubmitHandler } from 'types/callback';
import useClientFilter from 'hooks/useClientFilter';
import CourseFilterChoices from '../CourseFilterChoices';
import { COURSE_FILTERS_DISPATCHES } from 'utils/filter';
import CourseFilterBoardOptions from '../CourseFilterBoardOptions';

const cn = classNames.bind(styles);

interface CourseFilterBoardProp {
  close: () => void;
}

const CourseFilterBoard = ({ close }: CourseFilterBoardProp) => {
  const { filters: boardFilters, handleReset } = useClientFilter(
    courseBoardFiltersState,
    // @ts-ignore
    COURSE_FILTERS_DISPATCHES
  );
  console.log(boardFilters);

  const setFilters = useSetRecoilState(courseFiltersState);
  const handleSubmit: SubmitHandler = e => {
    e.preventDefault();
    setFilters(boardFilters);
    close();
  };

  return (
    <form className={cn('board')} onSubmit={handleSubmit}>
      <CourseFilterBoardOptions />
      <div className={cn('choices-container')}>
        <CourseFilterChoices onBoard />
      </div>
      <div className={cn('btns')}>
        <button
          type="button"
          className={cn('btn', 'reset-btn')}
          onClick={handleReset}
        >
          초기화
        </button>
        <button className={cn('btn', 'submit-btn')}>확인</button>
      </div>
    </form>
  );
};

export default CourseFilterBoard;
