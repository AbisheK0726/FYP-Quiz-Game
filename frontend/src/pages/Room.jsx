import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Utility/Spinner';
import { getRoom, resetRoom, addScore } from '../features/rooms/roomSlice';
import Question from '../components/Question/Question';
import Score from '../components/Question/Score';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	position: relative;
	justify-content: center;
	align-items: center;
`;

const QuestionContainer = styled.div`
	width: 90%;
	> div {
		padding: 4rem;
	}
`;

const Info = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Navigation = styled.div`
	width: 100%;
	position: absolute;
	display: flex;
	justify-content: flex-end;
	bottom: 5%;
`;

const NavButton = styled.button`
	padding: 2rem;
	font-size: 1.5rem;
	background: #ececec;
	border-radius: 1rem;
	width: 10rem;
	:hover {
		background-color: #c7c7c7;
		cursor: pointer;
	}
`;

function Room() {
	const [questionIndex, setQuestionIndex] = useState(0);
	const [answer, setAnswer] = useState(0);
	const [score, setScore] = useState(0);
	const [quizComplete, setQuizComplete] = useState(false);
	const [counter, setCounter] = useState(0);

	const { room, isLoading, isError, message } = useSelector((state) => state.rooms);
	const { user } = useSelector((state) => state.auth);
	const { id } = useParams();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);
		return () => clearInterval(timer);
	}, []);

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

	useEffect(() => {
		if (room.questions !== undefined) {
			setCounter(room.questions[questionIndex].time);
		}
	}, [questionIndex, room.questions]);

	function next() {
		let scoreTemp = score;
		setCounter(0);

		//score
		if (room.questions[questionIndex].answer === answer && !quizComplete) {
			scoreTemp = score + getScore(room.questions[questionIndex].time, counter);
			setScore(scoreTemp);
		}

		//next question
		if (questionIndex < room.questions.length - 1) {
			setQuestionIndex(questionIndex + 1);
		} else {
			//otherwise quiz complete
			dispatch(addScore({ score: scoreTemp, id: id }));
			setQuizComplete(true);
		}
	}

	function getScore(questionTimer, counter) {
		var responseTime = room.questions[questionIndex].time - counter;
		var score = (1 - responseTime / questionTimer / 2) * 100;
		return Math.round(score);
	}

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Container>
			<QuestionContainer>
				<Info>
					<h1>{counter}</h1>
					<h1>
						{questionIndex + 1}/{room.questions?.length}
					</h1>
				</Info>
				{room.questions && <Question question={room.questions[questionIndex]} setAnswer={setAnswer} />}
			</QuestionContainer>
			{quizComplete && <Score score={score} />}
			<Navigation>{questionIndex < room.questions?.length && <NavButton onClick={() => next()}>Next</NavButton>}</Navigation>
		</Container>
	);
}

export default Room;
