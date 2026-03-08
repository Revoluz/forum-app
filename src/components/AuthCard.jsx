import PropTypes from 'prop-types';

function AuthCard({ children }) {
  return (
    <main className="flex-1 w-full max-w-[400px] mx-auto mt-6 px-6 py-12 flex flex-col gap-6 bg-notion-bg dark:bg-background-dark shadow-sm ">
      {/* Logo */}
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="material-symbols-outlined text-4xl text-notion-text dark:text-slate-100 mb-2">
          forum
        </span>
        <h1 className="text-2xl font-bold tracking-tight">Forum</h1>
        <p className="text-notion-gray dark:text-slate-400 text-sm">
          Join the conversation
        </p>
      </div>

      {/* Form Content */}
      {children}
    </main>
  );
}

AuthCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthCard;
