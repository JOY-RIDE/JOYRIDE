import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'states/atoms';
import { Navigate } from 'react-router-dom';

const UserOnly = ({ children }: { children: ReactElement }) => {
  const user = useRecoilValue(userState);
  return user ? children : <Navigate to="/" />;
};

export default UserOnly;
