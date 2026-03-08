import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import FormInput from '../components/FormInput';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: dispatch asyncRegister
    console.log({ name, email, password });
  };

  return (
    <AuthCard>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          label="Name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          Create Account
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
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-notion-text dark:text-primary font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}

export default RegisterPage;
