import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import Login from "../pages/auth/Login";
import AuthWrapper from "../pages/AuthWrapper";
import Home from "../pages/home/Home";
import Account from "../pages/profile/Account";
import Course from "../pages/course/Course";
import IndividualCourse from "../pages/course/IndividualCourse/IndividualCourse";
import CourseContent from "../pages/courseContent/[id]";
import CreateCourse from "../pages/createCourse/CreateCourse";
import MyCourses from "../pages/myCourses/MyCourses";
import {
  ACCOUNT,
  ADD_COURSE_CONTENT,
  COURSE,
  CREATE_COURSE,
  LOGIN,
  MY_COURSES,
  ROOT,
  SIGNUP,
} from "./route.json";
import SignUp from "../pages/auth/Signup";

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
          <Route path={""} element={<Course />} />
        </Route>
        <Route path={ROOT.route} element={<Home />} />
        <Route path={MY_COURSES.route} element={<MyCourses />} />
        <Route path={CREATE_COURSE.route} element={<CreateCourse />} />
        <Route path={ADD_COURSE_CONTENT.route} element={<CourseContent />} />
      </Route>
      <Route
        path={LOGIN.route}
        // element={user ? <Navigate to={ROOT.route} replace /> : <Login />}
        element={<Login />}
      />
      <Route
        path={SIGNUP.route}
        // element={user ? <Navigate to={ROOT.route} replace /> : <Login />}
        element={<SignUp />}
      />
    </Routes>
  );
};

export default AppRoutes;
