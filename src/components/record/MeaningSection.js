import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { branch, renderNothing } from 'recompose'
import { compose, dropLast, flatten, map, slice } from 'ramda'
import { splitItem, splitMeaning, MeaningToComponent, ItemRenderer } from '../../helpers/utils'
import SectionHeader from './SectionHeader'

const keyExtractor = (item, index) => index + ''

const Meaning = ({ item, index }) => 
	<Text style={styles.meaning}>
		<Text style={styles.number}>  {index + 1}.  </Text>
		<Text style={styles.items}>
			{ splitItem(item).map((item, index) => {
				const a = slice(0, 3, item)
				const b = slice(3, item.length, item)
				return <Text style={itemStyles[a]} key={b + index}>{a === 'exp' ? '\n ' + b : b} </Text>
			})}
		</Text>
	</Text>

const MeaningSection = ({ data, title }) => {
	const d = splitMeaning(data)
	return (
		<View style={styles.section}>
			<SectionHeader title={title} />
			<FlatList
				data={d}
				renderItem={Meaning}
				keyExtractor={keyExtractor}
				initialNumToRender={30}
				onEndReachedThreshold={0.5}
			/>
		</View>
	)
}
export default branch(
	({ data }) => !Boolean(data), renderNothing
)(MeaningSection)


const styles = StyleSheet.create({
	meaning: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
	},
	items: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
	},
	number: {
		fontWeight: 'bold'
	},
	item_typ: { 
		lineHeight:13,
		fontSize:13,
		height: 16,
		color: 'grey',
		marginRight: 4,
		paddingTop: 3,
	},
	item_cat: { 
		lineHeight:15,
		fontSize:15,
		height: 18,
		color: 'grey',
		marginRight: 4,
		paddingTop: 3,
	},
	item_def: { 
		lineHeight:16,
		fontSize:16,
		height: 19,
		marginRight: 4,
		paddingTop: 3,		
	},
	item_trm: { 
		lineHeight:16,
		fontSize:16,
		height: 19,
		marginRight: 4,
		paddingTop: 3,
		color: '#4FC3F7'		
	},
	item_exp: {
		fontSize: 12,
		color: 'grey',
		marginLeft: 10,
	},
})

const itemStyles = { 
	typ: styles.item_typ, 
	def: styles.item_def, 
	cat: styles.item_cat, 
	trm: styles.item_trm,
	exp: styles.item_exp
}


