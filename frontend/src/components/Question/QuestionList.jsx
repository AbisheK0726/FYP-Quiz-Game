import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
const QuestionContainer = styled.div`
	margin: 1rem;
	display: flex;
	flex-direction: column;
	border: 2px solid #0c0c53;
	border-radius: 1rem;
	padding: 1rem;
	p {
		padding: 0.8rem;
		border-bottom: 1px solid #0c0c53;
		&:last-child {
			border: none;
		}
	}
`;

function QuestionList({ questions, filteredQuestions, setFilteredQuestions }) {
	useEffect(() => {
		if (questions.length > 0) {
			let questionsForSort = [...questions];
			const shuffled = questionsForSort.sort(() => 0.5 - Math.random());
			setFilteredQuestions(shuffled.slice(0, 10));
		}
	}, [questions]);

	return (
		<QuestionContainer>
			{filteredQuestions.length > 0 ? (
				filteredQuestions.map((question, i) => (
					<p>
						{i + 1}. {question.question}
					</p>
				))
			) : (
				<p>Select Subject and Topic</p>
			)}
		</QuestionContainer>
	);
}

export default QuestionList;
