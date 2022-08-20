type SignupFormField =
  | 'email'
  | 'password'
  | 'passwordConfirm'
  | 'nickname'
  | 'message';
export function getSignupFormErrorMessage(
  field: SignupFormField,
  errorType: string
) {
  switch (field) {
    case 'email': {
      switch (errorType) {
        case 'required':
          return '이메일을 입력하세요';
        case 'pattern':
          return '이메일 형식이 올바르지 않습니다';
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
          return '비밀번호를 입력하세요';
        case 'minLength':
          return '8자 이상이어야 합니다';
        case 'pattern':
          return '~를 포함해야 합니다';
        default:
          throw new Error();
      }
    }

    case 'passwordConfirm': {
      switch (errorType) {
        case 'required':
          return '비밀번호를 확인해 주세요';
        case 'validate':
          return '동일한 비밀번호를 입력해 주세요';
        default:
          throw new Error();
      }
    }

    case 'nickname': {
      switch (errorType) {
        case 'required':
          return '닉네임을 입력하세요';
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

    case 'message': {
      switch (errorType) {
        case 'maxLength':
          return '30자를 초과하였습니다';
        default:
          throw new Error();
      }
    }

    default:
      throw new Error();
  }
}
