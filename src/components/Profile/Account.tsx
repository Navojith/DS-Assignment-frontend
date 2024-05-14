import { useCallback, useEffect, useState } from "react";
import editing from "../../assets/editing .png";
import virtualClass from "../../assets/virtual-class.png";
import Cookies from "js-cookie";
import { set } from "firebase/database";

const UserAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [isnewUser, setIsNewUser] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/currentUser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              access_token: Cookies.get("access_token"),
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        setUsername(data.fullName);
        setEmail(data.email);
        setPhone(data.phone);
        setRole(data.role);
        if (role === "" || phone === "") {
          setIsNewUser(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/updateUser",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("access_token"),
          },
          body: JSON.stringify({
            fullName: username,
            phone: phone,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogOut = () => {
    Cookies.remove("access_token");
    window.location.href = "/";
  };

  const handleDeleteProfile = async () => {
    console.log("delete");
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/deleteUser",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("access_token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user data");
      }
      Cookies.remove("access_token");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewUser = async (e) => {
    console.log("update new user");
    // try {
    //   const response = await fetch(
    //     "http://localhost:3000/api/user/updateNewUser",
    //     {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //         access_token: Cookies.get("access_token"),
    //       },
    //       body: JSON.stringify({
    //         fullName: username,
    //         phone: phone,
    //       }),
    //     }
    //   );
    //   if (!response.ok) {
    //     throw new Error("Failed to update user data");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    setRole("LEARNER");
    setPhone("94710627526");
    setIsNewUser(false);
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
          <div className="h-[60vh] w-11/12 my-5 mx-14 ">
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
                      <span className="font-bold">Username :</span>{" "}
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
                      <span className="font-bold">Email :</span>{" "}
                      <span>{email}</span>
                    </li>
                    <li>
                      <span className="font-bold">Phone :</span>{" "}
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
                    onClick={handleDeleteProfile}
                    className="hover:text-red-600 hover:border-red-600 border-violet-50 text-violet-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div>
              {isnewUser ? (
                <form>
                  <div className="border-solid border-purple-600 border-2 p-2 rounded-lg m-5">
                    <div className="flex flex-row items-center justify-between">
                      <h2 className="text-violet-600 text-xl font-bold mb-5">
                        Update Role and Phone Number
                      </h2>
                    </div>
                    <div className="flex flex-row justify-center gap-20 text-xl">
                      <div>
                        <label htmlFor="role" className="pr-5">
                          Role :{" "}
                        </label>
                        <select
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="border border-gray-300 rounded-md p-1 bg-black"
                        >
                          <option value="learner" className="text-white">
                            Learner
                          </option>
                          <option value="instructor" className="text-white">
                            Instructor
                          </option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="phone" className="pr-5">
                          Phone Number :{" "}
                        </label>
                        <input
                          type="text"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="border border-gray-300 rounded-md p-1"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={handleNewUser}
                        className="btn hover:btn-secondary text-white font-bold py-2 px-4 rounded m-5"
                      >
                        Update Role and Phone Number
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="flex flex-col items-center">
            <button
              className="btn hover:btn-secondary w-4/6 -ms-10"
              onClick={handleLogOut}
            >
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
