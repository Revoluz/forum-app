import PropTypes from 'prop-types';
import ColorHash from 'color-hash';

function formatRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);
  // console.log('date:', date, 'now:', now, 'diffInSeconds:', diffInSeconds);

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
function ThreadHeader({ category, title, author, date }) {
  const colorHash = new ColorHash();
  const bg = colorHash.hex(category);
  return (
    <header className="mb-10 group">
      <div className="mb-4">
        <span
          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#${category}]"
          style={{ backgroundColor: bg, color: '#fff' }}
        >
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
          <div className="  items-center gap-2 text-sm">
            <span className="font-medium text-slate-900 dark:text-slate-200">
              {author.name}
            </span>
            <br></br>
            <p className="text-slate-500 dark:text-slate-400">
              {formatRelativeTime(date)}
            </p>
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
