import { useEffect, useState } from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import { Course as CourseType } from './IndividualCourse/IndividualCourse';
import { getAllCourses } from '../../services/courseManagementService';
import { getMyCoursesWithProgression } from '../../services/progressionService';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes/route.json';
import { Progression } from '../myCourses/MyCourses';
import { createPayment } from '../../services/paymentService';


function Course() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const { user } = useAuthentication();
  const [search, setSearch] = useState<string>('');
  const [ownedCourses, setOwnCourses] = useState<Progression[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      if (user?.id) {
        try {
          const [allCourses, owned] = await Promise.all([
            getAllCourses(),
            getMyCoursesWithProgression(user?.id),
          ]);
          if (allCourses) {
            setCourses(allCourses);
            setFilteredCourses(allCourses);
          }
          if (owned) {
            setOwnCourses(owned);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchCourses();
  }, [user?.id]);

  useEffect(() => {
    const filteredCourses = courses.filter((course) =>
      course.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCourses(filteredCourses);
  }, [search]);

  const handleEnroll =  async (courseId: string) => {
    console.log('Enrolling to course', courseId);
    try {
      const response = await createPayment(
        {
          amount: 50.99,
          status: "completed",
          paymentMethod: "credit_card",
          paymentId: courseId,
          userId: "user123",
          courseId: courseId
        }
      );
      if (response) {
        console.log('Payment successful', response);
        window.location.replace(response.session.url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const RenderButton = (courseId: string) => {
    const ownedCourseIds: string[] = ownedCourses.map(
      (course) => course.courseDetails.courseId
    );

    return ownedCourseIds.includes(courseId) ? (
      <button
        className="ml-auto"
        onClick={() => navigate(`${routes.COURSE.route}/${courseId}`)}
      >
        View Course
      </button>
    ) : (
      <button className="ml-auto" onClick={() => handleEnroll(courseId)}>
        Enroll Now
      </button>
    );
  };

  return (
    <PageContainer>
      <div>
        <label className="input input-bordered bg-primaryDarker  flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search Courses"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className="mt-10 flex flex-col gap-5">
        {filteredCourses && Array.isArray(filteredCourses) && filteredCourses.map((course) => {
              return (
                <div
                  key={course._id}
                  className={
                    'border border-secondary bg-primaryLighter hover:bg-primaryDark p-3 md:px-10 md:py-5 rounded flex flex-row gap-2 items-center flex-wrap md:flex-nowrap'
                  }
                >
                  <div className="flex flex-col gap-2 w-[100%] md:w-[75%]">
                    <h3 className="text-xl font-bold">{course.name}</h3>
                    <p>{course.description}</p>
                    <p>{`Price : ${course.price} $`}</p>
                  </div>
                  <div className="flex w-[100%] md:w-[25%]">
                    {RenderButton(course.courseId)}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </PageContainer>
  );
}

export default Course;
