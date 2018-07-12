import React from 'react'
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { m, get } from '../../helpers/state'
import Record from './Record'
import RecordsEmpty from './RecordsEmpty'

const renderItem 	= ({ item }) 	=> <Record key={item.term} record={item} />
const keyExtractor 	= (item, index) => item.term
const Loading		= ()			=> <View style={styles.loading}><ActivityIndicator/></View>

const ListScreen = ({ records }) =>
	<FlatList 
		style={styles.container}
		data={records} 
		renderItem={renderItem} 
		keyExtractor={keyExtractor}
		ListEmptyComponent={RecordsEmpty}
	/>

export default compose(
	connect(get.mainObj, null),
	branch(m(get.recordsLoading), renderComponent(Loading)),
	withProps(m(get.recordsObj)),
)(ListScreen)

const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: 'white',
	},
	loading: {
		height: '100%',
		backgroundColor: 'white',
		paddingTop: 50
	}
})