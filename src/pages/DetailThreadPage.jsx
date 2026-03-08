import ThreadHeader from '../components/ThreadHeader';
import VoteButtons from '../components/VoteButtons';
import CommentInput from '../components/CommentInput';
import CommentItem from '../components/CommentItem';

// TODO: Nanti dari Redux store
const DUMMY_THREAD = {
  category: 'Engineering',
  title: 'Architecting Scalable Microservices with Event Sourcing and DDD',
  author: {
    name: 'Alex Rivera',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDT5w-w1OPWiBvlcQycrchZrvZX3Yf_4pXaVRtmrI-77snne9gRtZQCJnH4YFxsGqDOEQJPO284y8Yu0NzcDolDoVFqJBUh0pUUm4c8gDhO-25xjyf9cM0EegsC8i9ZQzeCO3HrL9HmkeeFe92M5625xtpb2e87tj0EieeCvymggdpClE_c6i-zRx9r4MkWFYEQvatGE-Zkz_yr41aSzv019BPdiMhyPzn3YeDcyP3lKm-yDQF8vz_w-a0kBgiBKA-ZUmj0WdRAFuc',
  },
  date: 'Oct 24, 2023',
  readTime: '8 min read',
  upVotes: 124,
  downVotes: 12,
};

const DUMMY_COMMENTS = [
  {
    id: 'c1',
    author: {
      name: 'James Chen',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCuMMexf3J_EsvV8oPhLcdR6_pndRF1DEHkq_Q981UapdTqr36JhgcyjGUdQrAPpN8UR7RUc8N8JBIly73NhZx1hZBr1r3kgdFetEHaohcxtyso4xuSr5QxMGWbC2ccMXe9v8LQ7slgODgobYC6YN99Eo3UyfvawzrbM281N50356eNIPOFsxrs3bKodsD2V15fHl_hzc2_PNqK3KXC_KdBK5sEiTnP_20P1_KpqIueErl1AQHQfVhxyWiTDXa0Flb8wS2eoQSKxBk',
    },
    timeAgo: '2h ago',
    content:
      'This is a great write-up, Alex. How are you handling event schema evolution?',
    upVotes: 18,
    downVotes: 0,
  },
  {
    id: 'c2',
    author: {
      name: 'Sarah Miller',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBI_LDfW5lv9U8fftPQ_V4CjQNK4MKBXcPJbDZ5Nf_osrHDcXshIsPDH9PyPQy2lu0bWV38ODNMwitzcu4UbjZgHtB1XA2EtHUSZpuqbfzOwPpiJOrlzRd1gVSpsSVz7xG9AvKucEHS2gWVuc6PJrJbTJYW4WIY4_J1hKw6GqZow8ywlWNVxMNku7VBm5-C71dYxVUVS5whbLJ6nIgMfLyEqD_snulMhTv18n6QbYRQLCR35KSwMTIJxZR1Fhka67oFrhrPT2maT_E',
    },
    timeAgo: '5h ago',
    content:
      'Event sourcing definitely adds overhead, but the "time travel" debugging capability is worth its weight in gold.',
    upVotes: 42,
    downVotes: 1,
  },
];

function DetailThreadPage() {
  // TODO: Nanti pakai Redux dispatch
  const handleUpVoteThread = () => console.log('upvote thread');
  const handleDownVoteThread = () => console.log('downvote thread');
  const handleSubmitComment = (content) => console.log('comment:', content);
  const handleUpVoteComment = (id) => console.log('upvote comment', id);
  const handleDownVoteComment = (id) => console.log('downvote comment', id);

  return (
    <main className="max-w-[720px] mx-auto px-6 py-12">
      {/* Header */}
      <ThreadHeader
        category={DUMMY_THREAD.category}
        title={DUMMY_THREAD.title}
        author={DUMMY_THREAD.author}
        date={DUMMY_THREAD.date}
        readTime={DUMMY_THREAD.readTime}
      />

      {/* Body */}
      <div className="notion-content text-[16px] leading-[1.65] text-slate-800 dark:text-slate-300 mb-12 space-y-4">
        <p>
          Over the past few months, our team has been transitioning from a
          monolithic architecture to a distributed microservices environment.
        </p>
        <p>
          We decided to implement <strong>Event Sourcing</strong>. Instead of
          storing just the current state of our entities, we store every change
          as immutable events.
        </p>
      </div>

      {/* Thread Vote */}
      <div className="flex items-center gap-4 mb-16 py-6 border-t border-slate-100 dark:border-slate-800">
        <VoteButtons
          upVotes={DUMMY_THREAD.upVotes}
          downVotes={DUMMY_THREAD.downVotes}
          onUpVote={handleUpVoteThread}
          onDownVote={handleDownVoteThread}
        />
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-notion-subtle dark:hover:bg-slate-800 rounded transition-colors text-xs font-semibold text-slate-600 dark:text-slate-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
        >
          <span className="material-symbols-outlined text-sm text-accent-earth">
            share
          </span>
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      <section className="bg-sidebar-light dark:bg-slate-900/20 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-widest text-accent-earth mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-base">forum</span>
          Comments ({DUMMY_COMMENTS.length})
        </h3>

        {/* Comment Input */}
        <CommentInput
          onSubmit={handleSubmitComment}
          isLoggedIn={false} // TODO: dari Redux auth
        />

        {/* Comment List */}
        <div className="space-y-1">
          {DUMMY_COMMENTS.map((comment) => (
            <CommentItem
              key={comment.id}
              author={comment.author}
              timeAgo={comment.timeAgo}
              content={comment.content}
              upVotes={comment.upVotes}
              downVotes={comment.downVotes}
              onUpVote={() => handleUpVoteComment(comment.id)}
              onDownVote={() => handleDownVoteComment(comment.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default DetailThreadPage;
