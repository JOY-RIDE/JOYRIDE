import styles from './MeetupFilterBoard.module.scss';
import classNames from 'classnames/bind';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { meetupBoardFiltersState, meetupFiltersState } from 'states/meetup';
import { SubmitHandler } from 'types/callback';
import useClientFilter from 'hooks/useClientFilter';
import { toastMessageState } from 'states/common';
import MeetupFilterChoices from '../MeetupFilterChoices';
import { MEETUP_FILTERS_DISPATCHES } from 'utils/filter';
import MeetupFilterBoardOptions from '../MeetupFilterBoardOptions';

const cn = classNames.bind(styles);

interface MeetupFilterBoardProp {
  closeBoard: () => void;
}

const MeetupFilterBoard = ({ closeBoard }: MeetupFilterBoardProp) => {
  const boardFilters = useRecoilValue(meetupBoardFiltersState);
  const { handleReset } = useClientFilter(
    meetupBoardFiltersState,
    MEETUP_FILTERS_DISPATCHES
  );

  // useEffect(() => handleReset, []);

  const showToastMessage = useSetRecoilState(toastMessageState);
  const setFilters = useSetRecoilState(meetupFiltersState);
  const handleSubmit: SubmitHandler = e => {
    e.preventDefault();
    if (
      boardFilters.minNumOfParticipants.value >
      boardFilters.maxNumOfParticipants.value
    ) {
      showToastMessage('인원을 다시 확인해 주세요');
      return;
    }
    setFilters(boardFilters);
    closeBoard();
  };

  return (
    <form className={cn('board')} onSubmit={handleSubmit}>
      <MeetupFilterBoardOptions />
      <div className={cn('choices-container')}>
        <MeetupFilterChoices onBoard />
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

export default MeetupFilterBoard;
