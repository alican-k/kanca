import React from 'react'
import { Dimensions, Text, ScrollView, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, withState, withHandlers, lifecycle, withProps } from 'recompose'
import { assoc } from 'ramda'
import Step from './Step'
import Dots from './Dots'
import { setStep, setAnswer, editUnmount } from '../../actions'
import { m, get } from '../../helpers/state'
import { pageNumOfHorizontalScrollView } from '../../helpers/utils'
import { questions } from '../../constants'

const {height, width} = Dimensions.get('window')
	
const EditScreen = ({inputs, setInput, onMyScrollRef, onMomentumScrollEnd}) =>
	<View style={styles.container}>
		<ScrollView style={styles.swiper}
			ref={onMyScrollRef}
			pagingEnabled
			horizontal
			showsHorizontalScrollIndicator={false}
			onMomentumScrollEnd={onMomentumScrollEnd}>

			{ questions.map((question, i) =>
				<Step key={i} step={i} input={inputs[i]} setInput={setInput} />
			)}
		</ScrollView>
		<Dots answers={inputs}/>
	</View>
	
export default compose(
	connect(get.mainObj, { setStep, setAnswer, editUnmount }),
	withState('inputs', 'setInputs', m(get.answers)),
	withProps(m(get.stepObj)),
	withHandlers(() => {
        let myScroll = null
        return {
            onMyScrollRef: () => (ref) => (myScroll = ref),
			scrollTo: () => (value) => myScroll.scrollTo(value),
			onMomentumScrollEnd: props => e => {
				const pageNum = pageNumOfHorizontalScrollView(e)
				step = get.step(props.main)
				if(step !== pageNum){
					props.setAnswer(props.inputs[step])
					props.setStep(pageNum)
				}
			},
			setInput: props => (stepNo, input) => {
				const inputs = assoc(stepNo, input)(props.inputs)
				props.setInputs(inputs)
			}
        }
    }),
	lifecycle({
		componentDidMount() {
			this.props.scrollTo({x: width * get.step(this.props.main), y: 0, animated: false})
		},
		componentWillUnmount() {
			const { step, inputs, setAnswer, editUnmount } = this.props
			setAnswer(inputs[step])
			editUnmount()
		}
	})
)(EditScreen)
	
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fcfcfc'
	}
})