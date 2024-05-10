import { Navigate, Route, Routes } from 'react-router-dom';
import { ROOT, ACCOUNT, LOGIN, COURSE, MY_COURSES } from './route.json';
import Account from '../pages/profile/Account';
import AuthWrapper from '../pages/AuthWrapper';
import { useAuthentication } from '../hooks/useAuthentication';
import Login from '../pages/auth/Login';
import Home from '../pages/home/Home';
import Course from '../pages/course/Course';
import MyCourses from '../pages/myCourses/MyCourses';
import IndividualCourse from '../pages/course/IndividualCourse/IndividualCourse';

const AppRoutes = () => {
  const { user } = useAuthentication();

  return (
    <Routes>
      <Route path={ROOT.route} element={<AuthWrapper />}>
        <Route path={ACCOUNT.route} element={<Account />} />
        <Route path={COURSE.route}>
          <Route
            path={COURSE.subRoutes.courseId}
            element={<IndividualCourse />}
          />
          <Route path={''} element={<Course />} />
        </Route>
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
