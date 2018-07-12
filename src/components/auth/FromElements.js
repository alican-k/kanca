import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native'

export const CustomButton = ({ type, text, onPress, animation = false, disabled = false }) =>
	<TouchableOpacity 
		style={buttonStyles[type]} 
		onPress={onPress}
		disabled={disabled}>
		{ type === 'primary' &&
			<ActivityIndicator 
				style={styles.animation} 
				color='white'
				animating={(type === 'primary' || type === 'secondary') && animation} /> }
		<Text style={textStyles[type]}>
			{text}
		</Text>
	</TouchableOpacity>

const b = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	height: 36,
	borderRadius: 18,
	backgroundColor: 'white',
	margin: 10,
	marginHorizontal: 45,
} 

const buttonStyles = StyleSheet.create({
	primary: {
		...b,
		backgroundColor: '#2196F3',
	},
	secondary: {
		...b,
		borderWidth: 1,
		borderColor: '#bbbbbb'
	},
	link: {
		justifyContent: 'center',
		alignItems: 'center',
		padding : 8
	}
})

const textStyles = StyleSheet.create({
	primary: {
		color: 'white',
		fontSize: 18,
		letterSpacing: 1,
		marginRight: 24,
	},
	secondary: {
		color: '#444444',
		fontSize: 18,		
		letterSpacing: 1,
	},
	link: {
		color: '#2196F3',
		fontSize: 14,		
		letterSpacing: 1,
	}
})

const styles = StyleSheet.create({
	animation: {
		marginRight: 8
	}
})
