import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useQuestion } from '@/features/questions/hooks/useQuestions';
import { useUsers } from '@/features/auth/hooks/useUsers';
import { useSaveAnswer } from '../hooks/useSaveAnswer';
import { Button, Card, CardHeader, CardBody, Avatar, Container, LoadingState, ErrorState } from '@/shared/components';

export function PollScreen() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<'optionOne' | 'optionTwo' | ''>('');

  const { data: question, isLoading: questionLoading, isError: questionError } = useQuestion(id!);
  const { data: users, isLoading: usersLoading } = useUsers();
  const saveAnswer = useSaveAnswer();

  const isLoading = questionLoading || usersLoading;

  if (isLoading) {
    return (
      <Container size="sm">
        <LoadingState message="Loading question..." />
      </Container>
    );
  }

  if (questionError || !question) {
    return (
      <Container size="sm">
        <ErrorState
          title="Question Not Found"
          message="This question doesn't exist or has been removed."
          onRetry={() => navigate('/')}
        />
      </Container>
    );
  }

  const author = users?.[question.author];

  // Check if user already voted
  const hasVoted = question.optionOne.votes.includes(user!.id) ||
    question.optionTwo.votes.includes(user!.id);

  if (hasVoted) {
    return <Navigate to={`/questions/${id}/results`} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption || !user) return;

    try {
      await saveAnswer.mutateAsync({
        authedUser: user.id,
        qid: question.id,
        answer: selectedOption,
      });
      navigate(`/questions/${id}/results`);
    } catch (error) {
      console.error('Failed to save answer:', error);
    }
  };

  return (
    <Container size="sm">
      <div className="space-y-6 py-8">
        <Button variant="ghost" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              {author && <Avatar src={author.avatarURL} alt={author.name} size="md" />}
              <div>
                <p className="font-semibold">{author?.name} asks:</p>
                <p className="text-sm text-gray-500">Would You Rather...</p>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Option 1 */}
                <label
                  className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedOption === 'optionOne'
                      ? 'border-primary-main bg-primary-light bg-opacity-10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="poll"
                    value="optionOne"
                    checked={selectedOption === 'optionOne'}
                    onChange={(e) => setSelectedOption(e.target.value as 'optionOne')}
                    className="mt-1 h-4 w-4 text-primary-main focus:ring-primary-main"
                  />
                  <span className="flex-1 text-gray-800">{question.optionOne.text}</span>
                </label>

                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">OR</span>
                </div>

                {/* Option 2 */}
                <label
                  className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedOption === 'optionTwo'
                      ? 'border-primary-main bg-primary-light bg-opacity-10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="poll"
                    value="optionTwo"
                    checked={selectedOption === 'optionTwo'}
                    onChange={(e) => setSelectedOption(e.target.value as 'optionTwo')}
                    className="mt-1 h-4 w-4 text-primary-main focus:ring-primary-main"
                  />
                  <span className="flex-1 text-gray-800">{question.optionTwo.text}</span>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={!selectedOption}
                isLoading={saveAnswer.isPending}
              >
                Submit Vote
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}
