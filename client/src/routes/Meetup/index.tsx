import styles from './Meetup.module.scss';
import classNames from 'classnames/bind';
import { mockMeetupAPI } from 'apis/meetupAPI';
import { useParams } from 'react-router-dom';
import { HiOutlineBookmark } from 'react-icons/hi';
import {
  stringifyGender,
  stringifyMeetupPathDifficulty,
  stringifyRidingSkill,
} from 'utils/stringify';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import MeetupRoute from 'components/meetup/MeetupRoute';

dayjs.locale('ko');

const cn = classNames.bind(styles);
const DATE_FORMAT = 'M월 D일 a h:mm';

const Meetup = () => {
  const { meetupId } = useParams();
  // TODO: react query
  const meetup = mockMeetupAPI.getMeetupList()[Number(meetupId)];

  return (
    <div className={cn('container')}>
      <div className={cn('title-wrapper')}>
        <h1 className={cn('title')}>{meetup.title}</h1>
        <button className={cn('bookmark-btn')} aria-label="모임 북마크 버튼">
          {/* TODO: active */}
          <HiOutlineBookmark />
        </button>
      </div>

      {/* TODO: 모임장 */}

      <div className={cn('fields-wrapper')}>
        <div className={cn('fields')}>
          <div className={cn('field')}>
            <label className={cn('label')}>모집 마감 일시</label>
            <span className={cn('data')}>
              {dayjs(meetup.dueDate).format(DATE_FORMAT)}
            </span>
          </div>

          <div className={cn('field')}>
            <label className={cn('label')}>모임 일시</label>
            <span className={cn('data', 'emphasized')}>
              {dayjs(meetup.meetingDate).format(DATE_FORMAT)}
            </span>
          </div>
        </div>

        <div className={cn('fields')}>
          <div className={cn('field')}>
            <label className={cn('label')}>지역</label>
            <span className={cn('data', 'emphasized')}>{meetup.location}</span>
          </div>

          <div className={cn('field')}>
            <label className={cn('label')}>코스 난이도</label>
            <span className={cn('data', 'emphasized')}>
              {stringifyMeetupPathDifficulty(meetup.pathDifficulty)}
            </span>
          </div>

          <div className={cn('field')}>
            <label className={cn('label')}>자전거 종류</label>
            <ul className={cn('data')}>
              {meetup.bicycleTypes.map(type => (
                <li key={type} className={cn('emphasized')}>
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={cn('fields')}>
          <div className={cn('field')}>
            <label className={cn('label')}>인원</label>
            <div className={cn('data')}>
              <span className={cn('emphasized')}>
                {meetup.participants.length}
              </span>
              /{meetup.maxNumOfParticipants}명
            </div>
          </div>

          <div className={cn('field')}>
            <label className={cn('label')}>성별</label>
            <span className={cn('data', 'emphasized')}>
              {stringifyGender(meetup.gender)}
            </span>
          </div>

          <div className={cn('field', 'age')}>
            <label className={cn('label')}>나이</label>
            <div className={cn('data')}>
              <span className={cn('emphasized')}>{meetup.minBirthYear}</span>
              년생 ~{' '}
              <span className={cn('emphasized')}>{meetup.maxBirthYear}</span>
              년생
            </div>
          </div>

          <div className={cn('field')}>
            <label className={cn('label')}>라이딩 실력</label>
            <span className={cn('data', 'emphasized')}>
              {stringifyRidingSkill(meetup.ridingSkill)}
            </span>
          </div>

          <div className={cn('field')}>
            <label className={cn('label')}>참가비</label>
            <div className={cn('data')}>
              <span className={cn('emphasized')}>
                {meetup.participationFee}
              </span>
              원
            </div>
          </div>
        </div>

        <div className={cn('fields')}>
          <p className={cn('content')}>{meetup.content}</p>
        </div>
      </div>

      <MeetupRoute courseName={meetup.courseName} path={meetup.path} />

      <div className={cn('join-bar')}>
        <div>
          <button className={cn('bookmark-btn')} aria-label="모임 북마크 버튼">
            {/* TODO: active */}
            <HiOutlineBookmark />
          </button>
          <p>{dayjs(meetup.dueDate).format(DATE_FORMAT)} 모집 마감</p>
        </div>
        <button className={cn('join-btn')} aria-label="모임 참가 버튼">
          참가하기
        </button>
      </div>
    </div>
  );
};

export default Meetup;
