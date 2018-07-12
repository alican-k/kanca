import React from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native'				// import StyleSheet from 'react-native-debug-stylesheet'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import Dot from './Dot'
import { m, get, helpers } from '../../helpers/state'
import { questions } from '../../constants'

const Dots = ({ answers, step }) => 
	<View style={styles.container}>
		{ questions.map((q, i) => 
			<Dot key={i} valid={helpers.inputValidation(answers[i])} isCurrent={i === step} />
		)}
	</View>

export default compose(
	connect(get.mainObj, null),
	withProps(m(get.stepObj))
)(Dots)

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 80,		
	},
})