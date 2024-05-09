import { useState } from 'react';
import apiRequestService from '../../services/apiRequestService';

interface Props {
  setCreatedCourse: (courseID: string) => void;
}

const CreateCourseForm = ({ setCreatedCourse }: Props) => {
  const [courseId, setCourseId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');

  function handleCreate(): void {
    apiRequestService
      .sendRequest(
        'http://localhost:3001/courses',
        'POST',
        {},
        {},
        {
          courseId,
          name,
          price,
          description,
        }
      )
      .then((response) => {
        console.log('response', response);
        setCreatedCourse(response.data.courseId);
      })
      .catch((error) => {
        console.log('error', error);
        setError(error.response.data.message);
      })
      .finally(() => {
        setShowToast(true);
      });
  }

  function handleCancel(): void {
    setCourseId('');
    setName('');
    setPrice('');
    setDescription('');
  }

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className={`alert ${error ? 'alert-error' : 'alert-success'}`}>
            <span>
              {error || 'Course created successfully'}
              <button
                className="bg-inherit pr-0 border-none cursor-pointer"
                onClick={() => setShowToast(false)}
              >
                X
              </button>
            </span>
          </div>
        </div>
      )}
      <div className="h-[80vh] justify-center place-content-center text-center">
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-semibold">Create Course</h1>
          <div className="grid grid-cols-2 gap-2">
            <label className="input input-bordered flex items-center gap-2 col-span-2">
              Course ID
              <input
                type="text"
                className="grow"
                placeholder="H1030"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Name
              <input
                type="text"
                className="grow"
                placeholder="AWS Methodologies"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Price $
              <input
                type="text"
                className="grow"
                placeholder="16.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <textarea
              className="textarea textarea-bordered col-span-2 textarea-lg"
              placeholder="Description of the course"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center gap-8">
            <button className="btn btn-primary" onClick={handleCreate}>
              Create Course
            </button>
            <button className="btn btn-secondary ml-2" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourseForm;
