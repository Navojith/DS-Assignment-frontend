import education from "../../assets/education.png";
import google from "../../assets/google.png";

const SignUpForm = () => {
  return (
    <>
      <div>
        <img src={education} className="p-10 mr-10"></img>
      </div>
      <div className="w-120 m-5 p-10 bg-violet-600 rounded-xl ">
        <div className="grid grid-cols-1 gap-4 p-4 mb-10">
          <div className="text-center text mb-10">
            <h1 className="text-4xl font-bold text-violet-50">
              Create your account!
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* <button className="btn btn-primary">Log In</button> */}
            <button className="btn btn-google border-none">
              {" "}
              <img src={google} className="w-5 h-5"></img>Continue with Google
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-violet-50 text-lg ">
              already have an account?{" "}
              <a href="#" className="text-violet-50 text-xl font-bold">
                Sign in
              </a>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
