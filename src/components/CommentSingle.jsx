import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { RiHeartFill } from 'react-icons/ri';
import { debugObj } from '../js/shared.js';
import Reply from './Reply';

function CommentSingle(props) {
	const [likes, setLikes] = useState(props.likes);
	const [loading, setLoading] = useState(false);

	const updateLikes = () => {
		setLoading(true);
		axios.patch(`//localhost:4000/api/add-like/${props._id}`, { action: 'up' }).then((response) => {
			setLikes(response.data.likes);
			setTimeout(setLoading(false), 2500);
		});
	};
	return (
		<div className='comment'>
			<p>{props.comment}</p>

			<div className='info'>
				<div>
					<RiHeartFill
						onClick={updateLikes}
						style={{ color: 'crimson' }}
						className={`${loading ? 'animate-heart' : ''}`}
					/>
					{' ' + likes}
				</div>

				<span>
					{props.user_email || 'anonymous'} : {props.date}
				</span>
			</div>
			{/* send through a full copy of the object with ... */}
			<Reply obj={{ ...props }} />
		</div>
	);
}

export default CommentSingle;
