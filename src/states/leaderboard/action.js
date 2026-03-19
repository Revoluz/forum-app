import api from '../../utils/api';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';

const ActionType = {
  RECEIVE_LEADERBOARD: 'RECEIVE_LEADERBOARD',
};

function receiveLeaderboardActionCreator(leaderboard) {
  return {
    type: ActionType.RECEIVE_LEADERBOARD,
    payload: {
      leaderboard,
    },
  };
}

function asyncReceiveLeaderboard() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboard = await api.getLeaderboard();
      dispatch(receiveLeaderboardActionCreator(leaderboard));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, receiveLeaderboardActionCreator, asyncReceiveLeaderboard };
