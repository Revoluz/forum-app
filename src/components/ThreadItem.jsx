import React from 'react';
import ColorHash from 'color-hash';
import PropTypes from 'prop-types';
function stripHtml(html = '') {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

function truncateText(text = '', maxLength = 120) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}
function formatRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  const units = [
    { label: 'tahun', seconds: 60 * 60 * 24 * 365 },
    { label: 'bulan', seconds: 60 * 60 * 24 * 30 },
    { label: 'hari', seconds: 60 * 60 * 24 },
    { label: 'jam', seconds: 60 * 60 },
    { label: 'menit', seconds: 60 },
    { label: 'detik', seconds: 1 },
  ];

  for (const unit of units) {
    const value = Math.floor(diffInSeconds / unit.seconds);
    if (value >= 1) {
      return `${value} ${unit.label} lalu`;
    }
  }

  return 'baru saja';
}
function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  totalComments,
  upVotesBy,
  downVotesBy,
  user,
}) {
  const colorHash = new ColorHash();
  const bg = colorHash.hex(category);

  const plainBody = stripHtml(body);
  const previewBody = truncateText(plainBody, 140);
  return (
    <a href={`/threads/${id}`}>
      <article className="group flex gap-4 p-4 rounded hover:bg-sidebar-light dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-border-subtle dark:hover:border-slate-700 cursor-pointer">
        {/* Voting */}
        <div className="flex flex-col items-center gap-1 text-text-muted shrink-0 w-8">
          <button className="hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              keyboard_arrow_up
            </span>
          </button>
          <span className="text-sm font-medium text-text-main dark:text-slate-300">
            {upVotesBy.length - downVotesBy.length}
          </span>
          <button className="hover:text-red-500 transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              keyboard_arrow_down
            </span>
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[11px] px-1.5 py-0.5 rounded  bg-[#${category}] font-medium`}
              style={{ backgroundColor: bg, color: '#fff' }}
            >
              {`#${category}`}
            </span>
            <h3 className="font-semibold text-[15px] truncate text-text-main dark:text-slate-100">
              {title}
            </h3>
          </div>
          <p className="text-[13px] text-text-muted dark:text-slate-400 line-clamp-2 mb-3">
            {/* Placeholder for thread summary */}
            {previewBody}
          </p>
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-text-muted dark:text-slate-500">
            <div className="flex items-center gap-1.5">
              <div
                className="w-4 h-4 rounded-full bg-cover bg-center"
                data-alt="Author avatar small"
                style={{ backgroundImage: `url('${user.avatar}')` }}
              />
              <span>{user.name}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-border-subtle" />
            <span>{formatRelativeTime(createdAt)}</span>
            <span className="w-1 h-1 rounded-full bg-border-subtle" />
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                chat_bubble
              </span>
              <span>{totalComments} comments</span>
            </div>
          </div>
        </div>
        <hr className="border-border-subtle dark:border-slate-700 " />
      </article>
    </a>
  );
}

export default ThreadItem;

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};
