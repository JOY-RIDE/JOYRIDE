import { FormEvent, useEffect } from 'react';
import { useSignupStep } from 'routes/Signup';
import { useCheckBox } from 'hooks/useCheckBox';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/atoms';
import { FormControlLabel } from '@mui/material';
import CheckBox from 'components/common/CheckBox';
import { privacyTerm, serviceTerm } from './terms';
import Button from 'components/common/Button';
import styles from './SignupTerms.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

// TODO: react hook form
const SignupTerms = () => {
  const [
    isServiceTermAgreed,
    setIsServiceTermAgreed,
    toggleIsServiceTermAgreed,
  ] = useCheckBox();
  const [
    isPrivacyTermAgreed,
    setIsPrivacyTermAgreed,
    toggleIsPrivacyTermAgreed,
  ] = useCheckBox();
  const [areAllTermsAgreed, , toggleAreAllTermsAgreed] = useCheckBox();

  useEffect(() => {
    if (areAllTermsAgreed) {
      setIsServiceTermAgreed(true);
      setIsPrivacyTermAgreed(true);
    } else {
      setIsServiceTermAgreed(false);
      setIsPrivacyTermAgreed(false);
    }
  }, [areAllTermsAgreed]);

  const { increaseStep } = useSignupStep();
  const showToastMessage = useSetRecoilState(toastMessageState);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(isServiceTermAgreed && isPrivacyTermAgreed)) {
      showToastMessage('약관 동의가 필요합니다');
      return;
    }

    increaseStep();
  };

  // TODO: 디자인
  return (
    <form className={cn('form')} onSubmit={handleSubmit}>
      <FormControlLabel
        control={<CheckBox onChange={toggleAreAllTermsAgreed} />}
        label="전체 동의"
        sx={{
          '& .MuiTypography-root': {
            fontWeight: 700,
          },
        }}
      />

      <div className={cn('field')}>
        <FormControlLabel
          control={
            <CheckBox
              isChecked={isServiceTermAgreed}
              onChange={toggleIsServiceTermAgreed}
            />
          }
          label="이용약관에 동의합니다."
        />
        <textarea
          className={cn('term')}
          rows={8}
          defaultValue={serviceTerm}
          readOnly
        />
      </div>

      <div className={cn('field')}>
        <FormControlLabel
          control={
            <CheckBox
              isChecked={isPrivacyTermAgreed}
              onChange={toggleIsPrivacyTermAgreed}
            />
          }
          label="개인정보처리방침에 동의합니다."
        />
        <textarea
          className={cn('term')}
          rows={8}
          defaultValue={privacyTerm}
          readOnly
        />
      </div>

      <div className={cn('btn')}>
        <Button color="main" size="lg" text="확인" />
      </div>
    </form>
  );
};

export default SignupTerms;
