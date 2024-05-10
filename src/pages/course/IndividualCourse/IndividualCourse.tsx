import { useEffect, useState } from 'react';
import PageContainer from '../../../components/PageContainer/PageContainer';
import { useParams } from 'react-router-dom';
import {
  getCourse,
  getCourseContent,
} from '../../../services/courseManagementService';
import { useAuthentication } from '../../../hooks/useAuthentication';
import {
  getCourseProgression,
  updateSteps,
} from '../../../services/progressionService';
import { Progression } from '../../myCourses/MyCourses';

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

export interface CompletedSteps {
  [key: string]: number;
}

export interface UpdateStepsBody {
  userId: string;
  courseId: string;
  completedSteps: CompletedSteps;
}

function IndividualCourse() {
  const { user } = useAuthentication();
  const [course, setCourse] = useState<Course | null>(null);
  const [steps, setSteps] = useState<CourseContent[]>([]);
  const [progress, setProgress] = useState<Progression>();
  const [isProgressLoading, setIsProgressLoading] = useState(true);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourses = async () => {
      if (courseId && user?.id) {
        setIsProgressLoading(true);
        try {
          const [course, steps, progress] = await Promise.all([
            getCourse(courseId),
            getCourseContent(courseId),
            getCourseProgression(user?.id, courseId),
          ]);
          setCourse(course);
          setSteps(steps);
          setProgress(progress);
        } catch (error) {
          console.error(error);
        }
        setIsProgressLoading(false);
      }
    };
    fetchCourses();
  }, [courseId, user?.id]);

  const handleComplete = async (key: number | string, value: number) => {
    if (user?.id && courseId) {
      setIsProgressLoading(true);
      try {
        console.log('V::', value);
        const body: UpdateStepsBody = {
          userId: user?.id,
          courseId: courseId,
          completedSteps: { [key.toString()]: value === 0 ? 1 : 0 },
        };

        const response = await updateSteps(body);
        if (response) {
          try {
            const newProgress = await getCourseProgression(user?.id, courseId);

            if (newProgress) {
              setProgress(newProgress);
            }
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
      setIsProgressLoading(false);
    }
  };

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
                  <button
                    className={
                      'mt-5 ml-auto flex items-center gap-2' +
                      (progress?.completedSteps[step.step] === 0
                        ? ''
                        : 'btn btn-active btn-neutral')
                    }
                    onClick={() =>
                      handleComplete(
                        step.step,
                        progress?.completedSteps[step.step] || 0
                      )
                    }
                  >
                    {isProgressLoading && (
                      <span className="loading loading-spinner"></span>
                    )}
                    {progress?.completedSteps[step.step] === 0
                      ? 'Mark as Completed'
                      : 'Mark as not Completed'}
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
