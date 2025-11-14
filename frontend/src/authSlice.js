import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosClient from './utils/axiosClient';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, {rejectWithValue}) => {
        try {
            const response = await axiosClient.post('/api/auth/users/register', userData);
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, {rejectWithValue}) => {
        try {
            const response = await axiosClient.post('/api/auth/users/login', credentials);
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosClient.get('/api/auth/users/check');
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, {rejectWithValue}) => {
        try {
            await axiosClient.post('/api/auth/users/logout');
            return;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const authSlice = createSlice({

    name: 'auth',
    initialState:{
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false
    },
    
    reducers:{},

    extraReducers: (builder) => {
        builder
        // Register User
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Registration failed';
            state.isAuthenticated = false;
            state.user = null;
        })


        // Login User
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Login failed';
            state.isAuthenticated = false;
            state.user = null;
        })


        // Check Auth
        .addCase(checkAuth.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        })
        .addCase(checkAuth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Authentication check failed';
            state.isAuthenticated = false;
            state.user = null;
        })


        // Logout User
        .addCase(logoutUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Logout failed';
            state.isAuthenticated = false;
            state.user = null;
        });
}});

export default authSlice.reducer;