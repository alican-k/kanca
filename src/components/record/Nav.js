import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, branch, withProps, withHandlers, renderComponent, renderNothing } from 'recompose'
import Icon from 'react-native-vector-icons/Entypo'
import { routeNavigate } from '../../actions'
import { m, get} from '../../helpers/state'

export const Title = compose(
	connect(get.mainObj, null),
	withProps(m(get.termObj))
)(
	({ term }) => <Text style={styles.title}>{term}</Text>
)

export const Right = compose(
	connect(get.mainObj, { routeNavigate }),
	withHandlers({
		_routeNavigate: props => () => props.routeNavigate('Edit')
	}),
	branch(m(get.meaningNotValid), renderNothing)
)(
	({ _routeNavigate }) =>
		<TouchableOpacity style={styles.button} onPress={_routeNavigate}>
			<Icon name='edit' size={26} color='#555555' />
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