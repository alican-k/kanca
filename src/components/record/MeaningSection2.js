import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { branch, renderNothing } from 'recompose'
import { compose, dropLast, flatten, map, slice } from 'ramda'
import { splitItem, splitMeaning, MeaningToComponent, ItemRenderer } from '../../helpers/utils'
import SectionHeader from './SectionHeader'

const MeaningSection = ({ data, title }) =>
	<View style={styles.section}>
		<SectionHeader title={title} />
		{ MeaningToComponent(
			data, 
			(item) => [
				<ItemRenderer 
					key={item}
					item={item} 
					itemStyle={styles.item} 
					itemTextStyleGetter={typ => itemStyles[typ]}
				/>,
			],
			false
		)}
	</View>

export default branch(
	({ data }) => !Boolean(data), renderNothing
)(MeaningSection)


const styles = StyleSheet.create({
	item: {
		display: 'flex', flexDirection: 'row',
		margin: 4,
		paddingLeft: 8,
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
	additionalSection_text: {
		margin: 10,
	}
})

const itemStyles = { 
	typ: styles.item_typ, 
	def: styles.item_def, 
	cat: styles.item_cat, 
	trm: styles.item_trm 
}