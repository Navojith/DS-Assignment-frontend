import { Outlet, useLocation } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';
import { ROOT, LOGIN } from '../routes/route.json';
import Home from './Home/Home';

const AuthWrapper = () => {
  const { user, isLoading } = useAuthentication();
  const { pathname } = useLocation();
  console.log(pathname);
  if (isLoading) {
    // return <PageLoadingAnimation />;
    return 'loading';
  } else if (!user) {
    if (pathname === `${ROOT.route}${LOGIN.route}`) {
      return <Outlet />;
    } else {
      return <Home />;
    }
  } else {
    return <Outlet />;
  }
};

export default AuthWrapper;
