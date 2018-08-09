import React from 'react'
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { compose, branch, renderComponent, withProps, withHandlers } from 'recompose'
import { recordsLoad } from '../../actions'
import { m, get } from '../../helpers/state'
import { moreStatusConst } from '../../constants'
import Record from './Record'
import RecordsEmpty from './RecordsEmpty'
import Filter from '../list.filter'
import Footer from './Footer'

const renderItem 	= ({ item }) 	=> <Record key={item.term} record={item} />
const keyExtractor 	= (item, index) => item.term
const Loading		= ()			=> <View style={styles.loading}><ActivityIndicator/></View>

const ListScreen = ({ records, _recordsLoad }) =>
	<View style={styles.container}>
		<Filter />
		<FlatList 
			style={styles.list}
			data={records} 
			renderItem={renderItem} 
			keyExtractor={keyExtractor}
			onEndReached={_recordsLoad}
			onEndReachedThreshold={0}
			ListEmptyComponent={RecordsEmpty}
			ListFooterComponent={Footer}
		/>
	</View>

export default compose(
	connect(get.mainObj, {recordsLoad}),
	branch(m(get.recordsLoading), renderComponent(Loading)),
	withProps(m(get.recordsObj)),
	withProps(m(get.moreStatusObj)),
	withHandlers({
		_recordsLoad: ({ moreStatus, recordsLoad }) => val => {
			if(moreStatus === moreStatusConst.NEED) 
				recordsLoad(true)
		}
	})
)(ListScreen)

const styles = StyleSheet.create({
	container: {
		position: 'relative'
	},
	list: {
		height: '100%',
		backgroundColor: 'white',
	},
	loading: {
		height: '100%',
		backgroundColor: 'white',
		paddingTop: 50
	}
})