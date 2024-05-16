import Cookies from "js-cookie";

export const getAccessToken = async () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken;
};
