import PageTitle from 'components/common/PageTitle';
import { meetupAPI } from 'apis/meetupAPI';
import MeetupList from 'components/meetups/MeetupList';
import styles from './Meetups.module.scss';
import classNames from 'classnames/bind';
import MeetupFilterChoices from 'components/meetups/MeetupFilterChoices';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { meetupFiltersState, meetupOrderState } from 'states/meetup';
import { useEffect, useRef, useState } from 'react';
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
import Pagination from 'components/meetups/Pagination';
import NoResults from 'components/common/NoResults';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { mapValues } from 'lodash';
import QueryString from 'qs';

const cn = classNames.bind(styles);

const ITEMS_LIMIT = 6;

// TODO: 렌더링 확인
const Meetups = () => {
  const isMounted = useRef(false);
  const userId = useRecoilValue(userIdState);
  const [page, setPage] = useState(1);
  // const [page, setPage] = useState(
  //   Number(useSearchParams()[0].get('page')) || 1
  // );
  const itemsOffset = ITEMS_LIMIT * (page - 1);

  // TODO: useState로
  const order = useRecoilValue(meetupOrderState);
  const filters = useRecoilValue(meetupFiltersState);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const filtersWithValueOnly = mapValues(filters, 'value');
    if (!filtersWithValueOnly['minNumOfParticipants'])
      delete filtersWithValueOnly['minNumOfParticipants'];
    if (!filtersWithValueOnly['maxNumOfParticipants'])
      delete filtersWithValueOnly['maxNumOfParticipants'];
    const query = QueryString.stringify(filtersWithValueOnly, {
      encode: false,
    });
    navigate(query && '?' + query);
  }, [filters]);

  const showToastMessage = useSetRecoilState(toastMessageState);
  const location = useLocation();
  const { data: meetups } = useQuery<MeetupData[]>(
    ['meetups', location.search],
    () => meetupAPI.getMeetupList(location.search),
    {
      // TODO: order 디폴트 null?
      select: meetups => getMeetupsOrderedBy(order.name, meetups),
      staleTime: 5 * 60 * 1000,
      // keepPreviousData: true,
      onError: () => showToastMessage('로딩 중 문제가 발생했습니다.'),
    }
  );

  useEffect(() => setPage(1), [filters, order.name]);
  useEffect(() => {
    window.scrollY && window.scrollTo({ top: 0 });
  }, [page]);

  const resetOrder = useResetRecoilState(meetupOrderState);
  const resetFilters = useResetRecoilState(meetupFiltersState);
  useEffect(() => resetOrder, []);
  useEffect(() => resetFilters, []);

  return (
    <div className={cn('container')}>
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
        {!meetups ? (
          <Loading />
        ) : meetups.length ? (
          <MeetupList
            meetups={meetups.slice(itemsOffset, itemsOffset + ITEMS_LIMIT)}
          />
        ) : (
          <NoResults />
        )}
      </div>

      {/* TODO: refactor */}
      {!!meetups?.length && (
        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          lastPage={Math.ceil(meetups.length / ITEMS_LIMIT)}
        />
      )}
    </div>
  );
};

export default Meetups;
