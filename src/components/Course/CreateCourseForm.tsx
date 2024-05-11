import { useState } from 'react';
import { createCourse } from '../../services/courseManagementService';
import { CourseDTO } from '../../types/courseTypes';

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
    if (!courseId || !name || !price) {
      setError('Please fill all the required fields');
      setShowToast(true);
      return;
    }

    const course: CourseDTO = {
      courseId: courseId || '',
      name: name || '',
      price: price || '',
      description: description || '',
    };

    createCourse(course)
      .then((response) => {
        setError('');
        setCreatedCourse(response?.courseId);
        const modal = document.getElementById(
          'content_confirmation_modal'
        ) as HTMLDialogElement;
        if (modal) {
          modal.showModal();
        }
      })
      .catch((error) => {
        setError(error?.message || 'An error occurred');
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
        <div className="flex flex-col gap-10 bg-primaryLighter p-5 rounded-md border-2 border-secondary">
          <h1 className="text-2xl font-semibold">ADD NEW COURSE</h1>
          <div className="grid grid-cols-2 gap-2 text-slate-700 font-semibold">
            <label className="input input-secondary flex items-center gap-2 col-span-2">
              Course ID
              <input
                type="text"
                className="grow"
                placeholder="H1030"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              />
            </label>
            <label className="input input-secondary flex items-center gap-2">
              Name
              <input
                type="text"
                className="grow"
                placeholder="AWS Methodologies"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-secondary flex items-center gap-2">
              <div className="flex flex-shrink-0">Price $</div>
              <input
                type="number"
                className="grow"
                placeholder="16.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <textarea
              className="textarea textarea-secondary col-span-2 textarea-lg"
              placeholder="Description of the course"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center gap-8">
            <button className="btn btn-secondary" onClick={handleCreate}>
              Create Course
            </button>
            <button className="btn btn-primary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourseForm;
