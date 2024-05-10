import apiRequestService from './apiRequestService';

const PROGRESSION_SERVICE_BASE_URL = import.meta.env
  .VITE_PROGRESSION_SERVICE_BASE_URL;

export const getMyCoursesWithProgression = async (userId: string) => {
  try {
    const response = await apiRequestService.sendRequest(
      `${PROGRESSION_SERVICE_BASE_URL}/course-progression/${userId}`,
      'get'
    );
    if (response) {
      return response;
    }
  } catch (err) {
    console.error(err);
  }
};
