import React from 'react';
import { useState } from 'react';
import '../css/button.scss';
import { useNavigate } from 'react-router-dom';

function Home() {
	const navigate = useNavigate();
	const [userChoice, setUserChoice] = useState('all');

	const onListingTypeSelect = (event) => {
		setUserChoice(event.target.value);
	};
	const onStartSearch = (event) => {
		if (userChoice === 'all') {
			navigate('/view-writers');
		} else {
			navigate('/view-by-gender', { state: userChoice });
		}
	};
	return (
		<div className='home-welcome'>
			<p>Welcome:</p>
			<p>Search By:</p>

			<div>
				<input type='radio' id='male' name='listing_type' onChange={onListingTypeSelect} value='Male' />
				<label htmlFor='male'>Male</label>

				<input type='radio' id='female' name='listing_type' onChange={onListingTypeSelect} value='Female' />
				<label htmlFor='female'>Female</label>

				<input type='radio' id='all' name='listing_type' onChange={onListingTypeSelect} value='all' defaultChecked />
				<label htmlFor='all'>All</label>
			</div>
			<div>
				<button onClick={onStartSearch} className='button-orange' role='button'>
					Search
				</button>
			</div>
		</div>
	);
}

export default Home;
