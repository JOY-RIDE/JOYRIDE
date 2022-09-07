import styles from './Meetup.module.scss';
import classNames from 'classnames/bind';
import { mockMeetupAPI } from 'apis/meetupAPI';
import { useParams } from 'react-router-dom';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import {
  stringifyGender,
  stringifyMeetupPathDifficulty,
  stringifyRidingSkill,
} from 'utils/stringify';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import MeetupRoute from 'components/meetup/MeetupRoute';
import MeetupPathMap from 'components/meetup/MeetupPathMap';
import { MEETUP_DEFAULT_IMAGE } from 'utils/urls';
import { useEffect } from 'react';

const testPath = [
  '안합',
  '잠수교',
  '한남 나들목',
  '남산',
  '사직공원',
  '북악',
  '홍제천',
  '성산북단',
];

dayjs.locale('ko');

const cn = classNames.bind(styles);
const DATE_FORMAT = 'M월 D일 a h:mm';

const Meetup = () => {
  const { meetupId } = useParams();
  // TODO: react query
  const meetup = mockMeetupAPI.getMeetupList()[Number(meetupId)];

  const imgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(255,255,255,0.9)), url(${meetup.image})`,
  };

  useEffect(() => {
    window.scrollY && window.scrollTo({ top: 0 });
  }, []); // TODO: 리스트 스크롤 위치 기억

  return (
    <div className={cn('container')}>
      <div
        className={cn('img-wrapper', {
          default: meetup.image === MEETUP_DEFAULT_IMAGE,
        })}
        style={imgStyle}
      />

      <div className={cn('title-wrapper')}>
        <h1 className={cn('title')}>{meetup.title}</h1>
        <button className={cn('bookmark-btn')} aria-label="모임 북마크 버튼">
          {/* TODO: active */}
          <BsBookmark />
          {/* <BsBookmarkFill/> */}
        </button>
      </div>

      {/* TODO: 모임장 */}

      <section className={cn('fields-section')}>
        <div className={cn('fields')}>
          <div className={cn('field')}>
            <label className={cn('label')}>모집 마감 일시</label>
            <span className={cn('data')}>
              {dayjs(meetup.dueDate).format(DATE_FORMAT)}
            </span>
          </div>

          <div className={cn('field')}>
            <label className={cn('label')}>모임 일시</label>
            <span className={cn('data')}>
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

          <div className={cn('field')}>
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
                {meetup.participationFee.toLocaleString()}
              </span>
              원
            </div>
          </div>
        </div>

        <p className={cn('content')}>{meetup.content}</p>
      </section>

      <section className={cn('route-section')}>
        <MeetupRoute courseName={meetup.courseName} path={meetup.path} />
      </section>

      <section className={cn('map-section')}>
        <MeetupPathMap path={testPath} />
        <p className={cn('notice')}>
          위 지도는 장소의 위치를 대략적으로 나타내고 있습니다.
        </p>
      </section>

      {/* TODO */}
      <section className={cn('participants-section')}>
        <h2 className={cn('subtitle')}>
          참여 중인 인원
          <div className={cn('subtitle__num')}>
            <span className={cn('current')}>{meetup.participants.length}</span>/
            {meetup.maxNumOfParticipants}
          </div>
        </h2>
      </section>

      <section className={cn('comments-section')}>
        <h2 className={cn('subtitle')}>
          댓글
          <span className={cn('subtitle__num')}>12</span>
        </h2>
      </section>

      <div className={cn('join-bar')}>
        <div>
          <button className={cn('bookmark-btn')} aria-label="모임 북마크 버튼">
            {/* TODO: active */}
            <BsBookmark />
            {/* <BsBookmarkFill/> */}
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
