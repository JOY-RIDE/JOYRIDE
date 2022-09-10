import PageTitle from 'components/common/PageTitle';
import { meetupAPI } from 'apis/meetupAPI';
import MeetupList from 'components/meetups/MeetupList';
import styles from './Meetups.module.scss';
import classNames from 'classnames/bind';
import MeetupFilterChoices from 'components/meetups/MeetupFilterChoices';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { meetupFiltersState, meetupOrderState } from 'states/meetup';
import { useEffect } from 'react';
import MeetupFilterBoard from 'components/meetups/MeetupFilterBoard';
import ContentToggleButton from 'components/common/ContentToggleButton';
import { MEETUP_ORDER_OPTIONS } from 'utils/constants';
import OrderList from 'components/meetups/OrderList';
import { getMeetupsOrderedBy } from 'utils/order';
import MeetupCreator from 'components/meetups/MeetupCreator';
import { userIdState } from 'states/auth';
import { useQuery } from '@tanstack/react-query';
import Loading from 'components/common/Loading';
import { toastMessageState } from 'states/common';
import { MeetupData } from 'types/meetup';

const cn = classNames.bind(styles);

// TODO: pagination, 렌더링 확인
const Meetups = () => {
  const userId = useRecoilValue(userIdState);
  const order = useRecoilValue(meetupOrderState);
  const filters = useRecoilValue(meetupFiltersState);
  const showToastMessage = useSetRecoilState(toastMessageState);
  const {
    data: meetups,
    isLoading,
    status,
  } = useQuery(['meetups'], meetupAPI.getMeetupList, {
    onError: () => showToastMessage('로딩 중 문제가 발생했습니다.'),
  });

  const resetFilters = useResetRecoilState(meetupFiltersState);
  const resetOrder = useResetRecoilState(meetupOrderState);
  useEffect(() => resetFilters, []);
  useEffect(() => resetOrder, []);

  return (
    <div>
      <header className={cn('header')}>
        <PageTitle size="md">자전거 모임</PageTitle>
        {userId && <MeetupCreator />}
      </header>

      <div className={cn('filter-order')}>
        {/* @ts-ignore */}
        <ContentToggleButton title="필터" Content={<MeetupFilterBoard />} />
        <ContentToggleButton
          title={order.content}
          Content={
            <OrderList
              options={MEETUP_ORDER_OPTIONS}
              // TODO
              // @ts-ignore
              recoilState={meetupOrderState}
            />
          }
        />
      </div>
      <MeetupFilterChoices />

      <div className={cn('meetups-wrapper')}>
        {isLoading ? (
          <Loading />
        ) : (
          // TODO: order 디폴트 null?
          <MeetupList
            meetups={getMeetupsOrderedBy(order.name, meetups as MeetupData[])}
          />
        )}
      </div>
    </div>
  );
};

export default Meetups;
