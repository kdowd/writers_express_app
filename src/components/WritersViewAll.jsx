import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import WriterSingle from './WriterSingle';
import '../css/listings.scss';

function WritersViewAll() {
	const [listings, setListings] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:4000/api/view-writers').then((response) => {
			if (response.status === 200 && response.data.length > 0) {
				setListings(response.data);
			}
		});
	}, []);

	return (
		<div className='listings-flex-wrap'>
			{listings.map((item, index) => (
				<WriterSingle detailsObj={{ ...item }} key={index} />
			))}
		</div>
	);
}

export default WritersViewAll;
