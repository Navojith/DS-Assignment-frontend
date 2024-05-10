import { useState } from 'react';
import CreateCourseForm from '../../components/Course/CreateCourseForm';
import RedirectModal from '../../components/Course/RedirectModal';
import PageContainer from '../../components/PageContainer/PageContainer';

function CreateCourse() {
  const [createdCourseID, setCreatedCourseID] = useState('');

  return (
    <PageContainer>
      <CreateCourseForm setCreatedCourse={setCreatedCourseID} />
      <RedirectModal createdCourse={createdCourseID} />
    </PageContainer>
  );
}

export default CreateCourse;
