import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer/PageContainer";
import Cookies from "js-cookie";

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
    <PageContainer justifyContentCenter={true} alignItemsCenter={true}>
      <div>Home</div>
    </PageContainer>
  );
};

export default Home;
