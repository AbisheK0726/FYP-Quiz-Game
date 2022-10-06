import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSubjects, createQuestion, resetTeacher } from '../features/teacher/teacherSlice';
import styled from 'styled-components';

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

function AddQuestion() {
	let navigate = useNavigate();
	const [option1, setOption1] = useState('');
	const [option2, setOption2] = useState('');
	const [option3, setOption3] = useState('');
	const [option4, setOption4] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		subject: '',
		topic: '',
		question: '',
		options: [],
		answer: 1,
		time: 0,
	});

	const dispatch = useDispatch();
	const { subjects, isLoading, isError, message } = useSelector((state) => state.teacher);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		dispatch(getSubjects());

		return () => {
			dispatch(resetTeacher());
		};
	}, [isError, message, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setFormData((prev) => ({ ...prev, options: [option1, option2, option3, option4] }));
		navigate('/');
		setSubmitted(true);
	};

	useEffect(() => {
		if (submitted) {
			setSubmitted(false);
			dispatch(createQuestion(formData));
		}

		return () => {
			dispatch(resetTeacher());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submitted]);

	return (
		<Container>
			<form onSubmit={onSubmit}>
				<FormGroup>
					<div>
						<h1>Select Subject</h1>
						<select required name="subject" onChange={onChange}>
							<option>Select Subject</option>
							{subjects.map((subject) => (
								<option value={subject.subject}>{subject.subject}</option>
							))}
						</select>
					</div>
					<div>
						<h1>Select Topic</h1>
						<select required name="topic" onChange={onChange}>
							<option>Select Topic</option>
							{subjects.length > 0 && formData.subject && subjects.find((e) => e.subject === formData.subject).topics?.map((topic) => <option value={topic}>{topic}</option>)}
						</select>
					</div>
				</FormGroup>
				<FormGroup>
					<div>
						<h1>Question</h1>
						<input required type="text" name="question" value={formData.question} onChange={onChange} />
					</div>
				</FormGroup>
				<FormGroup>
					<div>
						<h1>Option 1</h1>
						<input required type="text" value={option1} onChange={(e) => setOption1(e.target.value)} />
					</div>
					<div>
						<h1>Option 2</h1>
						<input required type="text" value={option2} onChange={(e) => setOption2(e.target.value)} />
					</div>
				</FormGroup>
				<FormGroup>
					<div>
						<h1>Option 3</h1>
						<input required type="text" value={option3} onChange={(e) => setOption3(e.target.value)} />
					</div>
					<div>
						<h1>Option 4</h1>
						<input required type="text" value={option4} onChange={(e) => setOption4(e.target.value)} />
					</div>
				</FormGroup>
				<FormGroup>
					<div>
						<h1>Answer</h1>
						<select required name="answer" onChange={onChange}>
							<option value={1}>Option 1</option>
							<option value={2}>Option 2</option>
							<option value={3}>Option 3</option>
							<option value={4}>Option 4</option>
						</select>
					</div>

					<div>
						<h1>Time</h1>
						<input required type="number" name="time" defaultValue={100} onChange={onChange} />
					</div>
				</FormGroup>
				<FormGroup>
					<div>
						<button type="submit">Add Question</button>
					</div>
				</FormGroup>
			</form>
		</Container>
	);
}

export default AddQuestion;
