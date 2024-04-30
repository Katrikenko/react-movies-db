import { UnknownAction  } from "redux";

import { ThunkAction } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "./services/tmdb";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer
  },
  middleware: (getetDefaultMiddleware) => getetDefaultMiddleware().concat(tmdbApi.middleware)
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType> = ThunkAction<ReturnType, RootState, undefined, UnknownAction>;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;