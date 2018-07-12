import React from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, withHandlers, withProps } from 'recompose'
import { CustomButton } from './FromElements'
import { signUp, displayAuth } from '../../actions'
import { authInObj, operatingInObj } from '../../helpers/state'
import { simpleStateHandlers } from '../../helpers/utils'
import { authScreenConst } from '../../constants'

const SignUp = ({ operating, setName, setEmail, setPassword, _signUp, _toLogIn }) =>
	<View style={styles.container}>
		<TextInput 
			style={styles.input} 
			placeholder='İsminiz' 
			autoCapitalize='none' 
			underlineColorAndroid='transparent'
			onChangeText={setName} />
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

		<CustomButton type='primary' text='Üye ol' onPress={_signUp} animation={operating} />

		<Text style={styles.or}>VEYA</Text>

		<View style={styles.forgotContainer}>
			<Text style={styles.forgotText}>Zaten üye misiniz?</Text>
			<CustomButton type='link' text='Giriş yap!' onPress={_toLogIn} animation={operating} />
		</View>
	</View>

export default compose(
	connect(authInObj, {signUp, displayAuth}),
	simpleStateHandlers({name: '', email: '', password: ''}),
	withHandlers({
		_signUp		: ({ name, email, password, signUp }) => () => signUp(name, email, password),
		_toLogIn	: ({ displayAuth }) 			=> () => displayAuth(authScreenConst.LOG_IN),
	}),
	withProps(operatingInObj)
)(SignUp)

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