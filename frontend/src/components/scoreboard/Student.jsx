import styled from 'styled-components';

const Item = styled.div`
	width: 30rem;
	p {
		font-size: 2rem;
	}
	span {
		float: right;
	}
`;

function Student({ student }) {
	return (
		<Item>
			<p>
				{student.id.firstName} {student.id.lastName} <span>{student.score}</span>
			</p>
			<hr />
		</Item>
	);
}

export default Student;
