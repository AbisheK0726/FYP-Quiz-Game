import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StudentDashboard from '../components/Dashboard/StudentDashboard';
import TeacherDashboard from '../components/Dashboard/TeacherDashboard';

function Dashboard() {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user, navigate]);

	return <>{user && user.role === 'teacher' ? <TeacherDashboard user={user} /> : <StudentDashboard user={user} />}</>;
}

export default Dashboard;
