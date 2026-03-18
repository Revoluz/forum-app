import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ColorHash from 'color-hash';
import { NavLink } from 'react-router-dom';
function Sidebar({ categories = [] }) {
  console.log('Sidebar categories:', categories);
  const colorHash = new ColorHash();
  const navBaseClass =
    'flex items-center gap-2 px-2 py-1.5 rounded text-sm font-medium transition-colors';
  const navActiveClass =
    'bg-hover-bg dark:bg-slate-800 text-text-main dark:text-slate-100';
  const navInactiveClass =
    'text-text-muted dark:text-slate-400 hover:bg-hover-bg dark:hover:bg-slate-800';

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
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${navBaseClass} ${isActive ? navActiveClass : navInactiveClass}`
            }
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            Home
          </NavLink>

          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `${navBaseClass} ${isActive ? navActiveClass : navInactiveClass}`
            }
          >
            <span className="material-symbols-outlined text-[18px]">
              leaderboard
            </span>
            Leaderboard
          </NavLink>
        </nav>
        {/* New Thread Button */}
        <Link to="/create">
          <button className="w-full bg-primary hover:bg-primary/90 text-white rounded py-1.5 px-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Thread
          </button>
        </Link>
        {/* Categories */}
        <div className="flex flex-col gap-2 mt-4">
          <h2 className="text-xs font-semibold text-text-muted dark:text-slate-500 uppercase tracking-wider px-2">
            Categories
          </h2>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                className="px-2 py-1 text-sm text-text-muted dark:text-slate-400 hover:bg-hover-bg dark:hover:bg-slate-800 rounded flex items-center justify-between group"
                to={`/categories/${cat.name}`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full `}
                    style={{
                      backgroundColor: colorHash.hex(cat.name),
                      color: '#fff',
                    }}
                  />
                  {cat.name}
                </span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {cat.count}
                </span>
              </Link>
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
