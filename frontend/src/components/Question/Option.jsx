import styled from 'styled-components';

const OptionBtn = styled.button`
	background: #0d2a6a;
	padding: 1.5rem;
	margin: 1rem;
	border-radius: 5rem;
	color: white;
	flex: 50%;
	font-size: 2rem;
	:focus {
		background-color: #5771aa;
	}
`;

function Option({ option, setAnswer, id }) {
	return <OptionBtn onClick={() => setAnswer(id)}>{option}</OptionBtn>;
}

export default Option;
