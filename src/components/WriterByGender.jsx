import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import WriterSingle from './WriterSingle';
import '../css/listings.scss';
import { useLocation } from 'react-router-dom';

function ViewWritersByGender() {
	let location = useLocation();
	const [listings, setListings] = useState([]);

	useEffect(() => {
		console.log(`searching for all ${location.state}'s`);
		axios.get(`http://localhost:4000/api/view-writer-by-gender/${location.state}`).then((response) => {
			if (response.status == 200 && response.data.length > 0) {
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

export default ViewWritersByGender;

/*
new Schema({
	listing_url: { type: String, required: true },
	name: { type: String, required: true },
	summary: { type: String, required: true },
	space: String,
	description: String,
	neighborhood_overview: String,
	notes: String,
	transit: String,
	access: String,
	house_rules: String,
	property_type: { type: String, required: true },
	room_type: String,
	bed_type: String,
	minimum_nights: String,
	maximum_nights: String,
	cancellation_policy: String,
	accommodates: String,
	bedrooms: String,
	beds: String,
	number_of_reviews: String,
	bathrooms: String,
	day_price: String,
	security_deposit: String,
	cleaning_fee: String,
	extra_people: String,
	picture_url: { type: String, required: true },
});

*/
