import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'states/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthRoute = () => {
  const { pathname } = useLocation();
  return useRecoilValue(isLoggedInState) ? (
    <Outlet />
  ) : (
    <Navigate to={`/login?next=${pathname}`} replace />
  );
};

export default AuthRoute;
