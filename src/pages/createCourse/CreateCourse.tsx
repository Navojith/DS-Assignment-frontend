import { useState } from 'react';
import CreateCourseForm from '../../components/CreateCourse/CreateCourseForm';
import PageContainer from '../../components/PageContainer/PageContainer';

function CreateCourse() {
  const [CreatedCourseID, setCreatedCourseID] = useState('');

  return (
    <PageContainer>
      <CreateCourseForm setCreatedCourse={setCreatedCourseID} />
    </PageContainer>
  );
}

export default CreateCourse;
