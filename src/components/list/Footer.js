import React from 'react'
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import { m, get } from '../../helpers/state'
import { moreStatusConst } from '../../constants'
	
const Footer = ({ moreStatus }) =>
	<View style={styles.container}>
		{moreStatus === moreStatusConst.LOADING && <ActivityIndicator />}
		{moreStatus === moreStatusConst.NOT_NEED && <Text style={styles.finished}>- Daha fazla sonuç yok -</Text>}
	</View>
	
export default compose(
	connect(get.mainObj, null),
	withProps(m(get.moreStatusObj))
)(Footer)
	
const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5
	},
	finished: {
		fontSize: 12,
		color: 'grey',
		letterSpacing: 1.5,
		// fontWeight: 'bold',
		// backgroundColor: '#f9f9f9',
		marginTop: 5,
		padding: 5,
		paddingHorizontal: 10
	}
})