import PageTitle from 'components/common/PageTitle';
import { BiPlusCircle } from 'react-icons/bi';
import styles from './Meetups.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Meetups = () => (
  <div>
    <header className={cn('header')}>
      <PageTitle size="md">자전거 모임</PageTitle>
      <button className={cn('create-btn')}>
        <BiPlusCircle />
        <span>모임 만들기</span>
      </button>
    </header>
  </div>
);

export default Meetups;
