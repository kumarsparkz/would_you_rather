import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useQuestions } from '../hooks/useQuestions';
import { useUsers } from '@/features/auth/hooks/useUsers';
import { QuestionCard } from '../components/QuestionCard';
import { Button, Container, LoadingState, ErrorState, EmptyState } from '@/shared/components';
import { formatQuestion } from '@/lib/utils';
import type { FormattedQuestion } from '@/lib/types';

type TabType = 'unanswered' | 'answered';

export function DashboardScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('unanswered');

  const { data: questions, isLoading: questionsLoading, isError: questionsError, refetch: refetchQuestions } = useQuestions();
  const { data: users, isLoading: usersLoading, isError: usersError, refetch: refetchUsers } = useUsers();

  const isLoading = questionsLoading || usersLoading;
  const isError = questionsError || usersError;

  const formattedQuestions = useMemo<FormattedQuestion[]>(() => {
    if (!questions || !users || !user) return [];

    return Object.values(questions)
      .map((question) => formatQuestion(question, users[question.author], user.id))
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [questions, users, user]);

  const displayedQuestions = useMemo(() => {
    return formattedQuestions.filter((q) =>
      activeTab === 'answered' ? q.hasVoted : !q.hasVoted
    );
  }, [formattedQuestions, activeTab]);

  if (isLoading) {
    return (
      <Container>
        <LoadingState message="Loading questions..." />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <ErrorState
          title="Failed to load questions"
          message="We couldn't load the questions. Please try again."
          onRetry={() => {
            refetchQuestions();
            refetchUsers();
          }}
        />
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Questions</h1>
          <Button onClick={() => navigate('/add')} variant="primary">
            Create New Question
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('unanswered')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'unanswered'
                ? 'border-primary-main text-primary-main'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Unanswered ({formattedQuestions.filter((q) => !q.hasVoted).length})
          </button>
          <button
            onClick={() => setActiveTab('answered')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'answered'
                ? 'border-primary-main text-primary-main'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Answered ({formattedQuestions.filter((q) => q.hasVoted).length})
          </button>
        </div>

        {/* Questions Grid */}
        {displayedQuestions.length === 0 ? (
          <EmptyState
            icon={activeTab === 'unanswered' ? '🎉' : '📝'}
            title={activeTab === 'unanswered' ? 'All caught up!' : 'No answers yet'}
            message={
              activeTab === 'unanswered'
                ? "You've answered all available questions. Create a new one to keep the fun going!"
                : "You haven't answered any questions yet. Start voting to see your answers here!"
            }
            actionLabel={activeTab === 'unanswered' ? 'Create Question' : 'View Unanswered'}
            onAction={() => activeTab === 'unanswered' ? navigate('/add') : setActiveTab('unanswered')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
