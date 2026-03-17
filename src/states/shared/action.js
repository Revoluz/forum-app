import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateThreadAndUsers() {
  return async (dispatch) => {
    try {
      const [threads, users] = await Promise.all([
        api.getAllThreads(),
        api.getAllUsers(),
      ]);
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { asyncPopulateThreadAndUsers };
