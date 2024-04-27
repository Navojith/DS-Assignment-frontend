import { Navigate, Route, Routes } from 'react-router-dom';
import { ROOT, ACCOUNT, LOGIN } from './route.json';
import Account from '../pages/Profile/Account';
import AuthWrapper from '../pages/AuthWrapper';
import { useAuthentication } from '../hooks/useAuthentication';
import Login from '../pages/Auth/Login';
import Home from '../pages/Home/Home';

const AppRoutes = () => {
  const { user } = useAuthentication();

  return (
    <Routes>
      <Route path={ROOT.route} element={<AuthWrapper />}>
        <Route path={ACCOUNT.route} element={<Account />} />
        <Route path={ROOT.route} element={<Home />} />
      </Route>
      <Route
        path={LOGIN.route}
        element={user ? <Navigate to={ROOT.route} replace /> : <Login />}
      />
    </Routes>
  );
};

export default AppRoutes;
