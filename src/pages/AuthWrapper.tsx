import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';
import { LOGIN, ROOT } from '../routes/route.json';
import Home from './Home/Home';

const AuthWrapper = () => {
  const { user, isLoading } = useAuthentication();
  const { pathname } = useLocation();
  console.log(pathname);
  if (isLoading) {
    // return <PageLoadingAnimation />;
    return 'loading';
  } else if (user === null) {
    if (pathname === `${ROOT.route}`) {
      return <Home />;
    } else {
      return <Navigate to={`${LOGIN.route}`} replace />;
    }
  } else {
    if (pathname === `${LOGIN.route}`) {
      return <Navigate to={`${ROOT.route}`} replace />;
    } else {
      return <Outlet />;
    }
  }
};

export default AuthWrapper;
