import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider, useAuth } from '@/features/auth/context/AuthContext';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { DashboardScreen } from '@/features/questions/screens/DashboardScreen';
import { NewQuestionScreen } from '@/features/questions/screens/NewQuestionScreen';
import { PollScreen } from '@/features/poll/screens/PollScreen';
import { PollResultsScreen } from '@/features/poll/screens/PollResultsScreen';
import { LeaderboardScreen } from '@/features/leaderboard/screens/LeaderboardScreen';
import { Navbar } from '@/shared/components/Navbar';
import { NotFoundScreen } from '@/shared/components/NotFoundScreen';

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <NewQuestionScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <ProtectedRoute>
              <PollScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:id/results"
          element={
            <ProtectedRoute>
              <PollResultsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/404" element={<NotFoundScreen />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
