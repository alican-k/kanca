import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import Icon from 'react-native-vector-icons/Feather'
import { routeReset } from '../../actions'
	
export const MiscLeft = compose(
	connect(null, { routeReset }),
	withHandlers({
		_routeReset: ({ routeReset }) => () => routeReset('List')
	}),
)(
	({ _routeReset }) =>
		<TouchableOpacity style={styles.button} onPress={_routeReset}>
			<Icon name='home' size={26} color='#222222' />
		</TouchableOpacity>
)
	
const styles = StyleSheet.create({
	title: {
		fontSize: 16,
		letterSpacing: 1
	},
	button: {
		padding: 10
	}
})