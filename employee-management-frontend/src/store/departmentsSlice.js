import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchDepartments = createAsyncThunk(
    "departments/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/departments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch departments");
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
const departmentsSlice = createSlice({
    name: "departments",
    initialState: {
        departments: [],
        loading: false,
        error: null,
    },
    reducers: {
        addDepartment: (state, action) => {
            state.departments.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.departments = action.payload;
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { addDepartment } = departmentsSlice.actions;
export default departmentsSlice.reducer;