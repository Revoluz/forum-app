import PropTypes from 'prop-types';

const rankBorderColor = {
  1: 'border-l-amber-300',
  2: 'border-l-gray-400',
  3: 'border-l-amber-600',
};

function LeaderboardRow({ index, name, avatar, score, badge }) {
  const borderColor = rankBorderColor[index] || 'border-l-transparent';
  const isTopThree = index <= 3;

  return (
    <tr
      className={`hover:bg-hover-light dark:hover:bg-hover-dark transition-colors    border-l-4 border ${borderColor} group cursor-pointer`}
    >
      {/* Rank */}
      <td className="px-6 py-4 font-mono text-text-muted-light dark:text-text-muted-dark font-medium">
        #{index}
      </td>

      {/* Contributor */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
          )}
          <span className="font-medium group-hover:text-primary transition-colors">
            {name}
          </span>
          {badge && (
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium ml-2">
              {badge}
            </span>
          )}
        </div>
      </td>

      {/* Score */}
      <td
        className={`px-6 py-4 text-right font-mono font-medium ${
          isTopThree ? '' : 'text-text-muted-light dark:text-text-muted-dark'
        }`}
      >
        {score.toLocaleString()}
      </td>
    </tr>
  );
}

LeaderboardRow.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  score: PropTypes.number.isRequired,
  badge: PropTypes.string,
};

LeaderboardRow.defaultProps = {
  avatar: null,
  badge: null,
};

export default LeaderboardRow;
