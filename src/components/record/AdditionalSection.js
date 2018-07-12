import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import SectionHeader from './SectionHeader'

const AdditionalSection = ({title, data}) =>
	<View>
		<SectionHeader title={title} />
		<Text style={styles.data}>{data}</Text>
	</View>

export default AdditionalSection

const styles = StyleSheet.create({
	data: {
		margin: 10,
		textAlign: 'center',
		letterSpacing: 0.5,
		fontSize: 14,
	},
})