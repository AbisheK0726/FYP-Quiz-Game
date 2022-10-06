import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import teacherService from './teacherService';

const initialState = {
	subjects: [],
	room: {},
	questions: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Get user rooms
export const getSubjects = createAsyncThunk('teacher/getSubjects', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await teacherService.getSubjects(token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Create Question
export const createQuestion = createAsyncThunk('teacher/createQuestion', async (formData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await teacherService.createQuestion(formData, token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get user room
export const getRoom = createAsyncThunk('rooms/get', async (id, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await teacherService.getRoom(id, token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get user room
export const editRoom = createAsyncThunk('rooms/editRoom', async (formData, thunkAPI) => {
	try {
		const { id, ...roomData } = formData;
		const token = thunkAPI.getState().auth.user.token;

		return await teacherService.editRoom(id, roomData, token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get user rooms
export const getQuestions = createAsyncThunk('questions/getAll', async (topic, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await teacherService.getQuestions(topic, token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const teacherSlice = createSlice({
	name: 'teacher',
	initialState,
	reducers: {
		resetTeacher: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSubjects.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSubjects.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.subjects = action.payload;
			})
			.addCase(getSubjects.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createQuestion.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createQuestion.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createQuestion.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getRoom.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getRoom.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.room = action.payload;
			})
			.addCase(getRoom.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(editRoom.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editRoom.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(editRoom.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getQuestions.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getQuestions.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.questions = action.payload;
			})
			.addCase(getQuestions.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { resetTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;
