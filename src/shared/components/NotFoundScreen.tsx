import { useNavigate } from 'react-router-dom';
import { Button, Container } from './index';

export function NotFoundScreen() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 text-center">
        <div className="text-8xl">404</div>
        <h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1>
        <p className="text-xl text-gray-600 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/')} variant="primary" size="lg">
          Go Home
        </Button>
      </div>
    </Container>
  );
}
