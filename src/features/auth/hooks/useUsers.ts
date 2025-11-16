import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

/**
 * Hook to fetch all users
 */
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: api.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
