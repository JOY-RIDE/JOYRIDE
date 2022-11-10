import styles from './MeetupFilterBoard.module.scss';
import classNames from 'classnames/bind';
import { useSetRecoilState } from 'recoil';
import { meetupBoardFiltersState, meetupFiltersState } from 'states/meetup';
import { SubmitHandler } from 'types/callback';
import useFilter from 'hooks/useFilter';
import { toastMessageState } from 'states/common';
import MeetupFilterChoices from '../MeetupFilterChoices';
import { MEETUP_FILTERS_REDUCERS } from 'utils/filter';
import MeetupFilterBoardOptions from '../MeetupFilterBoardOptions';

const cn = classNames.bind(styles);

interface MeetupFilterBoardProp {
  close: () => void;
}

const MeetupFilterBoard = ({ close }: MeetupFilterBoardProp) => {
  const { filters: boardFilters, handleReset } = useFilter(
    meetupBoardFiltersState,
    MEETUP_FILTERS_REDUCERS
  );

  const showToastMessage = useSetRecoilState(toastMessageState);
  const setFilters = useSetRecoilState(meetupFiltersState);
  const handleSubmit: SubmitHandler = e => {
    e.preventDefault();
    if (
      boardFilters.minNumOfParticipants.value >
      boardFilters.maxNumOfParticipants.value
    ) {
      showToastMessage('인원을 다시 확인해 주세요.');
      return;
    }
    setFilters(boardFilters);
    close();
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
