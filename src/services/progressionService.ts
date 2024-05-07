import apiRequestService from './apiRequestService';

const PROGRESSION_SERVICE_BASE_URL = import.meta.env
  .VITE_PROGRESSION_SERVICE_BASE_URL;

export const getMyCoursesWithProgression = async () => {
  try {
    const response = await apiRequestService.sendRequest(
      `${PROGRESSION_SERVICE_BASE_URL}/getAllProgressionByUserId`,
      'get'
    );
    if (response && response.data) {
      return response.data;
    }
  } catch (err) {
    console.error(err);
  }
};
