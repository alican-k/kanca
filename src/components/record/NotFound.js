import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
	
const NotFound = () =>
	<View style={styles.container}>
		<Text style={styles.notFound}>Sonuç Bulunamadı</Text>
	</View>
	
export default NotFound
	
const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: 'white',
		height: '100%'
	},
	notFound: {
		margin: 20,
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 1,
	}
})