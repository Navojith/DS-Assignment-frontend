import learning from "../../assets/learning.png";
import google from "../../assets/google.png";

const LogInForm = () => {
  return (
    <>
      <div>
        <img src={learning} className="p-10 mr-10"></img>
      </div>
      <div className="w-96 m-5 p-10 bg-violet-600 rounded-xl ">
        <div className="grid grid-cols-1 gap-4 p-4">
          <div className="text-center text">
            <h1 className="text-4xl font-bold text-violet-50">Welcome Back!</h1>
          </div>
          <div className="text-center">
            <h1 className="text-violet-50 text-lg mb-10">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-violet-50 text-xl font-bold  hover:text-violet-200"
              >
                Sign Up
              </a>
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* <button className="btn btn-primary">Log In</button> */}
            <button className="btn btn-google">
              {" "}
              <img src={google} className="w-5 h-5"></img>Continue with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInForm;
