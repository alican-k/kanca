import React from 'react'
import { Text, View, Platform, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import RNModal from 'react-native-modal'
import { connect } from 'react-redux'
import { compose, withProps, withHandlers } from 'recompose'
import { toggleModal, setFilter, recordsLoad } from '../../actions'
import {m, get} from '../../helpers/state'
import { simpleStateHandlers } from '../../helpers/utils'
import { filterConst } from '../../constants'
	
const Modal = ({ filter, _toggleModal, _recordsLoad, memorized, notMemorized, all, setFilterMemorized, setFilterNotMemorized, setFilterAll }) =>
	<RNModal 
		isVisible={filter.active}
		onBackButtonPress={_toggleModal}
		backdropOpacity={0.4}
		avoidKeyboard={Platform.OS === 'ios'}>
            <View style={styles.container}>
				<Text style={styles.title}>FİLTRELE</Text>
				<View style={styles.switch}>
					<Switch value={memorized} disabled={memorized} onValueChange={setFilterMemorized}/>
					<Text style={styles.label}>Ezberlenenleri göster</Text>
				</View>
				<View style={styles.switch}>
					<Switch value={notMemorized} disabled={notMemorized} onValueChange={setFilterNotMemorized}/>
					<Text style={styles.label}>Ezberlenecekleri göster</Text>
				</View>
				<View style={styles.switch}>
					<Switch value={all} disabled={all} onValueChange={setFilterAll}/>
					<Text style={styles.label}>Hepsini göster</Text>
				</View>
				<View style={styles.buttons}>
					<TouchableOpacity style={styles.filter} onPress={_recordsLoad}>
						<Text style={styles.filterText}>Uygula</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cancel} onPress={_toggleModal}>
						<Text style={styles.cancelText}>Vazgeç</Text>
					</TouchableOpacity>
				</View>
			</View>
	</RNModal>
	
export default compose(
	connect(get.mainObj, { toggleModal, recordsLoad, setFilter }),
	withProps(m(get.filterObj)),
	withProps(({ filter }) => ({
		memorized : filter.choise === filterConst.MEMORIZED,
		notMemorized : filter.choise === filterConst.NOT_MEMORIZED,
		all : filter.choise === filterConst.ALL,		
	})),
	withHandlers({
		_toggleModal: props => val => props.toggleModal(false),
		_recordsLoad: props => val => {
			props.toggleModal(false)
			props.recordsLoad()
		},		
		setFilterMemorized: ({ setFilter }) => val => setFilter(filterConst.MEMORIZED),
		setFilterNotMemorized: ({ setFilter }) => val => setFilter(filterConst.NOT_MEMORIZED),
		setFilterAll: ({ setFilter }) => val => setFilter(filterConst.ALL),				
	})
)(Modal)


const b = {
	backgroundColor: '#4CAF50',
	width: 80, height: 30,
	borderRadius: 15,
	alignItems: 'center', justifyContent: 'center',
	padding: 4,
	shadowOffset:{  width: 2,  height: 2,  },
	shadowColor: 'black',
	shadowOpacity: 0.1,
	shadowRadius: 1,
}

	
const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		paddingHorizontal: 18,
		paddingVertical: 28,
		borderRadius: 12,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 1,
		alignSelf: 'center'
	},
	switch: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		margin: 15,
	},
	label: {
		fontSize: 16,
		//fontWeight: 'bold',
		marginLeft: 10,
		letterSpacing: 0.5,
	},
	buttons: {
		flexDirection: 'row',
		marginTop: 35,
		marginBottom: 15,
		justifyContent: 'space-around',
		padding: 3,
	},
	filter: {
		...b
	},
	cancel: {
		...b,
		backgroundColor: 'white',
		borderWidth: 1, borderColor: '#FAFAFA',
		// padding: 10,
	},
	filterText: {
		color: 'white',
		fontSize: 14,
		fontWeight: 'bold',
		letterSpacing: 0.5
	},
	cancelText: {
		color: '#444444',
		fontSize: 14,
		fontWeight: 'bold',
		letterSpacing: 0.5
	},

})