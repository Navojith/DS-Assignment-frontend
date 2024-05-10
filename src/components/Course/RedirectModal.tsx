import { useNavigate } from 'react-router-dom';

interface Props {
  createdCourse: string;
}

const RedirectModal = ({ createdCourse }: Props) => {
  const navigate = useNavigate();

  function handleRedirect(): void {
    navigate(`/addCourseContent/${createdCourse}`);
  }

  return (
    <dialog
      id="content_confirmation_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Course Successfully Added</h3>
        <p className="py-4">
          Do you want to add course content for the newly added Course?
        </p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-4">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary" onClick={handleRedirect}>
              Add Content
            </button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default RedirectModal;
