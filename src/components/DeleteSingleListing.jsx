import React from 'react';
import '../css/card.scss';
import NoImage from './NoImage';
import axios from 'axios';
import { useState } from 'react';

function DeleteSingleListing(props) {
	const [showDialogue, setShowDialogue] = useState(false);

	const cancelDeletion = () => {
		console.log('cancelDeletion');
		setShowDialogue(false);
	};

	const onDeleteListing = (theID) => {
		console.log(theID);
		setShowDialogue(false);

		axios.delete(`http://localhost:4000/api/delete-listing-by-id/${theID}`).then((response) => {
			console.log(response);
			let isDeleted = response.data.deletedCount;
			if (isDeleted) {
				console.log('SUCCESS, DELETED = ', response.data.deletedCount);
				// now reload the view
				props.reloadListings();
			} else {
				console.log('FAILED TO DELETE, DELETED = ', response.data.deletedCount);
			}
		});
	};

	return (
		<div className='card'>
			{showDialogue && (
				<dialog className='delete-dialogue' open>
					<p>Are you sure you want to delete this listing?</p>
					<button value='cancel' onClick={cancelDeletion}>
						Don't Delete
					</button>
					<button
						id='confirmBtn'
						value='default'
						onClick={() => {
							onDeleteListing(props.detailsObj._id);
						}}>
						Yes, I'm sure.
					</button>
				</dialog>
			)}

			<header>
				<h2>{props.detailsObj.name}</h2>
			</header>
			{props.detailsObj.picture_url ? <img src={props.detailsObj.picture_url} /> : <NoImage />}
			<div>
				<p>Bedrooms:{props.detailsObj.bedrooms}</p>
				<p>Accomodates:{props.detailsObj.accommodates}</p>
				<p>Type:{props.detailsObj.property_type}</p>
				<p>Price:{props.detailsObj.day_price}</p>
				<button
					href=''
					onClick={() => {
						setShowDialogue(true);
					}}>
					Delete
				</button>
			</div>
		</div>
	);
}

export default DeleteSingleListing;
