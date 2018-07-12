import React from 'react'
import { View, StyleSheet } from 'react-native'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'

const Dot = ({ valid, isCurrent }) => 
	<View style={styles.container}>
		<IconMaterial name='approval' size={12} color={valid ? '#03A9F4' : '#cccccc'} />
		{ isCurrent && <IconEntypo name='triangle-up' size={12} color='#555555' /> }
	</View>

export default Dot

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		marginRight: 13,
		height: 30,
		// borderWidth: 1, borderColor: 'blue'
	},
	current: {
		width: 4, height: 4,
		borderRadius: 2,
		backgroundColor: '#666666'
	},
	dot: {
		width: 10, height: 10, 
		borderRadius: 5,  
		margin: 6,
	},
	valid: { backgroundColor: 'green'},
	invalid: { backgroundColor: 'red'}
})
