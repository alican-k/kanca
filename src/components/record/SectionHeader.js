import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const SectionHeader = ({ title }) =>
	<View style={styles.container}>
		<Text style={styles.title}>{title}</Text>
	</View>

export default SectionHeader

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center', alignItems: 'center',
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: '#eeeeee',
		padding: 5,
		marginVertical: 8,
	},
	title: {
		textAlign: 'center',
		fontSize: 16,
		letterSpacing: 1,
	},
})