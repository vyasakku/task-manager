import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from './authSlice';

// Fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue, dispatch }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch('http://localhost:5000/api/tasks', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 401) {
            dispatch(logout()); // Logout if token is expired
            return rejectWithValue('Session expired. Please log in again.');
        }

        if (!response.ok) throw new Error('Failed to fetch tasks');
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Add task
export const addTask = createAsyncThunk('tasks/addTask', async (taskData, { rejectWithValue, dispatch }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(taskData),
        });

        if (response.status === 401) {
            dispatch(logout()); 
            return rejectWithValue('Session expired. Please log in again.');
        }

        if (!response.ok) throw new Error('Failed to add task');
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Delete task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { rejectWithValue, dispatch }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 401) {
            dispatch(logout()); 
            return rejectWithValue('Session expired. Please log in again.');
        }

        if (!response.ok) throw new Error('Failed to delete task');
        return taskId;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: { tasks: [], loading: false, error: null, darkMode: false },
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
            });
    },
});

export const { toggleDarkMode } = taskSlice.actions;
export default taskSlice.reducer;
