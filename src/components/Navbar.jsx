import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function Navbar() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state);
  return (
    <header className="h-14 border-b border-border-subtle dark:border-slate-800 flex items-center px-6 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur z-10">
      <h2 className="font-medium text-[15px]">Discussions Forum</h2>
      <div className="ml-auto flex items-center gap-4">
        <button className="text-text-muted hover:text-text-main dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[20px]">💬</span>
        </button>
        {authUser && (
          <button
            className="bg-primary text-white text-xs px-4 py-1.5 rounded font-medium"
            onClick={() => dispatch(asyncUnsetAuthUser())}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
