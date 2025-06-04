import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
export const fetchEmployees = createAsyncThunk(
    "employees/fetchEmployees",
    async(_, {rejectedWithValue}) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/employees/all-users`,{
                headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        })
        if(!response.ok){
            throw new Error("Failed to fetch employeees")
        }
        const data = response.json();
        return data;
        } catch (error) {
           return rejectedWithValue(error.message);
        }
    }
);
const employeesSlice = createSlice({
    name: "employees",
    initialState: {
        data:[],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEmployees.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchEmployees.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        }).addCase(fetchEmployees.rejected, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
    }
})
export default employeesSlice.reducer;






