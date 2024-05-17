import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "student" | "instructor" | "admin";
}

export const useAuthentication = () => {
  const [user, setUser] = useState<User | null>(null);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // setIsLoading(true);
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
          throw new Error("Error fetching user");
        }

        const data = await response.json();
        setUser({
          id: data.id,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          role: data.role,
        });
      } catch (error) {
        console.error(error);
      }
    };
    // setIsLoading(false);
    fetchUser();
  }, []);
  // return { user, isLoading };
  return { user };
};
