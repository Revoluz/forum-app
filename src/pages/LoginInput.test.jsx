/**
 * skenario testing
 *
 * - LoginInput page
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginPage from './LoginPage';
import store from '../states';
import { MemoryRouter } from 'react-router-dom';
expect.extend(matchers);
import * as authUserActions from '../states/authUser/action';

import { Provider } from 'react-redux';
describe('LoginInput page', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );
    const emailInput = await screen.getByPlaceholderText('Enter your email');

    // Action
    await userEvent.type(emailInput, 'test@gmail.com');

    // Assert
    expect(emailInput).toHaveValue('test@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );
    const passwordInput = await screen.getByPlaceholderText(
      'Enter your password'
    );

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // Spy on asyncSetAuthUser
    const spy = vi
      .spyOn(authUserActions, 'asyncSetAuthUser')
      .mockReturnValue({ type: 'DUMMY' });
    // Mock dispatch
    store.dispatch = vi.fn();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );
    const emailInput = await screen.getByPlaceholderText('Enter your email');
    const passwordInput = await screen.getByPlaceholderText(
      'Enter your password'
    );
    const loginButton = await screen.getByRole('button', { name: 'Continue' });

    // Action
    await userEvent.type(emailInput, 'test@gmail.com');
    await userEvent.type(passwordInput, 'passwordtest');
    await userEvent.click(loginButton);

    // Assert
    // Pastikan asyncSetAuthUser dipanggil dengan benar
    expect(spy).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      password: 'passwordtest',
    });
    // Pastikan dispatch dipanggil
    expect(store.dispatch).toHaveBeenCalled();
  });
});
