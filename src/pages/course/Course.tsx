import { useEffect, useState } from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import { Course as CourseType } from './IndividualCourse/IndividualCourse';
import { getAllCourses } from '../../services/courseManagementService';

function Course() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredCourses, setFilteredCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        if (response) {
          setCourses(response);
          setFilteredCourses(response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const filteredCourses = courses.filter((course) =>
      course.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCourses(filteredCourses);
  }, [search]);

  const handleEnroll = (courseId: string) => {
    console.log('Enrolling to course', courseId);
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
          {filteredCourses?.map((course) => {
            return (
              <div
                key={course._id}
                className={
                  'border border-secondary bg-primaryLighter hover:bg-primaryDark cursor-pointer p-3 md:px-10 md:py-5 rounded flex flex-row gap-2 items-center flex-wrap md:flex-nowrap'
                }
              >
                <div className="flex flex-col gap-2 w-[100%] md:w-[75%]">
                  <h3 className="text-xl font-bold">{course.name}</h3>
                  <p>{course.description}</p>
                  <p>{`Price : ${course.price} lkr`}</p>
                </div>
                <div className="flex w-[100%] md:w-[25%]">
                  <button
                    className="ml-auto"
                    onClick={() => handleEnroll(course.courseId)}
                  >
                    Enroll Now
                  </button>
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
