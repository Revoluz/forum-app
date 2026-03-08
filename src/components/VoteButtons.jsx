import PropTypes from 'prop-types';

function VoteButtons({
  upVotes,
  downVotes,
  onUpVote,
  onDownVote,
  isUpVoted,
  isDownVoted,
}) {
  return (
    <div className="flex bg-notion-subtle dark:bg-slate-900/50 rounded-md p-0.5 border border-slate-200 dark:border-slate-800">
      <button
        type="button"
        onClick={onUpVote}
        className={`flex items-center gap-1.5 px-3 py-1 hover:bg-white dark:hover:bg-slate-800 rounded transition-all text-xs font-semibold ${
          isUpVoted ? 'text-primary' : 'text-slate-600 dark:text-slate-400'
        }`}
      >
        <span className="material-symbols-outlined text-sm">thumb_up</span>
        <span>{upVotes}</span>
      </button>

      <div className="w-[1px] bg-slate-200 dark:bg-slate-800 my-1 mx-0.5" />

      <button
        type="button"
        onClick={onDownVote}
        className={`flex items-center gap-1.5 px-3 py-1 hover:bg-white dark:hover:bg-slate-800 rounded transition-all text-xs font-semibold ${
          isDownVoted ? 'text-red-500' : 'text-slate-500'
        }`}
      >
        <span className="material-symbols-outlined text-sm">thumb_down</span>
        <span>{downVotes}</span>
      </button>
    </div>
  );
}

VoteButtons.propTypes = {
  upVotes: PropTypes.number.isRequired,
  downVotes: PropTypes.number.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  isUpVoted: PropTypes.bool,
  isDownVoted: PropTypes.bool,
};

VoteButtons.defaultProps = {
  isUpVoted: false,
  isDownVoted: false,
};

export default VoteButtons;
