import { func } from 'prop-types';
import api from '../../utils/api';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'TOGGLE_UP_VOTE_THREAD_DETAIL',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'TOGGLE_DOWN_VOTE_THREAD_DETAIL',
  TOOGLE_NEUTRAL_VOTE_THREAD_DETAIL: 'TOOGLE_NEUTRAL_VOTE_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UP_VOTE_COMMENT: 'TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_DOWN_VOTE_COMMENT: 'TOGGLE_DOWN_VOTE_COMMENT',
  TOGGLE_NEUTRAL_VOTE_COMMENT: 'TOGGLE_NEUTRAL_VOTE_COMMENT',
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
function toggleNeutralVoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.TOOGLE_NEUTRAL_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}
function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}
function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}
function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}
function toggleNeutralVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
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
function asyncToggleNeutralVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { threadDetail, authUser } = getState();
    dispatch(
      toggleNeutralVoteThreadDetailActionCreator({ userId: authUser.id })
    );
    try {
      await api.neutralVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleNeutralVoteThreadDetailActionCreator({ userId: authUser.id })
      );
    }
  };
}

function asyncAddComment({ content }) {
  return async (dispatch, getState) => {
    const { threadDetail } = getState();
    try {
      const comment = await api.createComment({
        threadId: threadDetail.id,
        content,
      });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleUpVoteComment({ commentId }) {
  return async (dispatch, getState) => {
    const { threadDetail, authUser } = getState();
    dispatch(
      toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id })
    );
    try {
      await api.upVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleDownVoteComment({ commentId }) {
  return async (dispatch, getState) => {
    const { threadDetail, authUser } = getState();
    dispatch(
      toggleDownVoteCommentActionCreator({
        commentId,
        userId: authUser.id,
      })
    );
    try {
      await api.downVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
    }
  };
}
function asyncToggleNeutralVoteComment({ commentId }) {
  return async (dispatch, getState) => {
    const { threadDetail, authUser } = getState();
    dispatch(
      toggleNeutralVoteCommentActionCreator({
        commentId,
        userId: authUser.id,
      })
    );
    try {
      await api.neutralVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleNeutralVoteCommentActionCreator({
          commentId,
          userId: authUser.id,
        })
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
  asyncToggleNeutralVoteThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  addCommentActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  asyncToggleNeutralVoteComment,
};
