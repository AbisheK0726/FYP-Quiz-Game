import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Utility/Spinner';
import { getRooms, resetRoom } from '../../features/rooms/roomSlice';
import styled from 'styled-components';
import Tabs from '../Utility/Tabs';

const Main = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	padding-top: 20%;
`;

const Button = styled.button`
	background-color: #3742bb;
	padding: 2rem;
	font-size: 1.4rem;
	color: white;
	border-radius: 10rem;
`;

function TeacherDashboard({ user }) {
	const [unassignedRooms, setUnassignedRooms] = useState([]);
	const [assignedRooms, setAssignedRooms] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { rooms, isLoading, isError, message } = useSelector((state) => state.rooms);

	useEffect(() => {
		if (rooms.constructor === Array) {
			setUnassignedRooms(rooms.filter((room) => !room.subject));
			setAssignedRooms(rooms.filter((room) => room.subject));
		}
	}, [rooms]);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		dispatch(getRooms());

		return () => {
			dispatch(resetRoom());
		};
	}, [user, isError, message, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Main>
			<div>
				<Button onClick={() => navigate('/addquestion')}>Add Question</Button>
			</div>
			<Tabs
				tabContent={[
					{ tabLabel: 'Unassigned', destination: 'editroom', content: unassignedRooms },
					{ tabLabel: 'Assigned', destination: 'scoreboard', content: assignedRooms },
				]}
			/>
		</Main>
	);
}

export default TeacherDashboard;
