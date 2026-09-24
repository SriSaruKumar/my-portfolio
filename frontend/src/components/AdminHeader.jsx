import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, ExternalLink, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminHeader = ({ title }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Welcome back, {user?.name || 'Administrator'}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Public Site</span>
        </Link>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        <div className="flex items-center gap-2 pl-4 border-l border-gray-200 dark:border-gray-800">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-gray-900 dark:text-white">{user?.name}</span>
            <span className="block text-[10px] text-gray-400">{user?.email}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
