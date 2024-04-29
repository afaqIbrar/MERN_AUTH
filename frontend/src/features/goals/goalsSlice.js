import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import goalService from './goalsService'

const initialState = {
    goals:[],
    isError:false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createGoal = createAsyncThunk('goals/create', async (goalData,thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        return await goalService.createGoal(goalData,token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkApi.rejectWithValue(message)
    }
})

export const deleteGoal = createAsyncThunk('goals/delete', async (id,thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        return await goalService.deleteGoal(id,token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkApi.rejectWithValue(message)
    }
})

//Get User goals
export const getGoals = createAsyncThunk('goals/getAll',async(_,thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        return await goalService.getGoals(token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkApi.rejectWithValue(message)
    }
})

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message=action.payload
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload;
            })
            .addCase(getGoals.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message=action.payload
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id);
            })
            .addCase(deleteGoal.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message=action.payload
            })
    }
})

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;