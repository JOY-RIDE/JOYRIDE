type SignupFormField =
  | 'email'
  | 'password'
  | 'passwordConfirm'
  | 'nickname'
  | 'birthYear'
  | 'bicycleType';
export function getSignupFormFieldErrorMessage(
  field: SignupFormField,
  errorType: string
) {
  switch (field) {
    case 'email': {
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        case 'duplicated':
          return '이미 등록된 이메일입니다';
        case 'etc':
          return '이메일 중복 확인 중 문제가 발생했습니다';
        default:
          throw new Error();
      }
    }

    case 'password': {
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        case 'minLength':
          return '8자 이상이어야 합니다';
        case 'maxLength':
          return '16자를 초과하였습니다';
        case 'pattern':
          return '영문 대/소문자, 숫자, 특수문자를 포함해야 합니다';
        default:
          throw new Error();
      }
    }

    case 'passwordConfirm': {
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        case 'validate':
          return '동일한 비밀번호를 입력해 주세요';
        default:
          throw new Error();
      }
    }

    case 'nickname': {
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        case 'maxLength':
          return '10자를 초과하였습니다';
        case 'duplicated':
          return '이미 등록된 닉네임입니다';
        case 'etc':
          return '닉네임 중복 확인 중 문제가 발생했습니다';
        default:
          throw new Error();
      }
    }

    case 'birthYear': {
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        case 'min':
        case 'max':
          return '올바른 네자리 년도를 입력해 주세요';
        default:
          throw new Error();
      }
    }

    case 'bicycleType': {
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        default:
          throw new Error();
      }
    }

    default:
      throw new Error();
  }
}

type ReviewFormField =
  | 'total'
  | 'view'
  | 'facility'
  | 'accessibility'
  | 'safety'
  | 'viewRating'
  | 'facilityRating'
  | 'accessibilityRating'
  | 'safetyRating';
export function getReviewFormFieldErrorMessage(
  field: ReviewFormField,
  errorType: string
) {
  switch (field) {
    case 'total': {
      switch (errorType) {
        case 'required':
          return '총평은 필수 항목입니다';
        default:
          throw new Error();
      }
    }

    default:
      throw new Error();
  }
}

type MeetupCreationFormField =
  | 'title'
  | 'meetingDate'
  | 'dueDate'
  | 'gatheringPlace'
  | 'path'
  | 'birthYear'
  | 'bicycleTypes'
  | 'maxNumOfParticipants'
  | 'participationFee'
  | 'content';
export function getMeetupCreationFormFieldErrorMessage(
  field: MeetupCreationFormField,
  errorType: string
) {
  switch (field) {
    case 'title':
    case 'dueDate':
    case 'gatheringPlace':
    case 'content': {
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        default:
          throw new Error();
      }
    }

    case 'meetingDate':
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        case 'validate':
          return '모임 일시가 모집 마감 일시 이후인지 다시 확인해 주세요';
        default:
          throw new Error();
      }

    case 'path': {
      switch (errorType) {
        case 'validate':
          return '최소 출발지와 종료지를 등록해야 합니다';
        default:
          throw new Error();
      }
    }

    case 'birthYear': {
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        case 'min':
          return '년도를 다시 확인해 주세요';
        default:
          throw new Error();
      }
    }

    case 'bicycleTypes': {
      switch (errorType) {
        case 'validate':
          return '필수 항목입니다';
        default:
          throw new Error();
      }
    }

    case 'maxNumOfParticipants': {
      switch (errorType) {
        case 'min':
          return '최소 1명 이상이어야 합니다';
        case 'max':
          return '최대 99명까지 가능합니다';
        default:
          throw new Error();
      }
    }

    case 'participationFee': {
      switch (errorType) {
        case 'min':
          return '최소 0원 이상이어야 합니다';
        default:
          throw new Error();
      }
    }

    default:
      throw new Error();
  }
}

type ModifierFormField =
  | 'image'
  | 'nickname'
  | 'gender'
  | 'birthYear'
  | 'bicycleCareer'
  | 'bicycleType'
  | 'introduce';
export function getModifierFormFieldErrorMessage(
  field: ModifierFormField,
  errorType: string
) {
  switch (field) {
    case 'image': {
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        case 'validate':
          return '파일 형식을 확인해주세요.';
        default:
          throw new Error();
      }
    }

    case 'nickname': {
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        case 'maxLength':
          return '10자를 초과하였습니다';
        case 'duplicated':
          return '이미 등록된 닉네임입니다';
        case 'etc':
          return '닉네임 중복 확인 중 문제가 발생했습니다';
        default:
          throw new Error();
      }
    }

    case 'gender': {
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        default:
          throw new Error();
      }
    }

    case 'birthYear': {
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        case 'min':
        case 'max':
          return '올바른 네자리 년도를 입력해 주세요';
        default:
          throw new Error();
      }
    }

    case 'bicycleCareer': {
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        default:
          throw new Error();
      }
    }

    case 'bicycleType': {
      switch (errorType) {
        case 'required':
          return '필수 항목입니다';
        default:
          throw new Error();
      }
    }

    default:
      throw new Error();
  }
}
