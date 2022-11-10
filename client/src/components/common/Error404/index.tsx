import styles from './Error404.module.scss';
import classNames from 'classnames/bind';
import { TbFaceIdError } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const cn = classNames.bind(styles);

const Error404 = () => {
  const navigate = useNavigate();
  const handleGoClick = () => navigate('/');
  return (
    <section className={cn('wrapper')}>
      <TbFaceIdError />
      <h1 className={cn('title')}>존재하지 않는 페이지입니다.</h1>
      <Button
        type="button"
        color="main"
        size="md"
        content="메인으로 이동"
        onClick={handleGoClick}
      />
    </section>
  );
};

export default Error404;
