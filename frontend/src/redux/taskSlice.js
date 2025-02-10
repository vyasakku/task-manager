import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await fetch('/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.json();
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: { tasks: [], darkMode: false },
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action.payload;
        });
    },
});

export const { toggleDarkMode } = taskSlice.actions;
export default taskSlice.reducer;
