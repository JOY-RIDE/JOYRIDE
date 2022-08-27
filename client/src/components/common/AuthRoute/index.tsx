import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'states/auth';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () =>
  useRecoilValue(isLoggedInState) ? <Outlet /> : <Navigate to="/" />;
export default AuthRoute;
