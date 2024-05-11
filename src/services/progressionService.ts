import { UpdateStepsBody } from '../pages/course/IndividualCourse/IndividualCourse';
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
export const getCourseProgression = async (
  userId: string,
  courseId: string
) => {
  try {
    const response = await apiRequestService.sendRequest(
      `${PROGRESSION_SERVICE_BASE_URL}/course-progression/${userId}/${courseId}`,
      'get'
    );
    if (response) {
      return response;
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateSteps = async (body: UpdateStepsBody) => {
  try {
    const response = await apiRequestService.sendRequest(
      `${PROGRESSION_SERVICE_BASE_URL}/course-progression/${body.userId}/${body.courseId}`,
      'patch',
      {},
      {},
      {
        userId: body.userId,
        courseId: body.courseId,
        completedSteps: body.completedSteps,
      }
    );
    if (response) {
      return response;
    }
  } catch (err) {
    console.error(err);
  }
};
