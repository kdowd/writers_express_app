import axios from 'axios';
import { useRef } from 'react';
import '../css/form.css';

function WriterAdd() {
	const firstNameInputRef = useRef();
	const lastNameInputRef = useRef();
	const imageNameInputRef = useRef();
	const dobInputRef = useRef();

	const onSubmit = (event) => {
		event.preventDefault();

		let formdata = {
			first_name: firstNameInputRef.current.value,
			last_name: lastNameInputRef.current.value,
			image_name: imageNameInputRef.current.value,
			DOB: dobInputRef.current.value,
		};

		axios.post('//localhost:4000/api/writer-create', formdata).then((response) => {
			if (response.data.error) {
				console.log('ERRROR, UPDATE USER');
			} else {
				console.log('SUCCESS, UPDATE USER');
			}
		});
	};
	return (
		<div className='create-listing-wrap'>
			<h1>Create New Writer:</h1>

			<form onSubmit={onSubmit}>
				<label>
					<span>First name:</span>
					<input ref={firstNameInputRef} type='text' placeholder='first name' name='first_name' />
				</label>
				<label>
					<span>Last name:</span>
					<input ref={lastNameInputRef} type='text' placeholder='last name' name='last_name' />
				</label>

				<label>
					<span>Image name 600px by 600px:</span>
					<input ref={imageNameInputRef} type='text' placeholder='myimage.png' name='image_name' />
				</label>
				<label>
					<span>Date of Birth - Day/Month/FullYear:</span>
					<input ref={dobInputRef} type='text' placeholder='6th June 1875' name='DOB' />
				</label>

				<button role='submit'>Create Writer</button>
			</form>
		</div>
	);
}

export default WriterAdd;

// first_name: String,
// last_name: String,
// image_name: String,
// DOB: String,
