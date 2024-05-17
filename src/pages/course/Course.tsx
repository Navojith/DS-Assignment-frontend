import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import PageContainer from '../../components/PageContainer/PageContainer';
import { useAuthentication } from '../../hooks/useAuthentication';
import routes from '../../routes/route.json';
import { getAllCourses } from '../../services/courseManagementService';
import { createPayment } from '../../services/paymentService';
import {
  enrollToCourseAndSendSms,
  getMyCoursesWithProgression,
} from '../../services/progressionService';
import { Progression } from '../myCourses/MyCourses';
import { Course as CourseType } from './IndividualCourse/IndividualCourse';

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
      course?.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCourses(filteredCourses);
  }, [search]);

  const handleEnroll = async (courseId: string) => {
    console.log('Enrolling to course', courseId);
    try {
      const response = await createPayment({
        amount: 50.99,
        status: 'completed',
        paymentMethod: 'credit_card',
        paymentId: uuid(),
        userId: user?.id || '',
        courseId: courseId,
      });
      if (response) {
        try {
          // await enrollToCourse(user?.id, courseId, user?.email);
          await enrollToCourseAndSendSms(
            user?.id,
            courseId,
            user?.email,
            user?.phone
          );
        } catch (error) {
          console.error(error);
        }
        window?.location?.replace(response.session.url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const RenderButton = (courseId: string) => {
    const ownedCourseIds: string[] =
      ownedCourses &&
      Array.isArray(ownedCourses) &&
      ownedCourses?.map((course) => course.courseDetails.courseId);
    console.log('User:', user?.role);

    return ownedCourses &&
      Array.isArray(ownedCourses) &&
      user?.role === 'student' ? (
      <button className="ml-auto" onClick={() => handleEnroll(courseId)}>
        Enroll Now
      </button>
    ) : user?.role === 'instructor' ? (
      <div className="flex gap-4">
        <button
          className="ml-auto"
          onClick={() =>
            navigate(routes?.EDIT_COURSE?.route?.replace(':id', courseId))
          }
        >
          Manage Course
        </button>
        <button
          className="ml-auto"
          onClick={() =>
            navigate(routes?.COURSE_CONTENT?.route?.replace(':id', courseId))
          }
        >
          Manage Content
        </button>
      </div>
    ) : (
      <button
        className="ml-auto"
        onClick={() => {
          navigate(routes?.COURSE_CONTENT?.route?.replace(':id', courseId));
        }}
      >
        Evaluate Content
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
          {filteredCourses &&
            Array.isArray(filteredCourses) &&
            filteredCourses?.map((course) => {
              return (
                <div
                  key={course?._id}
                  className={
                    'border border-secondary bg-primaryLighter hover:bg-primaryDark p-3 md:px-10 md:py-5 rounded flex flex-row gap-2 items-center flex-wrap md:flex-nowrap'
                  }
                >
                  <div className="flex flex-col gap-2 w-[100%] md:w-[75%]">
                    <h3 className="text-xl font-bold">{course?.name}</h3>
                    <p>{course?.description}</p>
                    <p>{`Price : ${course?.price} $`}</p>
                  </div>
                  <div className="flex w-[100%] md:w-[25%]">
                    {RenderButton(course?.courseId)}
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
