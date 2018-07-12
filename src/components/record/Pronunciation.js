import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { compose, branch, withHandlers, renderNothing } from 'recompose'
import { play } from '../../actions'
import { helpers } from '../../helpers/state'

const Pronunciation = ({ term, pronunciation, url, _play }) => {
	return <TouchableOpacity style={styles.container} onPress={_play}>
		<IconFontAwesome name='bullhorn' size={20} color='#666666' style={styles.icon} />
		<Text style={styles.pronunciation}>{pronunciation}</Text>
	</TouchableOpacity>
}
export default compose(
	connect(null, { play }),
	withHandlers({
		_play: props => () => props.play(props.url)
	}),
	branch(helpers.pronunciationEmpty, renderNothing),
	branch(helpers.urlEmpty, renderNothing),
)(Pronunciation)

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		margin: 10,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',

		backgroundColor: 'white',
		borderWidth: 2, 
		borderColor: '#EEEEEE',
		borderRadius: 4,

		shadowOffset:{  width: 2,  height: 2,  },
		shadowColor: 'black',
		shadowOpacity: 0.1,
		shadowRadius: 1,
	},
	icon: {
		margin: 6,
	},
	pronunciation: {
		fontSize: 15,
		color: '#666666',
		marginRight: 6,
	},
})