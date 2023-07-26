
const validEmail_RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isValidEmail = (email) => email.match(validEmail_RegExp) ? true : false;

export default isValidEmail;
