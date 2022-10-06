import { useState } from 'react';
import RoomItem from '../Dashboard/RoomItem';
import styled from 'styled-components';

const TabButtons = styled.div`
	display: flex;
	border-bottom: 1px solid #00000046;
`;

const TabContent = styled.div`
	flex-grow: 1;
`;

const Tab = styled.button`
	color: #0000006b;
	padding: 1.5rem;
	font-size: 1.5rem;
	cursor: pointer;
	position: relative;
	border-bottom: 1px solid transparent;
	bottom: -2px;
	${(props) => props.active && 'color:#4f55e8;border-bottom: 1px solid #4f55e8;'}
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
	display: ${(props) => (props.active ? 'flex' : 'none')};
`;

function Tabs({ tabContent }) {
	const [toggleState, setToggleState] = useState(0);

	const toggleTab = (index) => {
		setToggleState(index);
	};

	return (
		<>
			<TabButtons>
				{tabContent.map((tab, index) => (
					<Tab key={index} active={toggleState === index && true} onClick={() => toggleTab(index)}>
						{tab.tabLabel}
					</Tab>
				))}
			</TabButtons>

			<TabContent>
				{tabContent.map((c, index) => (
					<Content key={index} active={toggleState === index && true}>
						{c.content.map((room) => (
							<RoomItem key={room.id} destination={c.destination} room={room} />
						))}
					</Content>
				))}
			</TabContent>
		</>
	);
}

export default Tabs;
