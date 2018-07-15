import React from 'react'
import { Text, View, Switch, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { compose, withProps, withHandlers } from 'recompose'
import Icon from 'react-native-vector-icons/Feather'
import { toggleModal } from '../../actions'
import Modal from './Modal'
	
const Filter = ({ _toggleModal }) => 
	<TouchableOpacity style={styles.container} onPress={_toggleModal}>
		<Icon name='filter' size={24} color='white' />
		<Modal/>
	</TouchableOpacity>

export default compose(
	connect(null, { toggleModal }),
	withHandlers({ _toggleModal: props => val => props.toggleModal(true)})
)(Filter)

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		right: 15,
		bottom: 20,
		backgroundColor: 'grey',
		zIndex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 44,
		width: 44,
		borderRadius: 22,

		shadowOffset:{  width: 2,  height: 2,  },
		shadowColor: 'black',
		shadowOpacity: 0.1,
		shadowRadius: 2,	
	}
})