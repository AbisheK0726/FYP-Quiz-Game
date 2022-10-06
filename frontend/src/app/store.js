import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import roomReducer from '../features/rooms/roomSlice';
import teacherReducer from '../features/teacher/teacherSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		rooms: roomReducer,
		teacher: teacherReducer,
	},
});
