/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the authUser when given by SET_AUTH_USER action
 *  - should return null when given by UNSET_AUTH_USER action
 *
 */

import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toBe(initialState);
  });

  it('should return the authUser when given by SET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const authUser = {
      id: 'users-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toBe(authUser);
  });

  it('should return null when given by UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = {
      id: 'users-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    const action = {
      type: 'UNSET_AUTH_USER',
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toBe(null);
  });
});
