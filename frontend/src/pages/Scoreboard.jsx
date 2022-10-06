import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Utility/Spinner';
import { getRoom, resetRoom } from '../features/rooms/roomSlice';
import styled from 'styled-components';
import Student from '../components/scoreboard/Student';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const Board = styled.div`
	display: flex;
	flex-direction: column;
	padding: 3rem;
	background-color: #e6e6e6;
	> h1 {
		font-size: 4rem;
		color: #5f79b1;
		text-align: center;
		margin-bottom: 1rem;
	}
`;

function Scoreboard() {
	const { room, isLoading, isError, message } = useSelector((state) => state.rooms);
	const { user } = useSelector((state) => state.auth);
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		if (!user) {
			navigate('/login');
		}

		dispatch(getRoom(id));

		return () => {
			dispatch(resetRoom());
		};
	}, [user, navigate, isError, message, dispatch, id]);

	function sort(array) {
		let arr = [...array];
		return arr.sort((a, b) => b.score - a.score);
	}
	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Container>
			<Board>
				<h1>Scoreboard</h1>
				{room.students?.length > 0 && sort(room.students).map((student, index) => student.score >= 0 && <Student key={index} student={student} />)}
			</Board>
		</Container>
	);
}

export default Scoreboard;
