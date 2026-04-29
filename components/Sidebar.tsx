
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: 'home', label: 'Home', path: '/', disabled: false },
    { icon: 'rocket_launch', label: 'Soluções', path: '/solutions', disabled: true },
    { icon: 'star', label: 'Favoritos', path: '/favorites', disabled: true },
    { icon: 'description', label: 'Documentos', path: '/consultation', disabled: true },
  ];

  return (
    <aside className="w-20 md:w-24 bg-primary flex flex-col items-center py-6 shrink-0 z-50 shadow-2xl">
      <div className="mb-10">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-primary shadow-lg text-lg select-none">
          GOL
        </div>
      </div>
      <nav className="flex flex-col w-full space-y-4">
        {navItems.map((item) => (
          item.disabled ? (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center w-full py-4 text-white/40 cursor-not-allowed pointer-events-none select-none"
            >
              <span className="material-icons-round text-3xl mb-1 opacity-50">{item.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-50">{item.label}</span>
            </div>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center w-full py-4 transition-all duration-200
                ${isActive 
                  ? 'text-white bg-white/20 border-l-4 border-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }
              `}
            >
              <span className="material-icons-round text-3xl mb-1">{item.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </NavLink>
          )
        ))}
        <div className="flex flex-col items-center justify-center w-full py-4 mt-auto text-white/30 cursor-not-allowed pointer-events-none select-none">
          <span className="material-icons-round text-3xl opacity-50">more_horiz</span>
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-50">Mais</span>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
