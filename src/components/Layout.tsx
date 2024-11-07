import { FC, ReactNode, useEffect, useState } from 'react';
import { getCurrentUser } from '../api/user';
import { useUserStore } from '../zustand/userStore';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const refresh = localStorage.getItem('refresh');

    if (!token && !refresh) {
      return;
    }

    setIsLoading(true);
    getCurrentUser()
      .then(response => setUser(response?.data.profile || null))
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? null : <>{children}</>;
};

export default Layout;
