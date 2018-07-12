import React from 'react'
import { Text, FlatList, StyleSheet } from 'react-native'
import SectionHeader from './SectionHeader'
	
const Item = ({ item, index }) => <Text style={styles.item}>{item}</Text>
const keyExtractor = (item, index) => item

const DidYouMean = ({ response }) => [
	<SectionHeader title='Bunu mu demek istediniz?' />,
	<FlatList 
		data={response.meaning}
		renderItem={Item}
		keyExtractor={keyExtractor}
	/>
]

export default DidYouMean

const styles = StyleSheet.create({
	item: {
		fontSize: 16,
		margin: 4,
		marginLeft: 10,
		letterSpacing: 1
	}
})