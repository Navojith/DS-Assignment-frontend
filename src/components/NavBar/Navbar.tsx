import { Link, useLocation } from "react-router-dom";
import routes from "../../routes/route.json";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import user from "../../assets/user .png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("access_token")) {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  return (
    <div className="navbar bg-primaryLighter border-b-2 border-b-secondary">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primaryLighter rounded-box w-52"
          >
            <li>
              <Link
                to={"/"}
                className={
                  location.pathname === "/" ? "text-secondary" : "text-text"
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={routes.COURSE.route}
                className={
                  location.pathname === "" ? "text-secondary" : "text-text"
                }
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to={routes.MY_COURSES.route}
                className={
                  location.pathname === "" ? "text-secondary" : "text-text"
                }
              >
                My Courses
              </Link>
            </li>
          </ul>
        </div>
        {/* placeholder name. change it if you got a better one */}
        <Link to="./" className="btn btn-ghost text-xl">
          CourseRealm
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 bg-primaryLighter">
          <li>
            <Link to={"./"}>Home</Link>
          </li>
          <li>
            <Link to={routes.COURSE.route}>Courses</Link>
          </li>
          <li>
            <Link to={routes.MY_COURSES.route}>My Courses</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {isLoggedIn ? (
          <Link to={routes.ACCOUNT.route} className="btn">
            <img src={user} alt="user" className="h-6 w-6" />
          </Link>
        ) : (
          <Link to={routes.LOGIN.route} className="btn">
            LogIn
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
