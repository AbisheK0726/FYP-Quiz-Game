import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Utility/Spinner';
import { getRooms, resetRoom } from '../../features/rooms/roomSlice';
import Tabs from '../Utility/Tabs';
import styled from 'styled-components';

const Main = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	padding-top: 20%;
`;

function StudentDashboard({ user }) {
	const [availableRooms, setAvailableRooms] = useState([]);
	const [completedRooms, setCompletedRooms] = useState([]);
	const dispatch = useDispatch();

	const { rooms, isLoading, isError, message } = useSelector((state) => state.rooms);

	useEffect(() => {
		if (rooms.constructor === Array) {
			setAvailableRooms(rooms.filter((room) => !room.hasOwnProperty('score') && room.subject));
			setCompletedRooms(rooms.filter((room) => room.hasOwnProperty('score')));
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
			<Tabs
				tabContent={[
					{ tabLabel: 'Available', destination: 'room', content: availableRooms },
					{ tabLabel: 'Completed', destination: 'scoreboard', content: completedRooms },
				]}
			/>
		</Main>
	);
}

export default StudentDashboard;
