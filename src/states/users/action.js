import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}
function asyncRegister({ name, email, password }) {
  return async () => {
    try {
      await api.register({ name, email, password });
      return true; // penting: return true jika berhasil
    } catch (error) {
      // alert(error.message);
      const message = error.response?.data?.message || error.message;
      throw new Error(message); // penting: lempar lagi
    }
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegister };
