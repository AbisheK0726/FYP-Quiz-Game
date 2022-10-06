import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	position: absolute;
	border-radius: 2rem;
	background: #426cc7;
	color: white;
	padding: 6rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	box-shadow: 0px 10px 31px -7px rgba(0, 0, 0, 0.7);
	h1 {
		font-size: 4rem;
	}
	p {
		font-size: 3rem;
		color: #b6c8ee;
	}
`;

const ScoreBoard = styled.button`
	margin-top: 5rem;
	padding: 2rem;
	border-radius: 5rem;
	border: 4px solid white;
	color: white;
	font-size: 1.5rem;
	text-align: center;
	transition: 0.5s;
	:hover {
		background-color: white;
		box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.5);
		color: black;
	}
`;

function Score({ score }) {
	const navigate = useNavigate();
	const { id } = useParams();

	return (
		<Container>
			<h1>Your Score</h1>
			<p>{score} points</p>
			<ScoreBoard onClick={() => navigate(`/scoreboard/${id}`)}>View ScoreBoard</ScoreBoard>
		</Container>
	);
}

export default Score;
