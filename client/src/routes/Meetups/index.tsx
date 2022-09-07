import PageTitle from 'components/common/PageTitle';
import { mockMeetupAPI } from 'apis/meetupAPI';
import MeetupList from 'components/meetups/MeetupList';
import styles from './Meetups.module.scss';
import classNames from 'classnames/bind';
import MeetupFilterChoices from 'components/meetups/MeetupFilterChoices';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { meetupFiltersState, meetupOrderState } from 'states/meetup';
import { useEffect, useState } from 'react';
import MeetupFilterBoard from 'components/meetups/MeetupFilterBoard';
import ContentToggleButton from 'components/common/ContentToggleButton';
import { MEETUP_ORDER_OPTIONS } from 'utils/constants';
import OrderList from 'components/meetups/OrderList';
import { getMeetupsOrderedBy } from 'utils/order';
import MeetupCreator from 'components/meetups/MeetupCreator';
import { userIdState } from 'states/auth';

const cn = classNames.bind(styles);

// TODO: react query, pagination
const Meetups = () => {
  const userId = useRecoilValue(userIdState);
  // temp
  const [meetups, setMeetups] = useState(mockMeetupAPI.getMeetupList());
  const order = useRecoilValue(meetupOrderState);
  useEffect(
    () => setMeetups(meetups => getMeetupsOrderedBy(order.name, meetups)),
    [order.name]
  );

  const resetFilters = useResetRecoilState(meetupFiltersState);
  const resetOrder = useResetRecoilState(meetupOrderState);
  useEffect(() => resetFilters, []);
  useEffect(() => resetOrder, []);

  return (
    <div>
      <header className={cn('header')}>
        <PageTitle size="md">자전거 모임</PageTitle>
        <MeetupCreator />
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
        <MeetupList meetups={meetups} />
      </div>
    </div>
  );
};

export default Meetups;
