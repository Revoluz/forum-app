import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UPVOTE_THREAD: 'TOGGLE_UPVOTE_THREAD',
  TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      alert('You must be logged in to vote');
      return;
    }
    // optimistic: update UI dulu
    dispatch(
      toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id })
    );
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      // revert jika API gagal
      dispatch(
        toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id })
      );
      alert(error.message);
    }
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      alert('You must be logged in to vote');
      return;
    }
    // optimistic: update UI dulu
    dispatch(
      toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id })
    );
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      // revert jika API gagal
      dispatch(
        toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id })
      );
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpvoteThreadActionCreator,
  toggleDownvoteThreadActionCreator,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
};
