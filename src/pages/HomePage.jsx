import React from 'react';
import ThreadItem from '../components/ThreadItem';

function HomePage() {
  // Example data, replace with real data as needed
  const threads = [
    {
      tag: '#react',
      tagColor:
        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      title: 'Best practices for React Context API in 2024',
      author: 'Sarah Chen',
      authorAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuATVdWfFnQ57IIZ_cHDdxnIJN0njsCQhJuBNi_ae2KlNXdRAbHpaF40YSLjiRtELMtluuUPeO4gKwRdkHdxtXrDUk2K8Isdlqy-_Vmf2XZRzYWX6KGIXkGCHOhlLeM5JQFDXJjZ7r4k8BVL4nG4wgyZaHiZFdkC0TVY4QTrCdwJITMp8vE0H9O7ocnUqqIORv91HaCsCM8_vjR0Jq4EurkBo6fA9jHzXC8-KO8B9dGlDiyHmUZnI6wlx5SQZ0GS066dhJCH8vRT-bI',
      time: '2 hours ago',
      comments: 12,
      votes: 42,
    },
    {
      tag: '#javascript',
      tagColor:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      title: 'Understanding new Array methods: toSorted, toReversed',
      author: 'David Kim',
      authorAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuATSKheHLNhBEOLkDcQThBGB0rJHq-73WPGmFMQMN1nlU6o2W8NPMUtV_YyT9mpzCFXsZoKoHBwShIGtnS-iaqmhVhYvk9ocWVEbDiU6aScIYFteBMGa3KvMfmdIrRnZwHeRxj2Pdlcj8lg-q3al4jzKEEtW7bpbIAcdbV1vhfv8Uw8z-U-_zgTRwdG_WWPy-1nToh6wfKWI22F4YjxfpZnGbGO-xNmP7bZLZB34MXjo_ESwxpzsbyx8lkEVZCINoRswWimSoW93IQ',
      time: '5 hours ago',
      comments: 45,
      votes: 128,
    },
    {
      tag: '#general',
      tagColor: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      title: 'Show off your dev setup (2024 edition)',
      author: 'Emily Wong',
      authorAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAiXBkrN8h4f8AG44oW9WEWEzhfHTS6C8qJ98tOlxmRAJoyLeLKkeVjLm60bIg2YX3BYNyZTmgQKqaRHwMNpSEccb5-s5I7Kx9VYyUsUSQL46t6dektVgAu3lMjCrlFz4pzlGFJeD1l0-53Tq6v2QkALkZJNAC7zI0HQPTYU-5qSRRaOHzcG_BVYzbzpQhtjfH7cHq4ZDC9vmgXXDZPTMcNgyH6xW6Mxwr06Q_ZLZnxXFtuXNnDHV9qnoePvDeFpVLdKbSOaIbew9w',
      time: '1 day ago',
      comments: 89,
      votes: 15,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Filters */}
      <div className="flex items-center gap-4 mb-6 text-sm text-text-muted dark:text-slate-400">
        <button className="font-medium text-text-main dark:text-slate-200 border-b-2 border-primary pb-1">
          Latest
        </button>
        <button className="hover:text-text-main dark:hover:text-slate-200 pb-1 border-b-2 border-transparent hover:border-border-subtle transition-colors">
          Top
        </button>
        <button className="hover:text-text-main dark:hover:text-slate-200 pb-1 border-b-2 border-transparent hover:border-border-subtle transition-colors">
          Unanswered
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {/* {threads.map((thread, idx) => (
          <ThreadItem key={idx} {...thread} />
        ))} */}
        {threads.map((thread, idx) => (
          <>
            <ThreadItem key={idx} {...thread} />
            <hr className="border-border-subtle dark:border-slate-700 " />
          </>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
