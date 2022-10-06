import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Utility/Spinner';
import { useEffect, useState } from 'react';
import { getSubjects, getQuestions, getRoom, resetTeacher, editRoom } from '../features/teacher/teacherSlice';
import styled from 'styled-components';
import QuestionList from '../components/Question/QuestionList';

const Container = styled.div`
	padding-top: 20%;
`;
const FormGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	div {
		padding: 1rem;
		flex: 1;
	}
`;

function EditRoom() {
	const { id } = useParams();
	let navigate = useNavigate();
	const [subject, setSubject] = useState('');
	const [filteredQuestions, setFilteredQuestions] = useState([]);
	const [topic, setTopic] = useState('');

	const dispatch = useDispatch();
	const { subjects, questions, isLoading, isError, message } = useSelector((state) => state.teacher);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		dispatch(getSubjects());
		dispatch(getRoom(id));
	}, [isError, message, id, dispatch]);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		if (topic) {
			dispatch(getQuestions(topic));
		}
	}, [topic, dispatch, isError, message]);

	const onSubmit = (e) => {
		e.preventDefault();
		const questionIds = filteredQuestions.map((question) => question._id);
		dispatch(editRoom({ subject, questions: questionIds, id }));
		navigate('/');

		return () => {
			dispatch(resetTeacher());
		};
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Container>
			<h1>Edit Room</h1>
			<form onSubmit={onSubmit}>
				<FormGroup>
					<div>
						<h1>Select Subject</h1>
						<select required name="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
							<option>Select Subject</option>
							{subjects.map((subject) => (
								<option key={subject._id} value={subject._id}>
									{subject.subject}
								</option>
							))}
						</select>
					</div>
					<div>
						<h1>Select Topic</h1>
						<select required name="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
							<option>Select Topic</option>
							{subjects.length > 0 &&
								subject &&
								subjects
									.find((e) => e._id === subject)
									.topics?.map((topic, index) => (
										<option key={index} value={topic}>
											{topic}
										</option>
									))}
						</select>
					</div>
				</FormGroup>

				<QuestionList questions={questions} filteredQuestions={filteredQuestions} setFilteredQuestions={setFilteredQuestions} />
				<FormGroup>
					<div>
						<button type="submit">Submit</button>
					</div>
				</FormGroup>
			</form>
		</Container>
	);
}

export default EditRoom;
