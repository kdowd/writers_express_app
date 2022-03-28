import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NoImage from './NoImage';
import CommentAdd from './CommentAdd';
import CommentsView from './CommentsView';
import { debugObj } from '../js/shared.js';

function WriterDetail() {
	let navigate = useNavigate();
	let location = useLocation();
	const [writerObject, setwriterObject] = useState({});

	// Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

	useEffect(() => {
		loadComments();
	}, []);

	const onGoBack = (event) => {
		navigate(-1);
	};
	const loadComments = (event) => {
		if (location.state) {
			// console.log('>> ', `http://localhost:4000/api/view-writer-by-id/${location.state}`);
			axios.get(`http://localhost:4000/api/view-writer-by-id/${location.state}`).then((response) => {
				if (response.status === 200 && response.data != null) {
					setwriterObject(response.data);
				}
			});
		}
	};

	return (
		<div className='listing-detail'>
			<div>
				{writerObject.image_name ? (
					<img className='writer-image' src={`./images/${writerObject.image_name}`} />
				) : (
					<NoImage />
				)}
			</div>

			<span className='name'>
				Name: {writerObject.first_name} {writerObject.last_name}
			</span>

			<div className='all-comments'>
				<CommentsView commentsArray={writerObject.comments} />
			</div>

			<CommentAdd detailsObj={{ ...writerObject }} reloadComments={loadComments} />
			{/* {!allowComments && <p>Login to comment</p>} */}

			<button onClick={onGoBack} className='button-orange' role='submit'>
				Go Back
			</button>
		</div>
	);
}

export default WriterDetail;
