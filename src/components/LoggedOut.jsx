import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LoggedOut() {
	let navigate = useNavigate();
	const onGoBack = (event) => {
		navigate(-1);
	};

	return (
		<>
			<div>LoggedOut</div>
		</>
	);
}

export default LoggedOut;
