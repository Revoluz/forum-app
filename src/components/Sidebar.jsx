import React from 'react';

function Sidebar() {
  return (
    <aside className="w-[240px] bg-sidebar-light dark:bg-background-dark border-r border-border-subtle dark:border-slate-800 flex flex-col h-screen sticky top-0 shrink-0">
      <div className="p-4 flex flex-col gap-6">
        {/* Logo/Header */}
        <div className="flex items-center gap-2">
          <div className="size-6 bg-primary rounded flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-sm">forum</span>
          </div>
          <h1 className="font-semibold text-sm">Developer Forum</h1>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          <a
            className="flex items-center gap-2 px-2 py-1.5 rounded bg-hover-bg dark:bg-slate-800 text-sm font-medium"
            href="#"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            Home
          </a>
          <a
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-hover-bg dark:hover:bg-slate-800 text-sm font-medium text-text-muted dark:text-slate-400 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[18px]">
              leaderboard
            </span>
            Leaderboard
          </a>
        </nav>
        {/* New Thread Button */}
        <button className="w-full bg-primary hover:bg-primary/90 text-white rounded py-1.5 px-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Thread
        </button>
        {/* Categories */}
        <div className="flex flex-col gap-2 mt-4">
          <h2 className="text-xs font-semibold text-text-muted dark:text-slate-500 uppercase tracking-wider px-2">
            Categories
          </h2>
          <div className="flex flex-col gap-1">
            {[
              { color: 'bg-slate-400', name: '#general', count: 142 },
              { color: 'bg-blue-400', name: '#react', count: 89 },
              { color: 'bg-yellow-400', name: '#javascript', count: 256 },
              { color: 'bg-pink-400', name: '#css', count: 64 },
              { color: 'bg-purple-400', name: '#design', count: 112 },
            ].map((cat) => (
              <a
                key={cat.name}
                className="px-2 py-1 text-sm text-text-muted dark:text-slate-400 hover:bg-hover-bg dark:hover:bg-slate-800 rounded flex items-center justify-between group"
                href="#"
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                  {cat.name}
                </span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {cat.count}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* User Profile Area (Bottom) */}
      <div className="mt-auto p-4 border-t border-border-subtle dark:border-slate-800">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-hover-bg dark:hover:bg-slate-800 p-2 rounded -mx-2 transition-colors">
          <div
            className="w-8 h-8 rounded bg-gray-200 bg-cover bg-center"
            data-alt="User Avatar Profile Picture"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_Dt10fZY1gTG-ivAIw0-MmPIHSQcBJ1mFMitsgL50QzqFyKOrh3vJJNn9eF4o9SOicJK8RqxQWw0q3CkYKa8dtCyVEOvxUsE_TWbMvatE18fNae2qSS3XrN0LMZxvmISpUQg6hexGfcWjWLS8rHd5cDUOnc8FTQyIqECz8RfU9UiawXIGV__IEUydf7j4VqM2mVNKnG7V1ahEpYfRtgO9bJJ-yRvK-8h8c3yZ-M1cB-u2_qp5y598RPQrx8vVtccNX4TF_mXixi8')",
            }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-none">
              Alex Rivera
            </span>
            <span className="text-xs text-text-muted dark:text-slate-500 mt-1">
              @arivera
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
