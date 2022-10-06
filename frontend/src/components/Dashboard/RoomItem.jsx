import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'react-icons/ai';

const Item = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 2em;
	width: 13rem;
	height: auto;
	background: #ececec;
	border-radius: 5%;
	margin: 2rem 2rem 0 0;
	:hover {
		background-color: #c7c7c7;
		cursor: pointer;
	}
`;

const IconContainer = styled.div`
	font-size: 5rem;
	display: flex;
	justify-content: center;
`;

function RoomItem({ room, destination }) {
	const navigate = useNavigate();
	const Icon = Icons[room.icon];

	return (
		<Item onClick={() => navigate(`/${destination}/${room.id}`)}>
			<IconContainer>
				<Icon />
			</IconContainer>
			<h2>{room.topic}</h2>
			<p>
				Class {room.year}
				{room.name} - {room.teacher}
			</p>
		</Item>
	);
}

export default RoomItem;
