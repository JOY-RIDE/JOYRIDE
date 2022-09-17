import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { fetchCoursesFromServer } from 'apis/coursesAPI';
import { fetchMeetups } from 'apis/meetupAPI';
import { ServerIRoads } from 'types/course';
import { MeetupData } from 'types/meetup';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiHeart } from 'react-icons/hi';
import { FiPlusCircle } from 'react-icons/fi';
import { TbMoodEmpty } from 'react-icons/tb';
import Empty from 'components/mypage/Empty';
import ItemList from 'components/mypage/ItemList';
import SearchedCourseItem from 'components/search/SearchedCourseItem';
import SearchedMeetupItem from 'components/search/SearchedMeetupItem/SearchedMeetupItem';

const cn = classNames.bind(styles);

interface Iform {
  keyword: string;
}

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  const { register, handleSubmit, reset } = useForm<Iform>();
  const navigate = useNavigate();
  const onValid = (data: Iform) => {
    navigate(`/search?keyword=${data.keyword}`);
    reset();
  };

  const { isLoading: isCourseLoading, data: courseData } = useQuery<
    ServerIRoads[]
  >(['searchCourses'], fetchCoursesFromServer);
  const { isLoading: isMeetupLoading, data: meetupData } = useQuery<
    MeetupData[]
  >(['searchMeetups'], fetchMeetups);

  const courses = courseData?.filter(
    course =>
      course.sigun.includes(keyword!) || course.crsKorNm.includes(keyword!)
  );
  const meetups = meetupData?.filter(
    meetup =>
      meetup.title.includes(keyword!) ||
      meetup.path.includes(keyword!) ||
      meetup.courseName?.includes(keyword!) ||
      meetup.content.includes(keyword!)
  );

  console.log(courses);
  console.log(meetups);

  return (
    <div className={styles.container}>
      <form className={cn('form', 'menus')} onSubmit={handleSubmit(onValid)}>
        <input
          {...register('keyword', { required: true })}
          className={cn('input')}
          placeholder="궁금한 내용을 검색해 보세요!"
          defaultValue={keyword!}
        />
        <button type="submit" className={cn('icon')}>
          <AiOutlineSearch />
        </button>
      </form>
      <section className={cn('section')}>
        <h3 className={cn('title')}>
          코스 검색결과 <span>{courses?.length}</span>
        </h3>
        {courses?.length ? (
          <ItemList items={courses} ItemComponent={SearchedCourseItem} />
        ) : (
          <Empty
            Icon={<TbMoodEmpty />}
            content={`'${keyword}'에 대한 코스 검색 결과가 없습니다.`}
          />
        )}
      </section>
      <section className={cn('section')}>
        <h3 className={cn('title')}>
          모임 검색결과 <span>{meetups?.length}</span>
        </h3>
        {meetups?.length ? (
          <ItemList items={meetups} ItemComponent={SearchedMeetupItem} />
        ) : (
          <Empty
            Icon={<TbMoodEmpty />}
            content={`'${keyword}'에 대한 모임 검색 결과가 없습니다.`}
          />
        )}
      </section>
    </div>
  );
};

export default Search;
