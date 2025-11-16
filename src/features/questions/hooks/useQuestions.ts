import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { CreateQuestionInput } from '@/lib/types';

/**
 * Hook to fetch all questions
 */
export function useQuestions() {
  return useQuery({
    queryKey: ['questions'],
    queryFn: api.getQuestions,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to fetch a specific question
 */
export function useQuestion(id: string) {
  return useQuery({
    queryKey: ['questions', id],
    queryFn: () => api.getQuestion(id),
    enabled: !!id,
  });
}

/**
 * Hook to create a new question
 */
export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateQuestionInput) => api.saveQuestion(data),
    onSuccess: () => {
      // Invalidate questions cache to refetch
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}
