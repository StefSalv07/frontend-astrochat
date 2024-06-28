import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from '../features/theme/themeSlice';
import authReducer from "../features/auth/authSlice"
import astrologerReducer from "../features/astrologer/astroSlice"
import ratingReducer from "../features/rating/ratingSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  astro:astrologerReducer,
  rate: ratingReducer
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['theme'], // Specify which reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
