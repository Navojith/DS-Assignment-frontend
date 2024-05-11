import { useState } from "react";
import editing from "../../assets/editing.png";

const UserAccount = () => {
  const coursers = [
    { id: 1, name: "React", price: 1000 },
    { id: 2, name: "Node", price: 2000 },
    { id: 3, name: "MongoDB", price: 3000 },
    { id: 1, name: "React", price: 1000 },
    { id: 2, name: "Node", price: 2000 },
    { id: 3, name: "MongoDB", price: 3000 },
    { id: 1, name: "React", price: 1000 },
    { id: 2, name: "Node", price: 2000 },
    { id: 3, name: "MongoDB", price: 3000 },
  ];
  const [username, setUsername] = useState("Ann Perera");
  const [email, setEmail] = useState("ann@gmail.com");
  const [phone, setPhone] = useState("0714282414");
  const [role, setRole] = useState("Learner");

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold">Profile</h1>
      </div>
      <div className="h-[80vh] w-11/12 my-5 mx-14 ">
        <div className="border-solid border-purple-600 border-2 p-2 rounded-lg m-5">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-violet-600 text-xl font-bold">
              Personal Information
            </h2>

            <img src={editing} className="h-5 w-5" onClick={handleEditClick} />
          </div>
          <div className="flex flex-row justify-center gap-8">
            <div>
              <ol>
                <li className="mb-2">
                  <span className="font-bold">Username:</span>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border border-gray-300 rounded-md p-1"
                    />
                  ) : (
                    <span>{username}</span>
                  )}
                </li>
                <li>
                  <span className="font-bold">Role:</span> <span>{role}</span>
                </li>
              </ol>
            </div>
            <div>
              <ul>
                <li className="mb-2">
                  <span className="font-bold">Email:</span>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-gray-300 rounded-md p-1"
                    />
                  ) : (
                    <span>{email}</span>
                  )}
                </li>
                <li>
                  <span className="font-bold">Phone:</span>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border border-gray-300 rounded-md p-1"
                    />
                  ) : (
                    <span>{phone}</span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-solid border-purple-600 border-2 p-2 rounded-lg m-5">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-violet-600 text-xl font-bold">Courses</h2>
          </div>
          {coursers.map((course) => (
            <div key={course.id} className="mb-2">
              <span className="font-bold">{course.name}:</span> ${course.price}
              <hr />
            </div>
          ))}
        </div>
        <div className="border-solid border-purple-600 border-2 p-2 rounded-lg m-5">
          <div className="flex flex-row items-center justify-between">
            <div>
              <h2 className="text-violet-600 text-xl font-bold">
                Delete Profile
              </h2>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <input type="checkbox" id="deleteProfile" />
              <label htmlFor="deleteProfile">
                Do you want to delete the profile?
              </label>
              <p>
                Note: Deleting the profile will also delete all completed course
                details and cannot be recovered.
              </p>
            </div>
            <div>
              <button
                onClick={() => {}}
                className="text-red-600"
                disabled={
                  !(
                    document.getElementById("deleteProfile") as HTMLInputElement
                  )?.checked
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccount;
