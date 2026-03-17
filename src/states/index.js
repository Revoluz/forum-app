import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/reducer';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import { loadingBarReducer } from '@dimasmds/react-redux-loading-bar';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadReducer,
    isPreload: isPreloadReducer,
    threadDetail: threadDetailReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
