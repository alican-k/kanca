import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { CustomButton } from './FromElements'
import { displayAuth } from '../../actions'
import { authScreenConst } from '../../constants'
	
const Sent = ({ _toLogIn }) =>
	<View style={styles.container}>
		<Text style={styles.description}>
			E-posta gönderildi
		</Text>
		<View style={styles.forgotContainer}>
			<CustomButton type='link' text='Giriş' onPress={_toLogIn} />
			<Text style={styles.forgotText}>ekranına dön</Text>
		</View>
	</View>
	
export default compose(
	connect(null, { displayAuth }),
	withHandlers({
		_toLogIn: ({ displayAuth }) => () => displayAuth(authScreenConst.LOG_IN)
	})
)(Sent)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
	},
	description: {
		textAlign: 'center',
		fontSize: 14,
		color: 'grey'
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
})