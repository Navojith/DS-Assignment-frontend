import { Navigate, Route, Routes } from 'react-router-dom';
import { ROOT, ACCOUNT, LOGIN, COURSE, MY_COURSES } from './route.json';
import Account from '../pages/profile/Account';
import AuthWrapper from '../pages/AuthWrapper';
import { useAuthentication } from '../hooks/useAuthentication';
import Login from '../pages/auth/Login';
import Home from '../pages/home/Home';
import Course from '../pages/course/Course';
import MyCourses from '../pages/myCourses/MyCourses';

const AppRoutes = () => {
  const { user } = useAuthentication();

  return (
    <Routes>
      <Route path={ROOT.route} element={<AuthWrapper />}>
        <Route path={ACCOUNT.route} element={<Account />} />
        <Route path={COURSE.route} element={<Course />} />
        <Route path={ROOT.route} element={<Home />} />
        <Route path={MY_COURSES.route} element={<MyCourses />} />
      </Route>
      <Route
        path={LOGIN.route}
        element={user ? <Navigate to={ROOT.route} replace /> : <Login />}
      />
    </Routes>
  );
};

export default AppRoutes;
