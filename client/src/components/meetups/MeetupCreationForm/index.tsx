import { useForm } from 'react-hook-form';
import { CreatedMeetup } from 'types/meetup';
import styles from './MeetupCreator.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const MeetupCreationForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatedMeetup>({
    defaultValues: {
      pathDifficulty: 1,
      ridingSkill: 1,
      gender: null,
      ages: null,
      maxNumOfParticipants: 0,
      participationFee: 0,
    },
  });

  return <form className={cn('form')}>MeetupCreationForm</form>;
};

export default MeetupCreationForm;
