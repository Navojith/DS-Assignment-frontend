import learning from "../../assets/learning.png";
import google from "../../assets/google.png";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const LogInForm = () => {
  const handleClick = () => {
    const callbackUrl = import.meta.env.VITE_CALLBACKURL;
    const clientId = import.meta.env.VITE_CLIENTID;
    const authorizationEndpoint = import.meta.env
      .VITE_GOOGLE_OAUTH_AUTHORIZATION_ENDPOINT_URL;
    const targetUrl = `${authorizationEndpoint}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=token&client_id=${clientId}&scope=openid%20email%20profile`;

    window.location.href = targetUrl;
  };

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
          <div className="text-center"></div>

          <div className="grid grid-cols-1 gap-4">
            {/* <button className="btn btn-primary">Log In</button> */}
            <button className="btn btn-google" onClick={handleClick}>
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
