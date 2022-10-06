import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './components/Utility/Nav';
import AddQuestion from './pages/AddQuestion';
import Dashboard from './pages/Dashboard';
import EditRoom from './pages/EditRoom';
import Login from './pages/Login';
import Register from './pages/Register';
import Room from './pages/Room';
import ScoreBoard from './pages/Scoreboard';
function App() {
	return (
		<>
			<Router>
				<Nav />
				<div className="container">
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/room/:id" element={<Room />} />
						<Route path="/editroom/:id" element={<EditRoom />} />
						<Route path="/addquestion" element={<AddQuestion />} />
						<Route path="/scoreboard/:id" element={<ScoreBoard />} />
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
