import { useState } from "react";
import editing from "../../assets/editing .png";
import virtualClass from "../../assets/virtual-class.png";

const UserAccount = () => {
  const [username, setUsername] = useState("Ann Perera");
  const [email, setEmail] = useState("ann@gmail.com");
  const [phone, setPhone] = useState("0714282414");
  const [role, setRole] = useState("Learner");

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateClick = () => {
    //add code here
  };

  return (
    <>
      <div className="flex flex-row mt-5">
        <div className="flex flex-col justify-center w-3/4">
          <div>
            <h1 className="text-4xl font-bold ms-20 mt-5">
              Profile - {username}
            </h1>
          </div>
          <div className="h-[80vh] w-11/12 my-5 mx-14 ">
            <div className="border-solid border-purple-600 border-2 p-2 rounded-lg m-5">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-violet-600 text-xl font-bold">
                  Personal Information
                </h2>

                <img
                  src={editing}
                  className="h-5 w-5"
                  onClick={handleEditClick}
                />
              </div>
              <div className="flex flex-row justify-center gap-20 text-xl">
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
                      <span className="font-bold">Role :</span>{" "}
                      <span>{role}</span>
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
              <div className="flex justify-center">
                {isEditing ? (
                  <button
                    onClick={handleUpdateClick}
                    className="btn hover:btn-secondary  text-white font-bold py-2 px-4 rounded m-5"
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
            <div className="border-solid border-purple-600 border-2 p-2 rounded-lg m-5">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <h2 className="text-violet-600 text-xl font-bold m-3">
                    Delete Profile
                  </h2>
                </div>
              </div>
              <div className="flex flex-row justify-between ms-2">
                <div>
                  <input
                    type="checkbox"
                    id="deleteProfile"
                    className="mr-3 mb-1"
                  />
                  <label htmlFor="deleteProfile">
                    Do you want to delete the profile?
                  </label>
                  <p className="text-red-600">
                    Note : Deleting the profile will also delete all completed
                    course details and cannot be recovered.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {}}
                    className="hover:text-red-600 hover:border-red-600 border-violet-50 text-violet-50"
                    disabled={
                      !(
                        document.getElementById(
                          "deleteProfile"
                        ) as HTMLInputElement
                      )?.checked
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="flex flex-col items-center">
            <button className="btn hover:btn-secondary w-4/6 -ms-10">
              Logout
            </button>
            <img src={virtualClass} className="p-10 mr-10"></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccount;
