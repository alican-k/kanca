import React from 'react'
import { Image, ScrollView, Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import AuthError from './AuthError'
import LogIn from './LogIn'
import SignUp from './SignUp'
import Reset from './Reset'
import Sent from './Sent'
import { authInObj, screenInObj } from '../../helpers/state'
import { authScreenConst } from '../../constants'
import { logo } from '../../assets'

const AuthScreen = ({ screen }) => 
	<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
		<AuthError />
		<Image style={styles.logo} source={logo} />
		<Text style={styles.starter}>KANCA</Text>

		{ screen === authScreenConst.LOG_IN 	&& <LogIn /> }
		{ screen === authScreenConst.SIGN_UP 	&& <SignUp /> }
		{ screen === authScreenConst.RESET 		&& <Reset /> }
		{ screen === authScreenConst.SENT 		&& <Sent /> }
	</ScrollView>

export default compose(
	connect(authInObj, null),
	withProps(screenInObj)
)(AuthScreen)

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white'
	},
	contentContainer: {
		display: 'flex',
		alignItems: 'stretch',
	},
	logo: {
		alignSelf: 'center',
		marginTop: 30,
		marginBottom: 15,
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	rn: {
		textAlign: 'center',
		fontSize: 30,
		letterSpacing: 1,		
		color: 'grey'
	},
	starter: {
		textAlign: 'center',
		fontSize: 38,
		letterSpacing: 3,
		color: 'blue',
		marginBottom: 15
	}
})