// konfigurojme statin global
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice";
import departmentsReducer from "./departmentsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        departments: departmentsReducer,
    },
});

export default store;