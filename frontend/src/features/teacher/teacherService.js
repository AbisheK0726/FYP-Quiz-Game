import axios from 'axios';

const API_URL = '/api/subjects';

// Get user rooms
const getSubjects = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);
	return response.data;
};

const createQuestion = async (formData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post('/api/questions', formData, config);
	return response.data;
};

// Get user room
const getRoom = async (roomId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get('/api/rooms/' + roomId, config);
	return response.data;
};

const editRoom = async (roomId, formData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put('/api/rooms/' + roomId, formData, config);
	return response.data;
};

const getQuestions = async (topic, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get('/api/questions/topic/' + topic, config);
	return response.data;
};
const teacherService = {
	getSubjects,
	createQuestion,
	getRoom,
	editRoom,
	getQuestions,
};

export default teacherService;
