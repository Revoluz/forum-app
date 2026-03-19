import LeaderboardRow from '../components/LeaderboardRow';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboard } from '../states/leaderboard/action';

function LeaderboardPage() {
  const { leaderboard = [] } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboard());
  }, [dispatch]);
  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-text-muted-light dark:text-text-muted-dark text-base">
          Top contributors making an impact in the community.
        </p>
      </div>

      {/* Table */}
      <div className="border border-border-light dark:border-border-dark rounded-lg overflow-hidden bg-surface-light dark:bg-surface-dark">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-xs text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
              <th className="px-6 py-3 font-medium w-24">Rank</th>
              <th className="px-6 py-3 font-medium">Contributor</th>
              <th className="px-6 py-3 font-medium text-right">Score</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-border-light dark:divide-border-dark">
            {leaderboard.map((data, index) => (
              <LeaderboardRow
                key={data.user.id}
                index={index + 1}
                name={data.user.name}
                avatar={data.user.avatar}
                score={data.score}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More */}
      {/* <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-text-main-dark hover:bg-hover-light dark:hover:bg-hover-dark rounded transition-colors"
        >
          Load More
        </button>
      </div> */}
    </div>
  );
}

export default LeaderboardPage;
