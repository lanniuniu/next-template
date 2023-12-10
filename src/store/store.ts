import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // 导入根 reducer

const store = configureStore({
  reducer: rootReducer,
});

export default store;