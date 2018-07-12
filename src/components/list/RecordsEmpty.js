import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { whatIsCengel, emptyRecordCardContent } from '../../constants'

const CircularNumber = ({ number }) =>
	<View style={styles.numberContainer}><Text style={styles.number}>{number}</Text></View>

const Card = ({ number, title, content }) =>
	<View style={styles.card}>
		<CircularNumber number={number} />
		<View style={styles.right}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.content}>{content}</Text>
		</View>
	</View>

const RecordsEmpty = () =>
	<View style={styles.container}>
		<Text style={styles.what}>{whatIsCengel}</Text>
		<Card number={1} title='Ara' content={emptyRecordCardContent} />
		<Card number={2} title='Ezberle' content={emptyRecordCardContent} />
	</View>
	
export default RecordsEmpty
	
const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: 'white',
		height: '100%'
	},
	what: {
		margin: 20,
		fontSize: 16,
		color: '#444444',
		lineHeight: 24,
	},
	card: {
		display: 'flex',
		flexDirection: 'row',
		margin: 10
	},
	numberContainer: {
		marginLeft: 10,
		marginRight: 10, 
		width: 22,
		height: 22,
		borderRadius: 11,
		backgroundColor: '#444444',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	number: {
		color: 'white',
		fontWeight: 'bold'
	},
	right: {
		flex: 1,
		marginRight: 20,
	},
	title: {
		fontSize: 18,
		color: '#444444',
		fontWeight: 'bold',
		letterSpacing: 1
	},
	content: {
		color: '#777777'
	}
})