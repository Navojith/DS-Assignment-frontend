import { useNavigate } from 'react-router-dom';
import { ADD_COURSE_CONTENT } from '../../routes/route.json';

interface Props {
  createdCourse: string;
}

const RedirectModal = ({ createdCourse }: Props) => {
  const navigate = useNavigate();

  function handleRedirect(): void {
    const courseContentRoute = ADD_COURSE_CONTENT.route.replace(
      ':id',
      createdCourse
    );
    navigate(courseContentRoute);
  }

  return (
    <dialog
      id="content_confirmation_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box text-slate-700">
        <h3 className="font-bold text-lg">Course Successfully Added</h3>
        <p className="py-4">
          Do you want to add course content for the newly added Course?
        </p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-4">
            <button className="btn btn-secondary" onClick={handleRedirect}>
              Add Content
            </button>
            <button className="btn btn-primary">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default RedirectModal;
