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
import ReactHtmlParser from 'react-html-parser';

export interface Course {
  _id: string;
  courseId: string;
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
  contentType?: string;
}

export interface CompletedSteps {
  [key: string]: number;
}

export interface UpdateStepsBody {
  userId: string;
  courseId: string;
  completedSteps: CompletedSteps;
}

interface WeeklyContent {
  step: number;
  content: CourseContent[];
}

function IndividualCourse() {
  const { user } = useAuthentication();
  const [course, setCourse] = useState<Course | null>(null);
  const [steps, setSteps] = useState<WeeklyContent[]>([]);
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
          setProgress(progress);

          if (steps) {
            const weeklyContent: WeeklyContent[] = [];

            steps.map((step: CourseContent) => {
              if (step.isApproved) {
                const week = weeklyContent.find(
                  (week) => week.step === step.step
                );
                if (week) {
                  week.content.push(step);
                } else {
                  weeklyContent.push({
                    step: step.step,
                    content: [step],
                  });
                }
              }
            });

            setSteps(weeklyContent);
          }
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
            return (
              <div
                key={step.step}
                className="px-5 py-2 collapse collapse-arrow bg-primaryLighter border border-secondary"
              >
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                  {`Week ${step.step}`}
                </div>
                <div className="collapse-content flex flex-col gap-5">
                  {step.content.map((content) => (
                    <div key={content._id}>
                      {content.contentType.toLowerCase() === 'image' ? (
                        <img src={content.content} />
                      ) : content.contentType.toLowerCase() === 'video' ? (
                        <video controls>
                          <source src={content.content} type="video/mp4" />
                        </video>
                      ) : (
                        <>{ReactHtmlParser(content.content)}</>
                      )}
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
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}

export default IndividualCourse;
