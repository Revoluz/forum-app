import React from 'react';

function Navbar() {
  return (
    <header className="h-14 border-b border-border-subtle dark:border-slate-800 flex items-center px-6 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur z-10">
      <h2 className="font-medium text-[15px]">Discussions</h2>
      <div className="ml-auto flex items-center gap-4">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[18px]">
            search
          </span>
          <input
            className="pl-9 pr-4 py-1.5 bg-sidebar-light dark:bg-slate-800 border-none rounded text-sm focus:ring-1 focus:ring-primary w-64 text-text-main dark:text-slate-100 placeholder-text-muted dark:placeholder-slate-500"
            placeholder="Search discussions..."
            type="text"
          />
        </div>
        <button className="text-text-muted hover:text-text-main dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[20px]">
            notifications
          </span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
