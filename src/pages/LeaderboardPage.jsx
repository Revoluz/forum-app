import LeaderboardRow from '../components/LeaderboardRow';

// TODO: Nanti data ini dari Redux store (asyncGetLeaderboard)
const DUMMY_DATA = [
  {
    rank: 1,
    name: 'Alex Chen',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIMHgJM0yXIQe1q7ENtdgWsICEBWTJtyI2vO6_7AanN-dxNR5Aj6LWEzp_H2UUBjE2TuYKNfVlbIjLCGzuBypOLy6tNaW4pfWXrcrzoKCHia1SRFQhHxyt1VbshnyRxqrIQ5KVksNqHWQusHyZ42j7EKcZ3icqk5eMneswc_M9IwmI-xayLGerxYopiMLANcApW3uMbZBEUUIeVCIz58tu2EHcWYsUTZCN4Due6joxUA0nwe3wPUmjKpZciDAt9VhxkGvFio_hthI',
    score: 12500,
    badge: 'Moderator',
  },
  {
    rank: 2,
    name: 'Sarah Jenks',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUa48muHfApbYCvPptylQw_KWwQrFzFXYQXCd_DL0CXVCLwp3zVrSRBFFheyd0ERqlpv6v_P7LBYQTejRCUFKc6L4fVrT5ZaewLdtHvHFYxZeGHjL4U8EH3Vdgt1ZC6D-dSyGedDguBYGCraHAVfWt8XwnrSB5zCIQ1Tlct11wHmhhim49BQJZxWVBnL5YkS467Eb_pvvhjHHEC82IhkeZwFpS40Z8bKomrJR0XoRLgO5t9Yj-q3t7jM4BVN-nwb8uipTzISSPF_c',
    score: 8420,
    badge: null,
  },
  {
    rank: 3,
    name: 'Marcus Ray',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1m03UdflRGYgmMdMbUFZMvIp2IjqKzCIN-lKRWlAWPp7oXy0f_8zaFmuOb3K3YAo8nLrf2GA_8x0lnlz6j2b1nZLetlAmDWAM_c2DR46CKRGxfR6yV9JSXvQlM5VQak6NVIquTXaH_PxD0APjYE5-WW4pmPDubtXGGbNRrDL2M6_2P0sZ6mS6P2GRsbCcyacIae5w7x6tDOSTHS8Nx5diNsEfDLN-yJzqgFuLglX-yraKLb-UwLPJROPKn8z7lVR6-Es1E-EV4GQ',
    score: 6105,
    badge: null,
  },
  {
    rank: 4,
    name: 'Elena Rodriguez',
    avatar: null,
    score: 4890,
    badge: null,
  },
  {
    rank: 5,
    name: 'David Kim',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD2ALkaiNKZ0sHc-8b4rA5PoOWAjeNgA-q2eWWpreOijCkYZFlgrjidHE2how0KEJioUV8zybat3io2_CIrvp5LeZxe7KddjCvx4rT4czv7syWS4lpRo1nIl5RFpu-EoGHX5UqJORxSEqtV29104vdx-JC_FIfwYqR5NwWjhH8B9k9wReVY9eGhE-0iCiB03yuPVeLo_zkIS84IYhILFRaW09flbdwp2V8sb2kiUmBEPGMtMRgSIfYVpcumUyHa1q9g60NXVpNk6N8',
    score: 3250,
    badge: null,
  },
  {
    rank: 6,
    name: 'Jessica Wong',
    avatar: null,
    score: 2980,
    badge: null,
  },
];

function LeaderboardPage() {
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
            {DUMMY_DATA.map((item) => (
              <LeaderboardRow
                key={item.rank}
                rank={item.rank}
                name={item.name}
                avatar={item.avatar}
                score={item.score}
                badge={item.badge}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-text-main-dark hover:bg-hover-light dark:hover:bg-hover-dark rounded transition-colors"
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default LeaderboardPage;
