import background from "../../assets/e-learning/background.png";
import mobile from "../../assets/e-learning/mobileback.png";
import { Link } from "react-router-dom";
import routes from "../../routes/route.json";

const Home = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]*)/;
    console.log("useEffect");
    const isMatch = window.location.href.match(accessTokenRegex);
    console.log(isMatch);

    if (isMatch) {
      const accessToken = isMatch[1];
      Cookies.set("access_token", accessToken);
      fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken,
        },
        // body: JSON.stringify({ accessToken }),
      });

      setIsLoggedin(true);
    }
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="px-5 xl:px-0 max-w-3xl lg:max-w-5xl xl:max-w-5xl w-full mx-auto relative">
        <div className="flex justify-start items-end my-5 xl:my-20">
          <div className="md:max-w-[400px] flex flex-col gap-6 my-14">
            <div>
              <h1 className="text-[#1d2259] xl:text-[52px] text-[40px] font-extrabold leading-[50px]">
                Maximize skill, minimize budget
              </h1>
            </div>
            <div>
              <p className="text-[#83869a]">
                Our modern courses across a range of in-demand skills will give
                you the knowledge you need to live the life you want.
              </p>
            </div>
            <div>
              <Link to={routes.COURSE.route}>
                <button className="py-3 px-7 text-white font-bold bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl group relative overflow-hidden">
                  Explore Courses
                  <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
                </button>
              </Link>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:-right-32 md:left-auto xl:-right-80 xl:-top-20 md:-top-5 lg:-right-28 lg:-top-14 ">
            <img
              src={background}
              alt=""
              className="relative md:max-w-[500px] lg:max-w-[600px] xl:max-w-[650px] hidden md:block"
            />
            <img
              src={mobile}
              alt="mobileback"
              className="relative -bottom-72 md:hidden block max-w-[343px] sm:max-w-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
