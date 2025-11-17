import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useQuestion } from '@/features/questions/hooks/useQuestions';
import { useUsers } from '@/features/auth/hooks/useUsers';
import { Button, Card, CardHeader, CardBody, Avatar, Container, LoadingState, ErrorState } from '@/shared/components';
import { calculatePercentage } from '@/lib/utils';

export function PollResultsScreen() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: question, isLoading: questionLoading, isError: questionError } = useQuestion(id!);
  const { data: users, isLoading: usersLoading } = useUsers();

  const isLoading = questionLoading || usersLoading;

  const results = useMemo(() => {
    if (!question || !user) return null;

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;

    const userVote = question.optionOne.votes.includes(user.id)
      ? 'optionOne'
      : question.optionTwo.votes.includes(user.id)
      ? 'optionTwo'
      : null;

    return {
      optionOne: {
        votes: optionOneVotes,
        percentage: calculatePercentage(optionOneVotes, totalVotes),
        isUserChoice: userVote === 'optionOne',
      },
      optionTwo: {
        votes: optionTwoVotes,
        percentage: calculatePercentage(optionTwoVotes, totalVotes),
        isUserChoice: userVote === 'optionTwo',
      },
      totalVotes,
    };
  }, [question, user]);

  if (isLoading) {
    return (
      <Container size="sm">
        <LoadingState message="Loading results..." />
      </Container>
    );
  }

  if (questionError || !question || !results) {
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

  const ResultOption = ({
    text,
    votes,
    percentage,
    isUserChoice,
  }: {
    text: string;
    votes: number;
    percentage: number;
    isUserChoice: boolean;
  }) => (
    <div
      className={`p-4 rounded-lg border-2 ${
        isUserChoice
          ? 'border-success bg-green-50'
          : 'border-gray-200'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-800 font-medium">{text}</p>
        {isUserChoice && (
          <span className="text-xs font-semibold text-success bg-white px-2 py-1 rounded-full">
            Your Vote
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div
          className={`h-3 rounded-full transition-all ${
            isUserChoice ? 'bg-success' : 'bg-primary-main'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>{votes} {votes === 1 ? 'vote' : 'votes'}</span>
        <span className="font-semibold">{percentage}%</span>
      </div>
    </div>
  );

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
                <p className="font-semibold">{author?.name} asked:</p>
                <p className="text-sm text-gray-500">Would You Rather...</p>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <ResultOption
                text={question.optionOne.text}
                votes={results.optionOne.votes}
                percentage={results.optionOne.percentage}
                isUserChoice={results.optionOne.isUserChoice}
              />

              <div className="flex items-center justify-center">
                <span className="text-xl font-bold text-gray-400">OR</span>
              </div>

              <ResultOption
                text={question.optionTwo.text}
                votes={results.optionTwo.votes}
                percentage={results.optionTwo.percentage}
                isUserChoice={results.optionTwo.isUserChoice}
              />

              <div className="pt-4 text-center text-sm text-gray-600">
                <p className="font-medium">Total Votes: {results.totalVotes}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}
