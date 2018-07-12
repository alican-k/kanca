import { is } from 'ramda'

const signUpName = name => is(String, name) && name.length > 1
	? false
	: {reason: 'Required field missing', description: 'Your first name should be 2 character at least'}


export default {
	signUpName
}