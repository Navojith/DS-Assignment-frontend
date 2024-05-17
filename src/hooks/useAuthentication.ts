import { useEffect, useState } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  phone?: string;
  role: 'student' | 'instructor' | 'admin';
}

export const useAuthentication = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setUser({
      id: '664191c26d71d98b40c14326',
      email: 'navojith22@gmail.com',
      name: 'Example',
      role: 'instructor',
      // role: 'admin',
      // role: 'student',
      phone: '94713197055',
      avatar: 'https://example.com/avatar.png',
    });
    //setUser(null);
    setIsLoading(false);
  }, []);
  return { user, isLoading };
};
