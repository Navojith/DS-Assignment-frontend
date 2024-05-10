import { useEffect, useState } from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import { getMyCoursesWithProgression } from '../../services/progressionService';
import { useNavigate } from 'react-router-dom';
import { COURSE } from '../../routes/route.json';
import { CompletedSteps } from '../course/IndividualCourse/IndividualCourse';

export interface Progression {
  completedSteps: CompletedSteps;
  totalSteps: number;
  userId: string;
  id: string;
  courseDetails: {
    courseId: string;
    name: string;
    description: string;
  };
}

function MyCourses() {
  const [courses, setCourses] = useState<Progression[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getMyCoursesWithProgression(
          '6630b0f269c099f21afc289d'
        );
        if (response) {
          setCourses(response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);
  return (
    <PageContainer>
      <h2 className="text-3xl font-bold">My Courses</h2>
      <div className="mt-10 flex flex-col gap-5">
        {courses?.map((course) => {
          return (
            <div
              key={course.id}
              className={
                'border border-secondary bg-primaryLighter hover:bg-primaryDark cursor-pointer p-3 md:px-10 md:py-5 rounded flex flex-row gap-2 items-center'
              }
              onClick={() =>
                navigate(`${COURSE.route}/${course.courseDetails.courseId}`)
              }
            >
              <div className="flex  flex-col gap-2">
                <h3 className="text-xl font-bold">
                  {course.courseDetails.name}
                </h3>
                <p>{course.courseDetails.description}</p>
                <p>
                  Progress:{' '}
                  {course.totalSteps > 0
                    ? Math.round(
                        (course.completedSteps / course.totalSteps) * 100
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="ml-auto mr-5">
                <button>Go to Course</button>
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}

export default MyCourses;
