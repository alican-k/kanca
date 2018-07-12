import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import Icon from 'react-native-vector-icons/Entypo'
import { display } from '../../actions'

const Record = ({ record, _display, list }) =>
	<TouchableOpacity style={styles.container} onPress={_display}>
		<View style={Boolean(record.memorizeDate) ? styles.iconGreen : styles.iconRed}>
			<Icon name='flag' size={14} color={Boolean(record.memorizeDate) ? '#02b21f' : '#ef456a'} />
		</View>
		<View style={styles.center}>
			<Text style={styles.term}>{record.term}</Text>
			<Text style={styles.summary}>{record.summary}</Text>
		</View>	
		<View style={styles.right}>
			<Icon name='chevron-right' size={16} color='grey' />		
		</View>
	</TouchableOpacity>

export default compose(
	connect(null, { display }),
	withHandlers({ 
		_display: ({record, display}) => () => display(record.term),
	})
)(Record)

const icon = {
	marginTop: 4,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: 20,
	height: 20,
	borderRadius: 10,
	borderWidth: 1,
	paddingTop: 2,
	paddingLeft: 2
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		padding: 8,
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: '#f9f9f9'
	},
	iconRed: {
		...icon,
		borderColor: '#ef456a'
	},
	iconGreen: {
		...icon,
		borderColor: '#02b21f'
	},
	center: {
		flex: 1,
		display: 'flex',
		paddingHorizontal: 12,
	},
	term: {
		fontSize: 18,
		letterSpacing: 1,
		color: '#000000',
	},
	summary: {
		marginTop: 2,
		lineHeight: 23,
		color: '#454545'
	},
	right: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	}
})
