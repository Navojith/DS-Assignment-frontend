import apiRequestService from './apiRequestService';

const COURSE_MANAGEMENT_SERVICE_BASE_URL = import.meta.env
  .VITE_COURSE_MANAGEMENT_SERVICE_BASE_URL;

export const getCourse = async (courseId: string) => {
  try {
    const response = await apiRequestService.sendRequest(
      `${COURSE_MANAGEMENT_SERVICE_BASE_URL}/courses/${courseId}`,
      'get'
    );
    if (response) {
      return response;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getCourseContent = async (courseId: string) => {
  try {
    const response = await apiRequestService.sendRequest(
      `${COURSE_MANAGEMENT_SERVICE_BASE_URL}/course-content/${courseId}`,
      'get'
    );
    if (response) {
      return response;
    }
  } catch (err) {
    console.error(err);
  }
};
