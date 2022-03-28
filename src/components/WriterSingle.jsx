import React from 'react';
import '../css/card.scss';
import { useNavigate } from 'react-router-dom';
import NoImage from './NoImage';

function WriterSingle(props) {
	const navigate = useNavigate();

	if (!props.detailsObj.image_name) {
		console.log('>> no image for ', props.detailsObj.last_name);
	} else {
		console.log('>> image == ', props.detailsObj.image_name);
	}

	return (
		<div className='card'>
			{props.detailsObj.image_name ? <img src={`./images/${props.detailsObj.image_name}`} /> : <NoImage />}

			<div>
				<p>
					Name: {props.detailsObj.first_name} {props.detailsObj.last_name}
				</p>
				<p>D.O.B: {props.detailsObj.DOB}</p>

				<button
					href=''
					onClick={() => {
						navigate('/writer-detail', { state: props.detailsObj._id });
					}}>
					View More
				</button>
			</div>
		</div>
	);
}

export default WriterSingle;
