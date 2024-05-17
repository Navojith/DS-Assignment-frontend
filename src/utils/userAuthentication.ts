import Cookies from "js-cookie";

export const getAccessToken = async () => {
  const accessToken = Cookies.get("access_token");
  return accessToken;
};
