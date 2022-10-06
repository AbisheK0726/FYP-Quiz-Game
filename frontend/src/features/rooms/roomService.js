import axios from 'axios';

const API_URL = '/api/rooms/';

// add score
const addScore = async (roomData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put('/api/rooms/addscore/' + roomData.id, { score: roomData.score }, config);

	return response.data;
};

// Get user room
const getRoom = async (roomId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + roomId, config);
	return response.data;
};

// Get user rooms
const getRooms = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);
	return response.data;
};

// Delete user room
const deleteRoom = async (roomId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + roomId, config);

	return response.data;
};

const roomService = {
	addScore,
	getRooms,
	getRoom,
	deleteRoom,
};

export default roomService;
