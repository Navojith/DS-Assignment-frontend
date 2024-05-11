import { useNavigate } from 'react-router-dom';
import { COURSE_CONTENT } from '../../routes/route.json';

interface Props {
  createdCourse: string;
}

const RedirectModal = ({ createdCourse }: Props) => {
  const navigate = useNavigate();

  function handleRedirect(): void {
    const courseContentRoute = COURSE_CONTENT.route.replace(
      ':id',
      createdCourse
    );
    navigate(courseContentRoute);
  }

  function handleRedirectToCourses(): void {
    navigate('/course');
  }

  return (
    <dialog
      id="content_confirmation_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box bg-primaryDarker border-secondary border-2">
        <h3 className="font-bold text-lg">Course Successfully Added</h3>
        <p className="py-4">
          Do you want to add course content for the newly added Course?
        </p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-4">
            <button
              className="btn hover:btn-secondary"
              onClick={handleRedirect}
            >
              Add Content
            </button>
            <button
              className="btn btn-primary"
              onClick={handleRedirectToCourses}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default RedirectModal;
