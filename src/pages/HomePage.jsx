import React, { useEffect, useState, useMemo } from 'react';
import ThreadItem from '../components/ThreadItem';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateThreadAndUsers } from '../states/shared/action';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function HomePage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const {
    threads = [],
    users = [],
    authUser = null,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncPopulateThreadAndUsers());
  }, [dispatch]);
  const threadList = threads.map((thread) => ({
    ...thread,
    authUser: authUser.id,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  const [sortBy, setSortBy] = useState('latest');
  const sortedThreads = useMemo(() => {
    if (sortBy === 'latest') {
      return [...threadList]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .filter((thread) => {
          if (!category) return true;
          return thread.category === category;
        });
    } else if (sortBy === 'top') {
      return [...threadList]
        .sort(
          (a, b) =>
            b.upVotesBy.length -
            b.downVotesBy.length -
            (a.upVotesBy.length - a.downVotesBy.length)
        )
        .filter((thread) => {
          if (!category) return true;
          return thread.category === category;
        });
    }
    return threadList;
  }, [threadList, sortBy, category]);
  return (
    <>
      <Helmet>
        <title>Forum Diskusi — Home</title>
        <meta name="description" content="Forum diskusi untuk masyarakat." />
        <meta name="og:title" content="Forum Diskusi" />
        <meta name="og:description" content="Forum diskusi untuk masyarakat." />
      </Helmet>

      <div className="max-w-4xl mx-auto p-6">
        {/* Visitor Mode Banner */}
        {!authUser && (
          <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-primary">
                Visitor Mode
              </h3>
              <p className="text-xs text-text-muted dark:text-slate-400">
                Log in to create threads, vote on discussions, and join the
                conversation.
              </p>
            </div>
            <Link
              to="/login"
              className="bg-primary text-white text-xs px-4 py-1.5 rounded font-medium"
            >
              Create Account
            </Link>
          </div>
        )}
        {/* Filters */}
        <div className="flex items-center gap-4 mb-6 text-sm text-text-muted dark:text-slate-400">
          <button
            type="button"
            className={
              sortBy === 'latest'
                ? 'font-medium text-text-main dark:text-slate-200 border-b-2 border-primary pb-1'
                : 'hover:text-text-main dark:hover:text-slate-200 pb-1 border-b-2 border-transparent hover:border-border-subtle transition-colors'
            }
            onClick={() => setSortBy('latest')}
          >
            Latest
          </button>
          <button
            type="button"
            className={
              sortBy === 'top'
                ? 'font-medium text-text-main dark:text-slate-200 border-b-2 border-primary pb-1'
                : 'hover:text-text-main dark:hover:text-slate-200 pb-1 border-b-2 border-transparent hover:border-border-subtle transition-colors'
            }
            onClick={() => setSortBy('top')}
          >
            Top
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {sortedThreads.map((thread) => (
            <>
              <ThreadItem key={thread.id} {...thread} />
              <hr className="border-border-subtle dark:border-slate-700 " />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
