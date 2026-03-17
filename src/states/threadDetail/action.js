import api from '../../utils/api';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'TOGGLE_UP_VOTE_THREAD_DETAIL',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'TOGGLE_DOWN_VOTE_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleUpVoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      console.log('Fetching thread detail for threadId:', threadId);
      const threadDetail = await api.getThreadDetail(threadId);
      console.log('Received thread detail:', threadDetail);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { threadDetail, authUser } = getState();
    dispatch(toggleUpVoteThreadDetailActionCreator({ userId: authUser.id }));
    try {
      if (threadDetail?.upVotesBy.includes(authUser.id)) {
        return;
      }
      await api.upVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteThreadDetailActionCreator({ userId: authUser.id }));
    }
  };
}

function asyncToggleDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { threadDetail, authUser } = getState();
    dispatch(toggleDownVoteThreadDetailActionCreator({ userId: authUser.id }));
    try {
      await api.downVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleDownVoteThreadDetailActionCreator({ userId: authUser.id })
      );
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
};
