import Cookies from 'js-cookie';

// we may reuse this function so i will export it for use in any component

function validateUserEmail(email) {
	// clever yet simple way to get browser to check the email
	var input = document.createElement('input');
	input.required = true;
	input.value = email;

	return input.checkValidity();
}

function checkLoggedStatus() {
	if (Cookies.get('logged_in') && validateUserEmail(Cookies.get('logged_in'))) {
		console.log('logged in as ', Cookies.get('logged_in'));
		return true;
	}
	console.log('not logged in.');
	return false;
}

function getCurrentUserEmail() {
	if (validateUserEmail(Cookies.get('logged_in'))) {
		return Cookies.get('logged_in');
	}

	return 'anonymous';
}

function debugObj(o) {
	console.log('%cstart debug >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', 'color:dodgerblue');
	console.table(o);
	console.log('%cend debug >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', 'color:crimson');
}
function debugVar(s) {
	console.log('%cstart debug >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', 'color:dodgerblue');
	console.log(s);
	console.log('%cend debug >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', 'color:crimson');
}

export { checkLoggedStatus, getCurrentUserEmail, debugObj, debugVar };
