import { combineReducers, configureStore } from '@reduxjs/toolkit'
import usererReducer from './slice/user/user-slice'
import loginReducer from './slice/Auth/login-slice'
import signupReducer from './slice/Auth/signup-slice'
import unfrienduserReducer from './slice/user/unfrienduser-slice'
import invitationReducer from './slice/user/userinvite-slice'
import invitationNotificationReducer from './slice/user/userNotification-slice'
import  addFriendUserReducer from "./slice/user/userfriendadd-slice"
import sidebarReducer from './slice/chat/getsidebar-slice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  login: loginReducer,
  signup : signupReducer,
  unfriend : unfrienduserReducer,
  invitation: invitationReducer,
  invitationNotification : invitationNotificationReducer,
  addFriendUser : addFriendUserReducer,
  user: usererReducer,
  sidebar : sidebarReducer

})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'], // only persist the login slice
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types for serializability middleware
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;