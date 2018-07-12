import React from 'react'
import { TextInput, TouchableOpacity, View, } from 'react-native'
import { StyleSheet } from 'react-native' //import StyleSheet from 'react-native-debug-stylesheet'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import IconEvil from 'react-native-vector-icons/EvilIcons'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { routeReset, search } from '../../actions'
import { get } from '../../helpers/state'
import { simpleStateHandlers } from '../../helpers/utils'
import { trim } from 'ramda'

const Nav = ({ term, setTerm, focused, focuse, blur, setTextInputRef, submit, _routeReset }) =>
	<View style={styles.container}>
		
		<TouchableOpacity style={styles.right} onPress={_routeReset}>
			<IconEvil name='navicon' size={28} />
		</TouchableOpacity>
		
		<View style={styles.left}>
			{ !focused && <IconMaterial name='search' size={18} color='#777777' /> }
			<TextInput
					style={styles.input}
					value={term}
					placeholder='K e l i m e  A r a . .'
					blurOnSubmit
					onFocus={focuse}
					returnKeyType='search'
					ref={setTextInputRef}
					onChangeText={setTerm}
					onSubmitEditing={submit}
			/>
			{ focused && 
				<TouchableOpacity onPress={blur}>
					<IconIonicons name='md-close-circle' size={18} color='#777777' /> 
				</TouchableOpacity> 
			}
		</View>
	</View>

export default compose(
	connect(get.mainObj, { routeReset, search }),
	simpleStateHandlers({ term: '', textInputRef: null, focused: '' }),
	withHandlers({
		_routeReset: ({ routeReset }) => () => routeReset('Misc'),
		focuse: props => event => props.setFocused('focused'),
		blur: props => event => {
			props.setFocused('')
			props.textInputRef.blur()
		}
	}),
	withHandlers({
		submit: props => () => {
			if(trim(props.term))
				props.search(props.term.toLowerCase())
			props.setTerm('')
			props.blur()
		}
	})
)(Nav)

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fefefe',
		borderBottomWidth: 1.5,
		borderBottomColor: '#eeeeee',
		paddingTop: 20
	},
	right: {
		padding: 8
	},
	left: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems:'center',
		flex: 1,
		height: 30,
		paddingHorizontal: 8,
		marginRight: 10,
		backgroundColor: '#fcfcfc',
	},
	input: {
		flex: 1,
		marginLeft: 4,
		fontSize: 15,
		letterSpacing: 1,
	},	
})