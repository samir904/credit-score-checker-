import { configureStore } from "@reduxjs/toolkit"
import authReducer from './SLICES/authSlice';
import applicationReducer from './SLICES/applicationSlice';
import adminReducer from './SLICES/adminSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        application: applicationReducer,
        admin: adminReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
    devTools: true
})

export default store;