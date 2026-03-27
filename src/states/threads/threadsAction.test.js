/**
 * skenario test
 *
 * - asyncAddThread thunk
 * - asyncToggleUpVoteThread thunk
 * - asyncToggleDownVoteThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed

*/
import { beforeEach, afterEach, describe, it, vi, expect } from 'vitest';

import api from '../../utils/api';
import {
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  toggleUpvoteThreadActionCreator,
  toggleDownvoteThreadActionCreator,
  addThreadActionCreator,
} from './action';

const fakeThreadResponse = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: [],
  downVotesBy: [],
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;

    delete api._createThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.createThread = () => Promise.resolve(fakeThreadResponse);
    const dispatch = vi.fn();

    // action
    await asyncAddThread({
      title: fakeThreadResponse.title,
      body: fakeThreadResponse.body,
      category: fakeThreadResponse.category,
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining(addThreadActionCreator(fakeThreadResponse))
    );
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.createThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncAddThread({
      title: fakeThreadResponse.title,
      body: fakeThreadResponse.body,
      category: fakeThreadResponse.category,
    })(dispatch);

    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncToggleUpVoteThread thunk', () => {
  const threadId = 'thread-1';
  const userId = 'user-1';

  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;
    delete api._upVoteThread;
  });

  it('should call alert and not dispatch if user not logged in', async () => {
    const dispatch = vi.fn();
    const getState = () => ({ authUser: null });
    window.alert = vi.fn();

    await asyncToggleUpVoteThread(threadId)(dispatch, getState);

    expect(window.alert).toHaveBeenCalledWith('You must be logged in to vote');
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch toggleUpvoteThreadActionCreator and call api.upVoteThread if user logged in', async () => {
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: userId } });
    api.upVoteThread = vi.fn(() => Promise.resolve());

    await asyncToggleUpVoteThread(threadId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      toggleUpvoteThreadActionCreator({ threadId, userId })
    );
    expect(api.upVoteThread).toHaveBeenCalledWith(threadId);
  });

  it('should revert dispatch and call alert if api.upVoteThread fails', async () => {
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: userId } });
    const error = new Error('Failed');
    api.upVoteThread = vi.fn(() => Promise.reject(error));
    window.alert = vi.fn();

    await asyncToggleUpVoteThread(threadId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      toggleUpvoteThreadActionCreator({ threadId, userId })
    );
    // Kedua: revert
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith(
      toggleUpvoteThreadActionCreator({ threadId, userId })
    );
    expect(window.alert).toHaveBeenCalledWith(error.message);
  });
});
describe('asyncToggleDownVoteThread thunk', () => {
  const threadId = 'thread-1';
  const userId = 'user-1';

  beforeEach(() => {
    api._downVoteThread = api.downVoteThread;
  });
  it('should call alert and not dispatch if user not logged in', async () => {
    const dispatch = vi.fn();
    const getState = () => ({ authUser: null });
    window.alert = vi.fn();

    await asyncToggleDownVoteThread(threadId)(dispatch, getState);

    expect(window.alert).toHaveBeenCalledWith('You must be logged in to vote');
    expect(dispatch).not.toHaveBeenCalled();
  });
  it('should dispatch toggleDownvoteThreadActionCreator and call api.downVoteThread if user logged in', async () => {
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: userId } });
    api.downVoteThread = vi.fn(() => Promise.resolve());

    await asyncToggleDownVoteThread(threadId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      toggleDownvoteThreadActionCreator({ threadId, userId })
    );
    expect(api.downVoteThread).toHaveBeenCalledWith(threadId);
  });
  it('should revert dispatch and call alert if api.downVoteThread fails', async () => {
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: userId } });
    const error = new Error('Failed');
    api.downVoteThread = vi.fn(() => Promise.reject(error));
    window.alert = vi.fn();

    await asyncToggleDownVoteThread(threadId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      toggleDownvoteThreadActionCreator({ threadId, userId })
    );
    // Kedua: revert
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith(
      toggleDownvoteThreadActionCreator({ threadId, userId })
    );
    expect(window.alert).toHaveBeenCalledWith(error.message);
  });
});
