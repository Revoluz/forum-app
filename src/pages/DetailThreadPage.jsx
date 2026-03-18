import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralVoteThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralVoteComment,
} from '../states/threadDetail/action';

import parse from 'html-react-parser';
import ThreadHeader from '../components/ThreadHeader';
import VoteButtons from '../components/VoteButtons';
import CommentInput from '../components/CommentInput';
import CommentItem from '../components/CommentItem';
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
function DetailThreadPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log('threadDetail:', threadDetail);

  useEffect(() => {
    // console.log('Fetching thread detail for threadId:', id);
    dispatch(asyncReceiveThreadDetail(id));
  }, [dispatch, id]);

  // TODO: Nanti pakai Redux dispatch
  const handleUpVoteThread = () => {
    if (threadDetail?.downVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralVoteThreadDetail(id));
    }
    // console.log('upvote thread:', id);
    dispatch(asyncToggleUpVoteThreadDetail(id));
  };
  const handleDownVoteThread = () => {
    if (threadDetail?.upVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralVoteThreadDetail(id));
    }
    dispatch(asyncToggleDownVoteThreadDetail(id));
  };
  const handleSubmitComment = (content) =>
    dispatch(asyncAddComment({ threadId: id, content }));
  const handleUpVoteComment = (commentId) => {
    if (
      threadDetail?.comments
        .find((c) => c.id === commentId)
        ?.downVotesBy.includes(authUser.id)
    ) {
      dispatch(asyncToggleNeutralVoteComment({ commentId }));
    }
    dispatch(asyncToggleUpVoteComment({ commentId }));
  };
  const handleDownVoteComment = (commentId) => {
    if (
      threadDetail?.comments
        .find((c) => c.id === commentId)
        ?.upVotesBy.includes(authUser.id)
    ) {
      dispatch(asyncToggleNeutralVoteComment({ commentId }));
    }
    dispatch(asyncToggleDownVoteComment({ commentId }));
  };
  if (!threadDetail) {
    return null;
  }

  console.log('threadDetail:', threadDetail);
  // console.log('threadDetail:', threadDetail);
  return (
    <main className="max-w-[720px] mx-auto px-6 py-12">
      {/* Header */}
      <ThreadHeader
        category={threadDetail?.category}
        title={threadDetail?.title}
        author={threadDetail?.owner}
        date={formatRelativeTime(threadDetail?.createdAt)}
      />

      {/* Body */}
      <div className="notion-content text-[16px] leading-[1.65] text-slate-800 dark:text-slate-300 mb-1 ">
        {parse(threadDetail?.body)}
      </div>

      {/* Thread Vote */}
      <div className="flex items-center gap-4 mb-16 py-6 border-t border-slate-100 dark:border-slate-800">
        <VoteButtons
          upVotes={threadDetail?.upVotesBy}
          downVotes={threadDetail?.downVotesBy}
          onUpVote={handleUpVoteThread}
          onDownVote={handleDownVoteThread}
          isUpVoted={threadDetail?.upVotesBy.includes(authUser.id)}
          isDownVoted={threadDetail?.downVotesBy.includes(authUser.id)}
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
          Comments ({threadDetail.comments.length})
        </h3>

        {/* Comment Input */}
        <CommentInput
          onSubmit={handleSubmitComment}
          isLoggedIn={!!authUser} // TODO: dari Redux auth
        />

        {/* Comment List */}
        <div className="space-y-1">
          {threadDetail.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              author={comment.owner}
              timeAgo={formatRelativeTime(comment.createdAt)}
              content={comment.content}
              upVotes={comment.upVotesBy}
              downVotes={comment.downVotesBy}
              onUpVote={() => handleUpVoteComment(comment.id)}
              onDownVote={() => handleDownVoteComment(comment.id)}
              isUpVoted={comment.upVotesBy.includes(authUser.id)}
              isDownVoted={comment.downVotesBy.includes(authUser.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default DetailThreadPage;
