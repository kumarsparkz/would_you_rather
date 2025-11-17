import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error while loading this content. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center px-4">
      <div className="text-6xl">⚠️</div>
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          Try Again
        </Button>
      )}
    </div>
  );
}
