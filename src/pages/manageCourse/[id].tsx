import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateCourseForm from '../../components/Course/CreateCourseForm';
import RedirectModal from '../../components/Course/RedirectModal';
import PageContainer from '../../components/PageContainer/PageContainer';
import { getCourse } from '../../services/courseManagementService';
import { CourseDTO } from '../../types/courseTypes';

const Index = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState<CourseDTO | null>(null);
  const [createdCourseID, setCreatedCourseID] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await getCourse(id);
      if (response) {
        setCourseData(response);
      }
    };

    fetchCourse();
  }, []);

  return (
    <PageContainer>
      <CreateCourseForm
        courseData={courseData}
        setCreatedCourse={setCreatedCourseID}
      />
      <RedirectModal createdCourse={createdCourseID} />
    </PageContainer>
  );
};

export default Index;
