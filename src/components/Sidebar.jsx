import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ColorHash from 'color-hash';
import { NavLink } from 'react-router-dom';
function Sidebar({ categories = [] }) {
  const { authUser } = useSelector((state) => state);
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
        {authUser ? (
          <Link to="/create">
            <button className="w-full bg-primary hover:bg-primary/90 text-white rounded py-1.5 px-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Thread
            </button>
          </Link>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-[11px] text-text-muted dark:text-slate-500 font-medium px-1">
              Want to share your thoughts?
            </p>
            <Link to="/login">
              <button className="w-full bg-primary hover:bg-primary/90 text-white rounded py-2 px-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm">
                Join the Discussion
              </button>
            </Link>
          </div>
        )}
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
                to={`/?category=${cat.name}`}
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
              backgroundImage: `url(${
                authUser?.avatar ||
                'https://ui-avatars.com/api/?name=Guest&background=random'
              })`,
            }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-none">
              {authUser?.name || 'Guest User'}
            </span>
            <span className="text-xs text-text-muted dark:text-slate-500 mt-1">
              {authUser?.username ? `@${authUser.username}` : '@guest'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
