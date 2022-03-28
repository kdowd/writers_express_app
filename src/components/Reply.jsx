import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { debugObj } from '../js/shared.js';
import '../css/replies.scss';

function Replies(props) {
	debugObj(props);
	const [repliesArray, setRepliesArray] = useState([]);
	const [noReplies, setNoReplies] = useState(false);
	const dialogRef = useRef();
	const formTextAreaRef = useRef();

	const addReply = (event) => {
		dialogRef.current.showModal();
	};
	const closeModal = (event) => {
		event.preventDefault();
		console.log('close modal');
		dialogRef.current.close();
	};
	const onSendReply = (event) => {
		event.preventDefault();
		// window.pigg = event;
		debugObj(props.obj);
		let formdata = {
			comment: formTextAreaRef.current.value,
			comment_id: props.obj._id,
			user_email: props.obj.user_email,
		};
		debugObj(formdata);

		axios.post(`http://localhost:4000/api/reply-to-comment/`, formdata).then((response) => {
			if (response.status === 200 && response.data != null) {
				loadReplies();
			}
		});

		dialogRef.current.close();
	};

	const loadReplies = (event) => {
		if (props.obj._id) {
			axios.get(`http://localhost:4000/api/view-replies-by-comment-id/${props.obj._id}`).then((response) => {
				if (response.status === 200 && response.data != null) {
					debugObj(response.data);
					if (response.data.length > 0) {
						setRepliesArray(response.data);
						setNoReplies(false);
					} else {
						setNoReplies(true);
					}
				}
			});
		}
	};

	return (
		<div className='reply-wrapper'>
			<dialog ref={dialogRef}>
				<form method='dialog' onSubmit={onSendReply}>
					<p>Reply to comment</p>

					<textarea ref={formTextAreaRef} rows='4' cols='35' placeholder='Comment here'></textarea>
					{/* <input type='hidden' defaultValue={props.detailsObj._id} ref={secretIDInputRef} /> */}

					<menu>
						<button onClick={closeModal}>Cancel</button>
						<button onClick={onSendReply}>Submit Reply</button>
						{/* <button role='submit'>Submit New Comment</button> */}
					</menu>
				</form>
			</dialog>

			{repliesArray.map((item, index) => (
				<p key={index} className='reply'>
					{item.comment}
				</p>
			))}
			{noReplies === true && <p>No replies to this comment</p>}
			<div className='reply-options'>
				<button onClick={loadReplies}>View Replies</button> <button onClick={addReply}>Reply</button>
			</div>
		</div>
	);
}

export default Replies;
