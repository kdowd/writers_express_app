import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { checkLoggedStatus, getCurrentUserEmail } from '../js/shared.js';

function CommentAdd(props) {
	// console.table(props);
	const commentInputRef = useRef();
	const secretIDInputRef = useRef();
	const [allowComments, setAllowComments] = useState(false);
	const [currentUserEmail, setCurrentUserEmail] = useState('');

	useEffect(() => {
		listenForLoginUpdates();
		if (checkLoggedStatus() == true) {
			setAllowComments(true);
			setCurrentUserEmail(getCurrentUserEmail());
		}
	}, []);

	const listenForLoginUpdates = () => {
		document.addEventListener('onLoginUpdate', (event) => {
			setAllowComments(event.detail.loggedin);
			setCurrentUserEmail(event.detail.email);
		});
	};

	const resetForm = () => {
		commentInputRef.current.value = '';
	};

	const onAddNewComment = (event) => {
		event.preventDefault();
		let formdata = {
			comment: commentInputRef.current.value,
			writer_id: secretIDInputRef.current.value,
			likes: 0,
			user_email: currentUserEmail,
		};

		axios.post('//localhost:4000/api/add-comment', formdata).then((response) => {
			if (response.data.error) {
				console.log('ERRROR, UPDATE USER');
			} else {
				console.log('SUCCESS, UPDATE USER');
				props.reloadComments();
				resetForm();
			}
		});
	};
	return (
		<>
			{allowComments && (
				<form onSubmit={onAddNewComment} className='form-comment-add'>
					<textarea required rows='4' cols='35' placeholder='Comment here' ref={commentInputRef}></textarea>
					<input type='hidden' defaultValue={props.detailsObj._id} ref={secretIDInputRef} />
					{/* <input type='hidden' defaultValue={props.detailsObj._id} ref={secretIDInputRef} /> */}
					<button role='submit'>Submit New Comment</button>
				</form>
			)}

			{!allowComments && <p>Login to leave comments.</p>}
		</>
	);
}

export default CommentAdd;
