import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../hooks/useUsers';
import { Button, Card, CardHeader, CardBody, Container, LoadingState, ErrorState } from '@/shared/components';

export function LoginScreen() {
  const { isAuthenticated, login } = useAuth();
  const { data: users, isLoading, isError, refetch } = useUsers();
  const [selectedUserId, setSelectedUserId] = useState('');
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  if (isLoading) {
    return (
      <Container size="sm">
        <LoadingState message="Loading users..." />
      </Container>
    );
  }

  if (isError || !users) {
    return (
      <Container size="sm">
        <ErrorState
          title="Failed to load users"
          message="We couldn't load the user list. Please try again."
          onRetry={() => refetch()}
        />
      </Container>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserId && users[selectedUserId]) {
      login(users[selectedUserId]);
    }
  };

  return (
    <Container size="sm">
      <div className="flex flex-col items-center space-y-8 py-12">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Would You Rather?</h1>
          <p className="text-lg text-gray-600">Choose wisely, vote honestly</p>
        </div>

        <Card className="w-full max-w-md">
          <CardHeader>
            <h2 className="text-xl font-semibold text-center">Sign In</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="user-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select a user to sign in
                </label>
                <select
                  id="user-select"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent text-base"
                >
                  <option value="">Choose a user...</option>
                  {Object.values(users).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={!selectedUserId}
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Demo mode:</strong> Select any user to explore the app. No password required!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}
