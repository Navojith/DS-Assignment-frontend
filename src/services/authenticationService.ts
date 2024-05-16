import { existingUserDTO, newUserDTO } from "../types/userTypes";
import apiRequestService from "./apiRequestService";

const VITE_USER_SERVICE_BASE_URL = import.meta.env.VITE_USER_SERVICE_BASE_URL;

export const updateExistingUser = (userDet: existingUserDTO) => {
  try {
    const response = apiRequestService.sendRequest(
      `${VITE_USER_SERVICE_BASE_URL}/user/updateUser`,
      "patch",
      {},
      {},
      userDet
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};
