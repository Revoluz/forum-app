import { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function CommentInput({ onSubmit, isLoggedIn }) {
  const [comment, onCommentChange] = useInput('');

  return (
    <div className="mb-10 bg-white dark:bg-background-dark rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden focus-within:border-accent-earth transition-colors">
      <form action="">
        <textarea
          className="w-full border-none p-4 text-sm focus:ring-0 placeholder-slate-400 bg-transparent min-h-[100px] resize-none"
          placeholder={
            isLoggedIn ? 'Type your response...' : 'Login to leave a comment'
          }
          value={comment}
          onChange={onCommentChange}
          disabled={!isLoggedIn}
        />
        <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 font-medium">
            HTML TAG supported
          </span>
          <button
            type="button"
            disabled={!isLoggedIn || !comment.trim()}
            onClick={() => {
              onSubmit(comment);
              onCommentChange({ target: { value: '' } });
            }}
            className="bg-primary dark:bg-slate-200 text-white dark:text-slate-900 px-4 py-1.5 rounded text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}

CommentInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
};

CommentInput.defaultProps = {
  isLoggedIn: false,
};

export default CommentInput;
