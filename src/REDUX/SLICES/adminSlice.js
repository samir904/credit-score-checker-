// src/redux/slices/adminSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../SERVICES/api';

// ============================================
// ASYNC THUNKS
// ============================================

// Get All Applications (Admin)
export const getAllApplications = createAsyncThunk(
    'admin/getAllApplications',
    async ({ page = 1, limit = 20, status, decision, riskLevel }, { rejectWithValue }) => {
        try {
            let url = `/admin/applications?page=${page}&limit=${limit}`;
            if (status) url += `&status=${status}`;
            if (decision) url += `&decision=${decision}`;
            if (riskLevel) url += `&riskLevel=${riskLevel}`;
            
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch applications'
            );
        }
    }
);

// Get Application Statistics
export const getApplicationStats = createAsyncThunk(
    'admin/getStats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/admin/applications/stats');
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch statistics'
            );
        }
    }
);

// Update Application Status
export const updateApplicationStatus = createAsyncThunk(
    'admin/updateStatus',
    async ({ applicationId, status, notes }, { rejectWithValue }) => {
        try {
            const response = await api.put(
                `/admin/applications/${applicationId}/status`,
                { status, notes }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to update status'
            );
        }
    }
);

// Get Fairness Analysis
export const getFairnessAnalysis = createAsyncThunk(
    'admin/getFairnessAnalysis',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/admin/fairness-analysis');
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch fairness analysis'
            );
        }
    }
);

// Get All Users
export const getAllUsers = createAsyncThunk(
    'admin/getAllUsers',
    async ({ page = 1, limit = 20, role }, { rejectWithValue }) => {
        try {
            let url = `/admin/users?page=${page}&limit=${limit}`;
            if (role) url += `&role=${role}`;
            
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch users'
            );
        }
    }
);

// Delete User
export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/admin/users/${userId}`);
            return { ...response.data, deletedId: userId };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to delete user'
            );
        }
    }
);

// ============================================
// SLICE
// ============================================

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        applications: [],
        users: [],
        statistics: null,
        fairnessAnalysis: null,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            total: 0
        },
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        // Get All Applications
        builder
            .addCase(getAllApplications.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getAllApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get Statistics
        builder
            .addCase(getApplicationStats.pending, (state) => {
                state.loading = true;
            })
            .addCase(getApplicationStats.fulfilled, (state, action) => {
                state.loading = false;
                state.statistics = action.payload.data;
            })
            .addCase(getApplicationStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Update Status
        builder
            .addCase(updateApplicationStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateApplicationStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                
                // Update in list
                const index = state.applications.findIndex(
                    app => app._id === action.payload.data._id
                );
                if (index !== -1) {
                    state.applications[index] = action.payload.data;
                }
            })
            .addCase(updateApplicationStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Fairness Analysis
        builder
            .addCase(getFairnessAnalysis.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFairnessAnalysis.fulfilled, (state, action) => {
                state.loading = false;
                state.fairnessAnalysis = action.payload.data;
            })
            .addCase(getFairnessAnalysis.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get All Users
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete User
        builder
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(
                    user => user._id !== action.payload.deletedId
                );
                state.message = action.payload.message;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { clearError, clearMessage } = adminSlice.actions;
export default adminSlice.reducer;
