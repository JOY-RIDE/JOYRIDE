import { FormEvent, useEffect } from 'react';
import { useCheckBox } from 'hooks/common/useCheckBox';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import CheckBox from 'components/common/CheckBox';
import TextArea from 'components/common/TextArea';
import { privacyTerm, serviceTerm } from './terms';
import Button from 'components/common/Button';
import styles from './SignupTermsForm.module.scss';
import classNames from 'classnames/bind';
import { useSignupStepControls } from 'hooks/signup/useSignupStepControls';

const cn = classNames.bind(styles);

const SignupTermsForm = () => {
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
      showToastMessage('약관 동의가 필요합니다.');
      return;
    }
    increaseStep();
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit}>
      <div className={cn('agree-all', 'term-check')}>
        <CheckBox
          shape="circle"
          id={cn('all')}
          onChange={toggleAreAllTermsAgreed}
        />
        <label htmlFor={cn('all')}>모두 동의합니다.</label>
      </div>

      <div className={cn('terms')}>
        <div className={cn('term')}>
          <div className={cn('term-check')}>
            <CheckBox
              shape="circle"
              isChecked={isServiceTermAgreed}
              id={cn('first')}
              onChange={toggleIsServiceTermAgreed}
            />
            <label htmlFor={cn('first')}>이용약관 (필수)</label>
          </div>
          <TextArea defaultText={serviceTerm} readOnly />
        </div>

        <div className={cn('term')}>
          <div className={cn('term-check')}>
            <CheckBox
              shape="circle"
              isChecked={isPrivacyTermAgreed}
              id={cn('second')}
              onChange={toggleIsPrivacyTermAgreed}
            />
            <label htmlFor={cn('second')}>개인정보처리방침 (필수)</label>
          </div>
          <TextArea defaultText={privacyTerm} readOnly />
        </div>
      </div>

      <div className={cn('btn')}>
        <Button type="submit" color="main" size="lg" content="확인" />
      </div>
    </form>
  );
};

export default SignupTermsForm;
