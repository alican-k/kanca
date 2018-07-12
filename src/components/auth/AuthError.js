import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, withHandlers } from 'recompose'
import { closeAuthError } from '../../actions'
import { authInObj, isNotAuthError } from '../../helpers/state'

const AuthError = ({ auth, _closeAuthError }) =>
	<View style={styles.container}>
		<Text style={styles.reason}>
			{auth.error.reason}
		</Text>
		<Text style={styles.description}>
			{auth.error.description}
		</Text>
		<TouchableOpacity onPress={_closeAuthError}>
			<Text style={styles.close}>Kapat</Text>
		</TouchableOpacity>
	</View>
	
export default compose(
	connect(authInObj, { closeAuthError }),
	branch(isNotAuthError, renderNothing),
	withHandlers({
		_closeAuthError: ({ closeAuthError }) => () => closeAuthError()
	})
)(AuthError)

const styles = StyleSheet.create({
	container: {
		position: 'absolute', top: 40, left: 0, right: 0,
		//height: 40,
		padding: 10,
		backgroundColor: 'orange',
		justifyContent: 'center', alignItems: 'center',
		shadowColor: 'orange',
		shadowOpacity: 0.5,
		shadowRadius: 3,
		shadowOffset: {width: 2, height: 2},
		zIndex: 999,
	},
	description: {
		textAlign: 'center',
		marginBottom: 10,
		fontSize: 12,
	},
	reason: {
		textAlign: 'center',
		marginBottom: 10,
		fontSize: 12,
		fontWeight: 'bold'
	},
	close: {
		color: '#2196F3',
		fontSize: 14,
	},
})