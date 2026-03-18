import PropTypes from 'prop-types';
import VoteButtons from './VoteButtons';
import parse from 'html-react-parser';

function CommentItem({
  author,
  timeAgo,
  content,
  upVotes,
  downVotes,
  onUpVote,
  onDownVote,
  isUpVoted,
  isDownVoted,
}) {
  return (
    <div className="p-4 bg-white dark:bg-slate-900/40 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all group">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <img
            alt={author.name}
            className="w-6 h-6 rounded-sm object-cover"
            src={author.avatar}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold">{author.name}</span>
              <span className="text-[10px] text-slate-400">{timeAgo}</span>
            </div>
            <p className="text-sm mt-1.5 text-slate-700 dark:text-slate-300 leading-relaxed">
              {parse(content)}
            </p>
          </div>
        </div>

        {/* Vote - muncul saat hover */}
        <div className="opacity-50 group-hover:opacity-100 transition-opacity">
          <VoteButtons
            upVotes={upVotes}
            downVotes={downVotes}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
            isUpVoted={isUpVoted}
            isDownVoted={isDownVoted}
          />
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  // shape berfungsi untuk mendefinisikan bentuk objek author yang memiliki properti name dan avatar
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  timeAgo: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  upVotes: PropTypes.number.isRequired,
  downVotes: PropTypes.number.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  isUpVoted: PropTypes.bool,
  isDownVoted: PropTypes.bool,
};

CommentItem.defaultProps = {
  isUpVoted: false,
  isDownVoted: false,
};

export default CommentItem;
