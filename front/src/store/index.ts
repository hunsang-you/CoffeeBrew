import {
  configureStore,
  createSlice,
  PayloadAction,
  combineReducers,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const navBarSlice = createSlice({
  name: 'navbar',
  initialState: '',
  reducers: {
    setNavbar: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});
const loginSlice = createSlice({
  name: 'login',
  initialState: false,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

const persistConfig = {
  key: 'root',
  storage: storage,
};

const rootReducer = combineReducers({
  navbar: navBarSlice.reducer,
  login: loginSlice.reducer,
}); // combineReducers를 통해 따로 rootReducer 만들어준다.
const persistedReducer = persistReducer(persistConfig, rootReducer); // 그리고 설정해놓은 local storage
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { setNavbar } = navBarSlice.actions;
export const { setLogin } = loginSlice.actions;
