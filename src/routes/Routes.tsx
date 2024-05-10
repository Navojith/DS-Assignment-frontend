import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import Login from "../pages/Auth/Login";
import AuthWrapper from "../pages/AuthWrapper";
import Home from "../pages/Home/Home";
import Account from "../pages/Profile/Account";
import AddCourseContent from "../pages/addCourseContent/[id]";
import Course from "../pages/course/Course";
import CreateCourse from "../pages/createCourse/CreateCourse";
import MyCourses from "../pages/myCourses/MyCourses";
import SignUp from "../pages/Auth/Signup";
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

const AppRoutes = () => {
  const { user } = useAuthentication();

  return (
    <Routes>
      <Route path={ROOT.route} element={<AuthWrapper />}>
        <Route path={ACCOUNT.route} element={<Account />} />
        <Route path={COURSE.route} element={<Course />} />
        <Route path={ROOT.route} element={<Home />} />
        <Route path={MY_COURSES.route} element={<MyCourses />} />
        <Route path={CREATE_COURSE.route} element={<CreateCourse />} />
        <Route path={ADD_COURSE_CONTENT.route} element={<AddCourseContent />} />
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
