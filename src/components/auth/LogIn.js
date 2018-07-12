import React from 'react'
import { ActivityIndicator, Text, TextInput, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, branch, withHandlers, renderComponent, withProps } from 'recompose'
import { CustomButton } from './FromElements'
import { logIn, displayAuth } from '../../actions'
import { authInObj, isInitializing, operatingInObj } from '../../helpers/state'
import { simpleStateHandlers } from '../../helpers/utils'
import { authScreenConst } from '../../constants'

const Initializing = () => <ActivityIndicator />

const Login = ({ operating, setEmail, setPassword, _logIn, _toSignUp, _toForgot }) => 
	<View style={styles.container}>
		<TextInput 
			style={styles.input} 
			placeholder='E-posta' 
			keyboardType='email-address' 
			autoCapitalize='none' 
			underlineColorAndroid='transparent'
			onChangeText={setEmail} />
		<TextInput 
			style={styles.input} 
			placeholder='Şifre' 
			autoCapitalize='none' 
			secureTextEntry={true} 
			underlineColorAndroid='transparent'
			onChangeText={setPassword} />

		<CustomButton type='primary' text='Giriş' onPress={_logIn} animation={operating} />

		<Text style={styles.or}>VEYA</Text>

		<CustomButton type='secondary' text='Üye ol' onPress={_toSignUp} disabled={operating} />

		<View style={styles.forgotContainer}>
			<Text style={styles.forgotText}>Şifreni mi unuttunuz?</Text>
			<CustomButton type='link' text='Buradan yenileyin!' onPress={_toForgot} />
		</View>
	</View>

export default compose(
	connect(authInObj, {logIn, displayAuth}),
	branch(isInitializing, renderComponent(Initializing)),
	simpleStateHandlers({email: '', password: ''}),
	withHandlers({
		_logIn		: ({ email, password, logIn }) 	=> () => logIn(email, password),
		_toSignUp	: ({ displayAuth }) 			=> () => displayAuth(authScreenConst.SIGN_UP),
		_toForgot	: ({ displayAuth }) 			=> () => displayAuth(authScreenConst.RESET)
	}),
	withProps(operatingInObj)
)(Login)


const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
	},
	input: {
		height: 36,
		borderRadius: 18,
		backgroundColor: 'white',
		margin: 10,
		marginHorizontal: 45,
		textAlign: 'center',
		letterSpacing: 1,
		fontSize: 16,
		borderWidth: 1,
		borderColor: '#bbbbbb'
	},
	or: {
		alignSelf: 'center',
		marginTop: 25,
		fontSize: 14,
		color: '#aaaaaa'
	},
	forgotContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
	},
	forgotText: {
		textAlign: 'center',
		fontSize: 14,
		color: 'grey'
	},
	loadingAnim: {
		alignSelf: 'center',
		margin: '30'
	}
})