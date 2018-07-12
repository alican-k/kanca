import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { logOut} from '../../actions'
	
const MiscScreen = ({ _logOut }) =>
	<View style={styles.container}>
		<TouchableOpacity style={styles.logOut} onPress={_logOut}>
			<Text style={styles.logOutText}>Çıkış</Text>
		</TouchableOpacity>
	</View>
	
export default compose(
	connect(null, { logOut }),
	withHandlers({
		_logOut: ({ logOut }) => () => logOut()
	})
)(MiscScreen)
	
const styles = StyleSheet.create({
	container: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	logOut: {
		backgroundColor: 'grey',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 20,
		padding: 10,
		borderRadius: 4,
	},
	logOutText: {
		color: 'white',
		textAlign: 'center',
		letterSpacing: 1	
	}
})