import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import FormInput from '../components/FormInput';
import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import { asyncRegister } from '../states/users/action';

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async ({ name, email, password }) => {
    try {
      await dispatch(asyncRegister({ name, email, password }));
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <AuthCard>
      <form className="flex flex-col gap-4">
        <FormInput
          label="Name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={onNameChange}
          required
        />
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={onEmailChange}
          required
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={onPasswordChange}
          required
        />
        <button
          type="button"
          className="mt-2 w-full h-10 bg-notion-text dark:bg-primary text-white rounded-btn text-sm font-medium hover:bg-opacity-90 transition-opacity"
          onClick={() => handleSubmit({ name, email, password })}
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
