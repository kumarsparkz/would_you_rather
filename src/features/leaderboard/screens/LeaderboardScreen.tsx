import { useMemo } from 'react';
import { useUsers } from '@/features/auth/hooks/useUsers';
import { Card, CardBody, Avatar, Container, LoadingState, ErrorState } from '@/shared/components';
import { calculateLeaderboard } from '@/lib/utils';

export function LeaderboardScreen() {
  const { data: users, isLoading, isError, refetch } = useUsers();

  const leaderboard = useMemo(() => {
    if (!users) return [];
    return calculateLeaderboard(users);
  }, [users]);

  if (isLoading) {
    return (
      <Container>
        <LoadingState message="Loading leaderboard..." />
      </Container>
    );
  }

  if (isError || !users) {
    return (
      <Container>
        <ErrorState
          title="Failed to load leaderboard"
          message="We couldn't load the leaderboard. Please try again."
          onRetry={() => refetch()}
        />
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-6 py-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          <p className="text-gray-600">See who's leading the community!</p>
        </div>

        <div className="space-y-4">
          {leaderboard.map((entry, index) => (
            <Card key={entry.user.id} className={index < 3 ? 'ring-2 ring-primary-light' : ''}>
              <CardBody>
                <div className="flex items-center space-x-6">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 text-center">
                    {index === 0 && <span className="text-4xl">🥇</span>}
                    {index === 1 && <span className="text-4xl">🥈</span>}
                    {index === 2 && <span className="text-4xl">🥉</span>}
                    {index > 2 && (
                      <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                    )}
                  </div>

                  {/* Avatar and Name */}
                  <Avatar src={entry.user.avatarURL} alt={entry.user.name} size="lg" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{entry.user.name}</h3>
                    <p className="text-sm text-gray-600">Total Score: {entry.score} points</p>
                  </div>

                  {/* Stats */}
                  <div className="flex space-x-8 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary-main">{entry.answeredCount}</p>
                      <p className="text-xs text-gray-600">Answered</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-secondary-main">{entry.createdCount}</p>
                      <p className="text-xs text-gray-600">Created</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            <strong>Scoring:</strong> 1 point for each question answered + 1 point for each question created
          </p>
        </div>
      </div>
    </Container>
  );
}
