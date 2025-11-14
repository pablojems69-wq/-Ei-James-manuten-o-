'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type UserType = 'admin' | 'funcionario' | 'cliente' | null;

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [userType, setUserType] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedUserType = localStorage.getItem('userType') as UserType;

    if (authStatus === 'true' && storedUserType) {
      setIsAuthenticated(true);
      setUserType(storedUserType);
    } else {
      // Se não estiver autenticado e não estiver na página de login, redirecionar
      if (pathname !== '/login') {
        router.push('/login');
      }
    }

    setLoading(false);
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  return {
    userType,
    isAuthenticated,
    loading,
    logout
  };
}
