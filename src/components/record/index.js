import React from 'react'
import { ActivityIndicator, ScrollView, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, lifecycle, branch, renderComponent, withProps } from 'recompose'
import Pronunciation from './Pronunciation'
import MeaningSection from './MeaningSection'
import AdditionalSection from './AdditionalSection'
import DidYouMean from './DidYouMean'
import NotFound from './NotFound'
import { recordUnmount } from '../../actions'
import { m, get } from '../../helpers/state'

const RecordScreen = ({ response }) => {
	const { entr, tren, entrRel, trenRel, sameMeanings, sameSyntaxes, voice, pronunciation} = response.meaning
	return (
		<ScrollView style={styles.container}>
			<Pronunciation url={voice} pronunciation={pronunciation} />
			<MeaningSection data={entr} title='İngilizce - Türkçe'/>
			<MeaningSection data={tren} title='Türkçe - İngilizce'/>
			<AdditionalSection data={sameMeanings} title='Eş Anlamlılar'/>
			<AdditionalSection data={sameSyntaxes} title='Eş Dizimliler'/>
		</ScrollView>
	)
}

const Loading = () => <View style={styles.loading}><ActivityIndicator/></View>

export default compose(
	connect(get.mainObj, { recordUnmount }),
	lifecycle({
		componentWillUnmount() {
			this.props.recordUnmount()
		}
	}),
	branch(m(get.responseLoading), renderComponent(Loading)),
	withProps(m(get.responseObj)),
	branch(m(get.meaningNotFound), renderComponent(NotFound)),
	branch(m(get.meaningDidYouMean), renderComponent(DidYouMean))
)(RecordScreen)

const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: 'white',
	},
	loading: {
		height: '100%',
		backgroundColor: 'white',
		paddingTop: 50
	},
	notFound: {
		
	}
})