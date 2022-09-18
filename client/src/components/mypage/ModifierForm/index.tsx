import React, { ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './ModifierForm.module.scss';
import { userProfileState } from 'states/auth';
import { UserProfile } from 'types/auth';
import { toastMessageState } from 'states/common';
import Button from 'components/common/Button';
import TextArea from 'components/common/TextArea';
import ErrorMessage from 'components/common/ErrorMessage';
import SelectButton from 'components/common/SelectButton';
import { getModifierFormFieldErrorMessage } from 'utils/getErrorMessage';
import { BICYCLE_TYPES, RIDING_SKILL_OPTIONS } from 'utils/constants';
import { Option, BicycleType, RidingSkill } from 'types/common';
import { USER_DEFAULT_IMAGE } from 'utils/urls';
import { joyrideAxios as axios } from '../../../apis/axios';

const cn = classNames.bind(styles);

interface ModifierForm {
  image: string;
  profileImgUrl?: FileList;
  nickname: string;
  Bicyclecareer: number;
  bicycleType: string;
  introduce: string;
}

const ModifierForm = () => {
  const userProfile = useRecoilValue(userProfileState) as UserProfile;
  const navigate = useNavigate();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<ModifierForm>({
    defaultValues: {
      nickname: `${userProfile.nickname}`,
      Bicyclecareer: userProfile.ridingSkill,
      bicycleType: `${userProfile.bicycleType}`,
      introduce: '',
    },
  });

  const imgFile = watch('profileImgUrl');
  const imgURL = imgFile?.length
    ? URL.createObjectURL(imgFile[0])
    : userProfile.profileImgUrl;

  const onSubmit: SubmitHandler<ModifierForm> = data => {
    const imgData = new FormData();
    if (imgFile?.length) {
      imgData.append('profile-img', imgFile[0]);
    }

    let newProfile = { ...data };
    delete newProfile.profileImgUrl;
    console.log(newProfile);

    axios
      .patch('/users/profile-img', imgData)
      .then(response => console.log(response)) // 성공 핸들링
      .catch(error => console.log(error));

    axios
      .patch('/users/profile', JSON.stringify(newProfile), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => console.log(response)) // 성공 핸들링
      .catch(error => console.log(error));
  };

  const handleUserDelete = () => {
    console.log('탈퇴 하시겠습니까?');
  };

  return (
    <>
      <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cn('img-container')}>
          <img
            className={cn('img-wrapper')}
            src={imgURL}
            alt={userProfile.nickname}
          />
          <input
            type="file"
            id={cn('img')}
            accept="image/*"
            {...register('profileImgUrl')}
          />
          <label htmlFor={cn('img')}>편집</label>
        </div>
        <div className={cn('fields')}>
          <div className={cn('field')}>
            <h3 className={cn('label')}>닉네임</h3>
            <Controller
              control={control}
              name="nickname"
              rules={{ required: true }}
              render={({ field }) => (
                <TextArea placeholder="닉네임을 입력하세요." {...field} />
              )}
            />
            {errors.nickname && (
              <ErrorMessage
                message={getModifierFormFieldErrorMessage(
                  'nickname',
                  errors.nickname.type
                )}
              />
            )}
          </div>
          <div className={cn('field')}>
            <h3 className={cn('label')}>자전거 종류</h3>
            <ul className={cn('options')}>
              <Controller
                control={control}
                name="bicycleType"
                rules={{ required: true }}
                render={({ field: { value, ...others } }) => (
                  <>
                    {BICYCLE_TYPES.map((bicycleType: BicycleType) => (
                      <li key={bicycleType} className={cn('col')}>
                        <SelectButton
                          type="radio"
                          value={bicycleType}
                          content={bicycleType}
                          isSelected={value === bicycleType}
                          {...others}
                        />
                      </li>
                    ))}
                  </>
                )}
              />
              {errors.bicycleType && (
                <ErrorMessage
                  message={getModifierFormFieldErrorMessage(
                    'bicycleType',
                    errors.bicycleType.type
                  )}
                />
              )}
            </ul>
          </div>
          <div className={cn('field')}>
            <h3 className={cn('label')}>자전거 실력</h3>
            <ul className={cn('row')}>
              <Controller
                control={control}
                name="Bicyclecareer"
                rules={{ required: true }}
                render={({ field: { value, ...others } }) => (
                  <>
                    {RIDING_SKILL_OPTIONS.map((option: Option<RidingSkill>) => (
                      <li key={option.value} className={cn('col')}>
                        <SelectButton
                          type="radio"
                          size="md"
                          value={option.value}
                          content={option.content}
                          isSelected={Number(value) === option.value}
                          {...others}
                        />
                      </li>
                    ))}
                  </>
                )}
              />
              {errors.Bicyclecareer && (
                <ErrorMessage
                  message={getModifierFormFieldErrorMessage(
                    'Bicyclecareer',
                    errors.Bicyclecareer.type
                  )}
                />
              )}
            </ul>
          </div>
          <div className={cn('field', 'introduce')}>
            <h3 className={cn('label')}>상태 메세지</h3>
            <Controller
              control={control}
              name="introduce"
              rules={{ required: false }}
              render={({ field }) => (
                <TextArea
                  placeholder="상태 메세지를 입력하세요(선택)"
                  {...field}
                />
              )}
            />
            {errors.introduce && (
              <ErrorMessage
                message={getModifierFormFieldErrorMessage(
                  'introduce',
                  errors.introduce.type
                )}
              />
            )}
          </div>
        </div>
        <div className={cn('btn')}>
          <Button
            type="submit"
            color="main"
            size="lg"
            content="수정 완료"
          ></Button>
        </div>
      </form>
      {/* <Link to="/delete_account" className={cn('link')}>
        회원 탈퇴
      </Link> */}
    </>
  );
};

export default ModifierForm;
