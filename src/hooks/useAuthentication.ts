import { useEffect, useState } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export const useAuthentication = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setUser({
      id: '123',
      email: 'example@example.com',
      name: 'Example',
      avatar: 'https://example.com/avatar.png',
    });
    //setUser(null);
    setIsLoading(false);
  }, []);
  return { user, isLoading };
};