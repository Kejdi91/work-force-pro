// konfigurojme statin global
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice";
import departmentsReducer from "./departmentsSlice";
import employeesReducer from "./employeesSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        departments: departmentsReducer,
        employees: employeesReducer
    },
});

export default store;