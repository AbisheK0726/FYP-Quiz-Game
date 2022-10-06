import Option from './Option';
import styled from 'styled-components';

const Options = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const Title = styled.h1`
	font-size: 4rem;
	text-align: center;
`;

const QuestionContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

function Question({ question, setAnswer }) {
	return (
		<QuestionContainer>
			<Title>{question?.question}</Title>
			<Options>
				{question?.options.map((option, index) => (
					<Option id={index} option={option} setAnswer={setAnswer} />
				))}
			</Options>
		</QuestionContainer>
	);
}

export default Question;
