import {configureStore} from "@reduxjs/toolkit";
import {todoReducer} from "./todo.slice/todo.slice";
import {todoApi} from "./todo.api/todo.api";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    todo: todoReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todoApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
