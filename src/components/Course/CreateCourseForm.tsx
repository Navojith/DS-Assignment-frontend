import { useEffect, useState } from 'react';
import {
  createCourse,
  deleteCourse,
  updateCourse,
} from '../../services/courseManagementService';
import { CourseDTO } from '../../types/courseTypes';

interface Props {
  courseData?: CourseDTO | null;
  setCreatedCourse: (courseID: string) => void;
}

const CreateCourseForm = ({ courseData, setCreatedCourse }: Props) => {
  console.log('courseData', courseData);
  const [courseId, setCourseId] = useState(courseData?.courseId || '');
  const [name, setName] = useState(courseData?.name || '');
  const [price, setPrice] = useState(courseData?.price || '');
  const [description, setDescription] = useState(courseData?.description || '');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    'Course created successfully'
  );
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

  function handleUpdate(): void {
    if (courseData) {
      updateCourse(courseData)
        .then((response) => {
          setError('');
          setCreatedCourse(response?.courseId);
          setToastMessage('Course updated successfully');
          setShowToast(true);
          const modal = document.getElementById(
            'content_confirmation_modal'
          ) as HTMLDialogElement;
          if (modal) {
            modal.showModal();
          }
        })
        .catch((error) => {
          setError(error?.message || 'An error occurred');
          setShowToast(true);
        });
    }
  }

  function handleDelete(): void {
    if (courseData) {
      deleteCourse(courseData.courseId)
        .then(() => {
          setCreatedCourse('');
          setToastMessage('Course deleted successfully');
          setShowToast(true);
        })
        .catch((error) => {
          setError(error?.message || 'An error occurred');
          setShowToast(true);
        });
    }
  }

  useEffect(() => {
    if (courseData) {
      setCourseId(courseData.courseId);
      setName(courseData.name);
      setPrice(courseData.price);
      setDescription(courseData.description);
    }
  }, [courseData]);

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className={`alert ${error ? 'alert-error' : 'alert-success'}`}>
            <span>
              {error || toastMessage}
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
          <div className="grid grid-cols-2 gap-2 font-semibold">
            <label className="input input-bordered bg-primaryDarker flex items-center gap-2 col-span-2">
              Course ID
              <input
                type="text"
                className="grow"
                placeholder="H1030"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              />
            </label>
            <label className="input input-bordered bg-primaryDarker flex items-center gap-2">
              Name
              <input
                type="text"
                className="grow"
                placeholder="AWS Methodologies"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered bg-primaryDarker flex items-center gap-2">
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
              className="textarea bg-primaryDarker textarea-bordered col-span-2 textarea-lg"
              placeholder="Description of the course"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center gap-8">
            <button
              className="btn hover:btn-secondary"
              onClick={courseData ? handleUpdate : handleCreate}
            >
              {courseData ? 'Update' : 'Create'}
            </button>
            <button className="btn hover:btn-info" onClick={handleCancel}>
              {courseData ? 'Cancel' : 'Clear'}
            </button>
            {courseData && (
              <button className="btn hover:btn-error" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourseForm;
