import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';

function asyncPopulateThreadAndUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const [threads, users] = await Promise.all([
        api.getAllThreads(),
        api.getAllUsers(),
      ]);
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      if (error.message !== 'Access token not found') {
        alert(error.message);
      }
      // If token not found, do not alert, let UI show visitor mode
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { asyncPopulateThreadAndUsers };
