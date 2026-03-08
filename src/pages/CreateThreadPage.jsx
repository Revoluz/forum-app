import React from 'react';

function CreateThreadPage() {
  return (
    <main className="flex-1 w-full max-w-[720px] mx-auto px-6 py-12 flex flex-col gap-6">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Create New Thread</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Start a new discussion topic
        </p>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <input
          className="w-full bg-transparent border-none p-0 text-[28px] font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:ring-0 focus:outline-none"
          placeholder="Untitled"
          type="text"
        />
        <div className="relative group">
          <div className="flex items-center gap-2 group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined text-[18px] text-slate-400 dark:text-slate-500 group-focus-within:text-primary">
              tag
            </span>
            <input
              className="w-full bg-transparent border-none p-0 text-sm font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-0 focus:outline-none"
              placeholder="Add category..."
              type="text"
            />
          </div>
        </div>
        <textarea
          className="w-full flex-1 bg-transparent border-none p-0 text-[15px] leading-[1.8] placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-0 focus:outline-none resize-none min-h-[400px]"
          placeholder="Start writing your thoughts..."
        ></textarea>
      </div>
      <div className="flex items-center justify-end gap-4 pt-6 mt-auto border-t border-slate-200 dark:border-slate-800">
        <button className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors px-4 py-2">
          Cancel
        </button>
        <button className="bg-primary text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
          Publish Thread
        </button>
      </div>
    </main>
  );
}
export default CreateThreadPage;
