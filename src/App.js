import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home.jsx';
import WritersViewAll from './components/WritersViewAll';
import WriterSingle from './components/WriterSingle';
import WritersByGender from './components/WriterByGender';
import WriterAdd from './components/WriterAdd';
import WriterDetail from './components/WriterDetail';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import LoggedOut from './components/LoggedOut';
import Logo from './writers.jpg';
import './css/App.css';

const tempStyle = { backgroundImage: `url(${Logo})` };
function App() {
	return (
		<div className='App' style={tempStyle}>
			<Menu />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/view-writers' element={<WritersViewAll />} />
				<Route path='/view-by-gender' element={<WritersByGender />} />

				<Route path='/listing' element={<WriterSingle />} />
				<Route path='/writer-detail' element={<WriterDetail />} />
				<Route path='/add-writer' element={<WriterAdd />} />
				<Route path='/logged-out' element={<LoggedOut />} />
			</Routes>
		</div>
	);
}

function Menu() {
	const [logged, setLogin] = useState(false);
	const isLoggedIn = (isLoggedIn) => {
		setLogin(isLoggedIn);
	};
	return (
		<>
			<Login onUpdateLoggedInState={isLoggedIn} />
			<ul className='main-menu'>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/view-writers'>View Writers</Link>
				</li>

				<>
					<li>
						<Link to='/add-writer'>Add Writer</Link>
					</li>
				</>
			</ul>
		</>
	);
}

export default App;
