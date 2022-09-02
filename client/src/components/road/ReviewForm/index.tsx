import styles from './ReviewForm.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from 'components/common/Button';

const cn = classNames.bind(styles);

interface Iform {
  content: string;
}

const ReviewForm = () => {
  const { register, handleSubmit, reset } = useForm<Iform>();
  const navigate = useNavigate();
  const onValid = (data: Iform) => {
    reset();
  };
  const handleConfirmClick = () => {
    console.log('submitted');
  };
  return (
    <form className={cn('form', 'menus')} onSubmit={handleSubmit(onValid)}>
      <input
        {...register('content', { required: true })}
        className={cn('input')}
        placeholder="리뷰를 적어보세요!"
      />
      <Button
        type="button"
        color="main"
        size="lg"
        content="확인"
        onClick={handleConfirmClick}
      ></Button>
    </form>
  );
};

export default ReviewForm;
