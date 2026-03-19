import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '#/api/queryClient';
import { AuthProvider } from '#/contexts/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}
