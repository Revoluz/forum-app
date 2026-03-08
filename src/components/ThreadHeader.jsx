import PropTypes from 'prop-types';

function ThreadHeader({ category, title, author, date, readTime }) {
  return (
    <header className="mb-10 group">
      <div className="mb-4">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
          {category}
        </span>
      </div>

      <h2 className="text-4xl font-bold leading-[1.2] mb-6 text-slate-900 dark:text-slate-50 tracking-tight">
        {title}
      </h2>

      <div className="flex items-center justify-between py-4 border-y border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <img
            alt={author.name}
            className="w-6 h-6 rounded-full object-cover"
            src={author.avatar}
          />
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-slate-900 dark:text-slate-200">
              {author.name}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 dark:text-slate-400">{date}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 dark:text-slate-400">
              {readTime}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400"
        >
          <span className="material-symbols-outlined text-lg">more_horiz</span>
        </button>
      </div>
    </header>
  );
}

ThreadHeader.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  date: PropTypes.string.isRequired,
  readTime: PropTypes.string.isRequired,
};

export default ThreadHeader;
