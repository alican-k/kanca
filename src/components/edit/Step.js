import React from 'react'
import { Dimensions, Text, TextInput, View } from 'react-native'
import { StyleSheet } from 'react-native'					//import StyleSheet from 'react-native-debug-stylesheet'
import { connect } from 'react-redux'
import { path } from 'ramda'
import { compose, withProps, withState, lifecycle, withHandlers } from 'recompose'
import { m, get } from '../../helpers/state'
import { questions } from '../../constants'

const qAndP = ({ step }) => path([step], questions)

const Step = ({ q, p, input, _setInput }) => 
	<View style={styles.container}>
		<Text style={styles.q}>{q}</Text>
		<TextInput 
			style={styles.input}
			placeholder={p} 
			value={input} 
			spellCheck={false}
			autoCorrect={false}
			loop={false}
			multiline={true}
			onChangeText={_setInput}
		/>
	</View>

export default compose(
	connect(get.mainObj, null),
	withProps(qAndP),
	withHandlers({
		_setInput: props => val => props.setInput(props.step, val)
	})
)(Step)

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//backgroundColor: '#fcfcfc',
		alignItems: 'center',
		width,
	},
	q: {
		marginTop: 15,
		textAlign: 'center'
	},
	input: {
		alignSelf: 'stretch',
		height: '100%',
		margin: 15,
		padding: 10,
		backgroundColor: 'white',
		fontSize: 16,
		borderRadius: 5,
	}
})