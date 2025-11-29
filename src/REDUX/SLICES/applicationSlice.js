// src/redux/slices/applicationSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../SERVICES/api';

// ============================================
// ASYNC THUNKS
// ============================================

// Create Application
export const createApplication = createAsyncThunk(
    'application/create',
    async (applicationData, { rejectWithValue }) => {
        try {
            const response = await api.post('/applications/create', applicationData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create application'
            );
        }
    }
);

// Calculate Credit Score
export const calculateCreditScore = createAsyncThunk(
    'application/calculateScore',
    async (applicationId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/applications/${applicationId}/calculate-score`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to calculate score'
            );
        }
    }
);

// Get My Applications
export const getMyApplications = createAsyncThunk(
    'application/getMyApplications',
    async ({ page = 1, limit = 10, status, decision }, { rejectWithValue }) => {
        try {
            let url = `/applications/my-applications?page=${page}&limit=${limit}`;
            if (status) url += `&status=${status}`;
            if (decision) url += `&decision=${decision}`;
            
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch applications'
            );
        }
    }
);

// Get Single Application
export const getApplicationById = createAsyncThunk(
    'application/getById',
    async (applicationId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/applications/${applicationId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch application'
            );
        }
    }
);

// Delete Application
export const deleteApplication = createAsyncThunk(
    'application/delete',
    async (applicationId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/applications/${applicationId}`);
            return { ...response.data, deletedId: applicationId };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to delete application'
            );
        }
    }
);

// ============================================
// SLICE
// ============================================

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        applications: [],
        currentApplication: null,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalApplications: 0
        },
        loading: false,
        error: null,
        message: null,
        scoreCalculating: false
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
        clearCurrentApplication: (state) => {
            state.currentApplication = null;
        }
    },
    extraReducers: (builder) => {
        // Create Application
        builder
            .addCase(createApplication.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createApplication.fulfilled, (state, action) => {
                state.loading = false;
                state.currentApplication = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(createApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Calculate Score
        builder
            .addCase(calculateCreditScore.pending, (state) => {
                state.scoreCalculating = true;
                state.error = null;
            })
            .addCase(calculateCreditScore.fulfilled, (state, action) => {
                state.scoreCalculating = false;
                state.currentApplication = action.payload.data;
                state.message = action.payload.message;
                
                // Update in applications list if exists
                const index = state.applications.findIndex(
                    app => app._id === action.payload.data._id
                );
                if (index !== -1) {
                    state.applications[index] = action.payload.data;
                }
            })
            .addCase(calculateCreditScore.rejected, (state, action) => {
                state.scoreCalculating = false;
                state.error = action.payload;
            });

        // Get My Applications
        builder
            .addCase(getMyApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getMyApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get Application By ID
        builder
            .addCase(getApplicationById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getApplicationById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentApplication = action.payload.data;
            })
            .addCase(getApplicationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete Application
        builder
            .addCase(deleteApplication.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteApplication.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = state.applications.filter(
                    app => app._id !== action.payload.deletedId
                );
                state.message = action.payload.message;
            })
            .addCase(deleteApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError, clearMessage, clearCurrentApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
