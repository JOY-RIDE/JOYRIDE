import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'states/auth';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default AuthRoute;
