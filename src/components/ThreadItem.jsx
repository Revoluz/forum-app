import React from 'react';

function ThreadItem({
  tag,
  tagColor,
  title,
  author,
  authorAvatar,
  time,
  comments,
  votes,
}) {
  return (
    <article className="group flex gap-4 p-4 rounded hover:bg-sidebar-light dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-border-subtle dark:hover:border-slate-700 cursor-pointer">
      {/* Voting */}
      <div className="flex flex-col items-center gap-1 text-text-muted shrink-0 w-8">
        <button className="hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[20px]">
            keyboard_arrow_up
          </span>
        </button>
        <span className="text-sm font-medium text-text-main dark:text-slate-300">
          {votes}
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
            className={`text-[11px] px-1.5 py-0.5 rounded ${tagColor} font-medium`}
          >
            {tag}
          </span>
          <h3 className="font-semibold text-[15px] truncate text-text-main dark:text-slate-100">
            {title}
          </h3>
        </div>
        <p className="text-[13px] text-text-muted dark:text-slate-400 line-clamp-2 mb-3">
          {/* Placeholder for thread summary */}
        </p>
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-text-muted dark:text-slate-500">
          <div className="flex items-center gap-1.5">
            <div
              className="w-4 h-4 rounded-full bg-cover bg-center"
              data-alt="Author avatar small"
              style={{ backgroundImage: `url('${authorAvatar}')` }}
            />
            <span>{author}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-border-subtle" />
          <span>{time}</span>
          <span className="w-1 h-1 rounded-full bg-border-subtle" />
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">
              chat_bubble
            </span>
            <span>{comments} comments</span>
          </div>
        </div>
      </div>
      <hr className="border-border-subtle dark:border-slate-700 " />
    </article>
  );
}

export default ThreadItem;
