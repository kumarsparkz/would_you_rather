import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';
import { Avatar, Button } from './index';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md font-medium transition-colors ${
      isActive
        ? 'bg-primary-main text-white'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🤔</span>
            <span className="text-xl font-bold text-gray-900">Would You Rather?</span>
          </NavLink>

          {/* Navigation Links */}
          {user && (
            <div className="flex items-center space-x-6">
              <div className="flex space-x-2">
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/add" className={navLinkClass}>
                  New Question
                </NavLink>
                <NavLink to="/leaderboard" className={navLinkClass}>
                  Leaderboard
                </NavLink>
              </div>

              {/* User Info */}
              <div className="flex items-center space-x-3 pl-6 border-l border-gray-300">
                <Avatar src={user.avatarURL} alt={user.name} size="sm" />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                <Button onClick={handleLogout} variant="ghost" size="sm">
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
