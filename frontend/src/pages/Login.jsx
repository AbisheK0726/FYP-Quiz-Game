import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Utility/Spinner';
import styled from 'styled-components';

const LoginInputs = styled.div`
	padding-top: 30%;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(login(formData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<LoginInputs>
			<h1>Login</h1>
			<form onSubmit={onSubmit}>
				<input type="email" className="form-control" id="email" name="email" value={formData.email} placeholder="Enter your email" onChange={onChange} />
				<input type="password" className="form-control" id="password" name="password" value={formData.password} placeholder="Enter password" onChange={onChange} />

				<button type="submit">Login</button>
			</form>
		</LoginInputs>
	);
}

export default Login;
