
import React from 'react';

interface HeaderProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleDarkMode, isDarkMode }) => {
  return (
    <header className="bg-white dark:bg-card-dark h-20 shadow-sm border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 z-40 transition-colors">
      <div className="flex items-center">
        {/* Logo removed as per request */}
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative hidden lg:block">
          <input 
            type="text" 
            placeholder="O que deseja encontrar?"
            className="w-80 pl-4 pr-10 py-2.5 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-primary focus:border-primary transition-all"
          />
          <span className="material-icons-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={onToggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors"
          >
            <span className="material-icons-outlined text-xl">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <button className="flex items-center space-x-1.5 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-sm">
            <span className="material-icons-outlined text-sm">warning</span>
            <span>0</span>
          </button>

          <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1 pr-3 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-3">
              <img src="https://picsum.photos/seed/gol-user/200/200" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[11px] font-bold text-gray-700 dark:text-gray-200">Admin Fluig</p>
              <p className="text-[10px] text-gray-400">GOL Linhas Aéreas</p>
            </div>
            <span className="material-icons-outlined text-sm ml-2 text-gray-400">settings</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
