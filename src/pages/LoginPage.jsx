import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import FormInput from '../components/FormInput';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: dispatch asyncLogin
    console.log({ email, password });
  };

  return (
    <AuthCard>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mt-2 w-full h-10 bg-notion-text dark:bg-primary text-white rounded-btn text-sm font-medium hover:bg-opacity-90 transition-opacity"
        >
          Continue
        </button>
      </form>
      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px bg-notion-border dark:bg-slate-700 flex-1" />
        <span className="text-xs text-notion-gray dark:text-slate-400 ">
          or
        </span>
        <div className="h-px bg-notion-border dark:bg-slate-700 flex-1" />
      </div>
      <p className="text-center text-sm text-notion-gray dark:text-slate-400 ">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="text-notion-text dark:text-primary font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthCard>
  );
}

export default LoginPage;
