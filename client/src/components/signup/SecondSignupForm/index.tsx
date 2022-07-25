import Button from 'components/common/Button';

interface SecondSignupFormProps {
  goPrevious: () => void;
}

const SecondSignupForm = ({ goPrevious }: SecondSignupFormProps) => {
  return (
    <Button
      type="button"
      color="white"
      size="md"
      text="이전"
      onClick={goPrevious}
    />
  );
};

export default SecondSignupForm;
