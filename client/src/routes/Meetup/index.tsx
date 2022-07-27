import * as React from 'react';
import { useForm } from 'react-hook-form';

const Meetup = () => {
  const { watch, register, handleSubmit } = useForm({
    defaultValues: {
      eng: [],
    },
  });

  const onSubmit = (data: any) => console.log(data);
  console.log(watch('eng'));
  console.log({ ...register('eng') });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('eng')} type="checkbox" value="A" />
      <input {...register('eng')} type="checkbox" value="B" />
      <input {...register('eng')} type="checkbox" value="C" />
      <input type="submit" />
    </form>
  );
};

export default Meetup;
