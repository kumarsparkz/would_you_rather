import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { SaveQuestionAnswerInput } from '@/lib/types';

/**
 * Hook to save an answer to a question
 */
export function useSaveAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveQuestionAnswerInput) => api.saveQuestionAnswer(data),
    onSuccess: (_, variables) => {
      // Invalidate questions and users cache to refetch with updated data
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      queryClient.invalidateQueries({ queryKey: ['questions', variables.qid] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
