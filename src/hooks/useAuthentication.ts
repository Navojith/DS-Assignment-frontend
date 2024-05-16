import { useEffect, useState } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: 'student' | 'instructor' | 'admin';
}

export const useAuthentication = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setUser({
      id: '6630b0f269c099f21afc289d',
      email: 'example@example.com',
      name: 'Example',
      role: 'instructor',
      avatar: 'https://example.com/avatar.png',
    });
    //setUser(null);
    setIsLoading(false);
  }, []);
  return { user, isLoading };
};
