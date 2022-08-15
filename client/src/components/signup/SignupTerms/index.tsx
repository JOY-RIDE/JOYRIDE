import { FormEvent, useEffect } from 'react';
import { useCheckBox } from 'hooks/useCheckBox';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/atoms';
import { useSignupStepControls } from 'routes/Signup';
import { FormControlLabel } from '@mui/material';
import CheckBox from 'components/common/CheckBox';
import TextArea from 'components/common/TextArea';
import { privacyTerm, serviceTerm } from './terms';
import Button from 'components/common/Button';
import styles from './SignupTerms.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

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

  const showToastMessage = useSetRecoilState(toastMessageState);
  const { increaseStep } = useSignupStepControls();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(isServiceTermAgreed && isPrivacyTermAgreed)) {
      showToastMessage('약관 동의가 필요합니다');
      return;
    }

    increaseStep();
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit}>
      <div className={cn('agree-all')}>
        <FormControlLabel
          control={<CheckBox onChange={toggleAreAllTermsAgreed} isCircle />}
          label="모두 동의합니다."
          sx={{
            '& .MuiTypography-root': {
              fontWeight: 700,
              fontSize: '2rem',
            },
          }}
        />
      </div>

      <div className={cn('terms')}>
        <div className={cn('term')}>
          <FormControlLabel
            control={
              <CheckBox
                isChecked={isServiceTermAgreed}
                isCircle
                onChange={toggleIsServiceTermAgreed}
              />
            }
            label="이용약관 (필수)"
          />
          <TextArea defaultText={serviceTerm} readOnly />
        </div>

        <div className={cn('term')}>
          <FormControlLabel
            control={
              <CheckBox
                isChecked={isPrivacyTermAgreed}
                isCircle
                onChange={toggleIsPrivacyTermAgreed}
              />
            }
            label="개인정보처리방침 (필수)"
          />
          <TextArea defaultText={privacyTerm} readOnly />
        </div>
      </div>

      <div className={cn('btn')}>
        <Button color="main" size="lg" text="확인" />
      </div>
    </form>
  );
};

export default SignupTerms;
