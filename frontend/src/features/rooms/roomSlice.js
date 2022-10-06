import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomService from './roomService';

const initialState = {
	rooms: [],
	room: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Create new room
export const addScore = createAsyncThunk('rooms/create', async (roomData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await roomService.addScore(roomData, token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get user room
export const getRoom = createAsyncThunk('rooms/get', async (id, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await roomService.getRoom(id, token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get user rooms
export const getRooms = createAsyncThunk('rooms/getAll', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await roomService.getRooms(token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Delete user room
export const deleteRoom = createAsyncThunk('rooms/delete', async (id, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await roomService.deleteRoom(id, token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const roomSlice = createSlice({
	name: 'room',
	initialState,
	reducers: {
		resetRoom: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(addScore.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addScore.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(addScore.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.rooms = action.payload;
			})
			.addCase(getRooms.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getRooms.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.rooms = action.payload;
			})
			.addCase(getRooms.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteRoom.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteRoom.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.rooms = state.rooms.filter((room) => room._id !== action.payload.id);
			})
			.addCase(deleteRoom.rejected, (state, action) => {
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
			});
	},
});

export const { resetRoom } = roomSlice.actions;
export default roomSlice.reducer;
