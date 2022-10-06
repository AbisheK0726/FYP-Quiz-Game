import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import styled from 'styled-components';

const NavBar = styled.div`
	position: fixed;
	width: 100%;
	z-index: 1000;
	transition: 0.3s;
	padding: 5rem 5rem 0rem 5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Logo = styled(NavLink)`
	font-size: 4rem;
	color: #0c0c53;
	font-weight: bold;
`;

const Logout = styled.button`
	color: #1b1ba5;
	padding: 1rem;
	font-size: 1.3rem;
	border-radius: 1rem;
	transition: 0.2s;
	display: flex;
	align-items: center;
	svg {
		margin-left: 0.5rem;
	}
	&:hover {
		background-color: #3742bb;
		color: white;
	}
`;

const Profile = styled.div`
	font-size: 1.2rem;
	display: flex;
	align-items: flex-start;
	margin-right: 1rem;

	svg {
		font-size: 3rem;
		margin-left: 1rem;
	}
	p {
		color: #626262;
		text-transform: capitalize;
	}
	div {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
`;

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	return (
		<NavBar>
			<Logo to="/">
				<h5>Quizz</h5>
			</Logo>

			{user ? (
				<div className="inline">
					<Profile>
						<div>
							<h4>{user.firstName + ' ' + user.lastName}</h4>
							<p>{user.role}</p>
						</div>
						<AiOutlineUser />
					</Profile>
					<Logout onClick={onLogout}>
						Logout
						<MdLogout />
					</Logout>
				</div>
			) : (
				<div>
					<Link to="/register">
						<FaUser /> Register
					</Link>
				</div>
			)}
		</NavBar>
	);
}

export default Header;
