import styles from './Meetup.module.scss';
import classNames from 'classnames/bind';
import { meetupAPI } from 'apis/meetupAPI';
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
import { BicycleType } from 'types/common';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { toastMessageState } from 'states/common';
import { userIdState } from 'states/auth';
import MeetupJoinBar from 'components/meetup/MeetupJoinBar';
import MeetupParticipantList from 'components/meetup/MeetupParticipantList';
import { MeetupDetail } from 'types/meetup';
import Loading from 'components/common/Loading';

// const testPath = [
//   '안합',
//   '잠수교',
//   '한남 나들목',
//   '남산',
//   '사직공원',
//   '북악',
//   '홍제천',
//   '성산북단',
// ];

function getJoinBarProps(meetup: MeetupDetail, userId: number | null) {
  const DEFAULT_BAR_CONTENT =
    dayjs(meetup.dueDate).format(DATE_FORMAT) + ' 모집 마감';
  const DEFAULT_BUTTON_CONTENT = '참가하기';

  if (dayjs().isAfter(dayjs(meetup.dueDate)))
    return {
      disabled: true,
      barContent: '마감된 모임입니다',
      buttonContent: DEFAULT_BUTTON_CONTENT,
    };
  if (meetup.status === 0)
    return {
      disabled: true,
      barContent: '닫힌 모임입니다',
      buttonContent: DEFAULT_BUTTON_CONTENT,
    };

  if (
    meetup.participants.find(participant => participant.id === userId) ||
    meetup.admin.id === userId
  )
    return {
      disabled: true,
      barContent: DEFAULT_BAR_CONTENT,
      buttonContent: '참가중',
    };
  if (meetup.participants.length === meetup.maxPeople)
    return {
      disabled: true,
      barContent: DEFAULT_BAR_CONTENT,
      buttonContent: '인원 초과',
    };

  return {
    disabled: false,
    barContent: DEFAULT_BAR_CONTENT,
    buttonContent: DEFAULT_BUTTON_CONTENT,
  };
}

const cn = classNames.bind(styles);

const DATE_FORMAT = 'M월 D일 a h:mm';
dayjs.locale('ko');

const Meetup = () => {
  const { meetupId } = useParams();
  const userId = useRecoilValue(userIdState);
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { data: meetup } = useQuery<MeetupDetail>(
    ['meetup', Number(meetupId)],
    () => meetupAPI.getMeetupDetail(Number(meetupId)),
    {
      staleTime: 60 * 1000,
      onError: () => showToastMessage('로딩 중 문제가 발생했습니다.'),
    }
  );

  useEffect(() => {
    window.scrollY && window.scrollTo({ top: 0 });
  }, []); // TODO: 리스트 스크롤 위치 기억

  if (!meetup) return <Loading />;

  const imgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(255,255,255,0.9)), url(${meetup.meetingImgUrl})`,
  };
  console.log(meetup);
  return (
    <div className={cn('container')}>
      <div
        className={cn('img-wrapper', {
          default: meetup.meetingImgUrl === MEETUP_DEFAULT_IMAGE,
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

      <div className={cn('leader')}>
        <img
          className={cn('leader__avatar')}
          src={meetup.admin.profile_img_url}
          alt={meetup.admin.nickname}
        />
        <span className={cn('leader__nickname')}>{meetup.admin.nickname}</span>
        <span className={cn('leader__manner')}>{meetup.admin.manner}°C</span>
      </div>

      <section className={cn('fields-section')}>
        <div className={cn('fields')}>
          <div className={cn('field')}>
            <label className={cn('label')}>지역</label>
            <span className={cn('data', 'emphasized')}>
              {meetup.localLocation}
            </span>
          </div>

          <div className={cn('field')}>
            <label className={cn('label')}>집결지</label>
            <span className={cn('data', 'emphasized')}>
              {meetup.gatheringPlace}
            </span>
          </div>

          <div className={cn('field')}>
            <label className={cn('label')}>모임 일시</label>
            <span className={cn('data', 'emphasized')}>
              {dayjs(meetup.meetingDate).format(DATE_FORMAT)}
            </span>
          </div>

          <div className={cn('field')}>
            <label className={cn('label')}>인원</label>
            <div className={cn('data')}>
              <span className={cn('emphasized')}>{meetup.joinPeople}</span>/
              {meetup.maxPeople}명
            </div>
          </div>
        </div>

        <div className={cn('fields')}>
          <div className={cn('field')}>
            <label className={cn('label')}>코스 난이도</label>
            <span className={cn('data', 'emphasized')}>
              {stringifyMeetupPathDifficulty(meetup.pathDifficulty)}
            </span>
          </div>

          <div className={cn('field', 'bicycle-types')}>
            <label className={cn('label')}>자전거 종류</label>
            <ul className={cn('data')}>
              {meetup.bicycleTypes.map((type: BicycleType) => (
                <li key={type} className={cn('emphasized')}>
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={cn('fields')}>
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
      </section>

      <section className={cn('content-section')}>
        <p className={cn('content')}>{meetup.content}</p>
      </section>

      <h2 className={cn('subtitle')}>라이딩 코스</h2>
      <section className={cn('route-section')}>
        <MeetupRoute courseName={meetup.courseName} path={meetup.path} />
      </section>

      {/* TODO: 아이콘 설명 */}
      <section className={cn('map-section')}>
        <MeetupPathMap
          gatheringPlace={meetup.gatheringPlace}
          path={meetup.path}
        />
        <div className={cn('notice')}>
          <p>* 위 지도는 장소의 위치를 대략적으로 나타내고 있습니다.</p>
          <p>* 입력된 장소 이름에 따라 지도에 표시되지 않을 수 있습니다.</p>
        </div>
      </section>

      <section className={cn('participants-section')}>
        <h2 className={cn('subtitle')}>
          참가 멤버
          <div className={cn('subtitle__num')}>
            <span className={cn('current')}>{meetup.joinPeople}</span>/
            {meetup.maxPeople}
          </div>
        </h2>
        {!!meetup.joinPeople && (
          <MeetupParticipantList participants={meetup.participants} />
        )}
      </section>

      {/* <section className={cn('comments-section')}>
        <h2 className={cn('subtitle')}>
          댓글
          <span className={cn('subtitle__num')}>12</span>
        </h2>
      </section> */}

      <MeetupJoinBar {...getJoinBarProps(meetup, userId)} />
    </div>
  );
};

export default Meetup;
