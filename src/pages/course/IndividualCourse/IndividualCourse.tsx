import { useEffect, useState } from 'react';
import PageContainer from '../../../components/PageContainer/PageContainer';
import { useParams } from 'react-router-dom';
import {
  getCourse,
  getCourseContent,
} from '../../../services/courseManagementService';

interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface CourseContent {
  courseId: string;
  isApproved: boolean;
  step: number;
  content: any;
  _id: string;
}

function IndividualCourse() {
  const [course, setCourse] = useState<Course | null>(null);
  const [steps, setSteps] = useState<CourseContent[]>([]);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourses = async () => {
      if (courseId) {
        try {
          const [course, steps] = await Promise.all([
            getCourse(courseId),
            getCourseContent(courseId),
          ]);
          setCourse(course);
          setSteps(steps);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchCourses();
  }, [courseId]);

  const handleComplete = async () => {};

  return (
    <PageContainer>
      {course && (
        <div className="flex flex-col gap-5 border-b border-b-secondary pb-5">
          <h2 className="text-3xl font-bold">{course?.name}</h2>
          <p>{course?.description}</p>
        </div>
      )}
      {steps && (
        <div className="mt-10 flex flex-col gap-5">
          {steps?.map((step) => {
            return step.isApproved ? (
              <div
                key={step._id}
                className="px-5 py-2 collapse collapse-arrow bg-primaryLighter border border-secondary"
              >
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                  {`Week ${step.step}`}
                </div>
                <div className="collapse-content flex flex-col">
                  <p>{step.content}</p>
                  <img src="https://firebasestorage.googleapis.com/v0/b/af-assignment-2-343a3.appspot.com/o/files%2FNitro_Wallpaper_01_3840x2400.jpg?alt=media&token=c4c6a14b-301b-4336-97d8-efcf246fe0cd" />
                  <button className="mt-5 ml-auto" onClick={handleComplete}>
                    Mark as Completed
                  </button>
                </div>
              </div>
            ) : null;
          })}
        </div>
      )}
    </PageContainer>
  );
}

export default IndividualCourse;
