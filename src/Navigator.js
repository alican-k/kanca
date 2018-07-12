import React from 'react'
import {  } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import AuthScreen from './components/auth'
import ListScreen from './components/list'
import ListNav from './components/list/Nav'
import RecordScreen from './components/record'
import { Title, Right } from './components/record/Nav' 
import EditScreen from './components/edit'
import MiscScreen from './components/misc'
import { MiscLeft } from './components/misc/Nav'

const Navigator = createStackNavigator({
	Auth: {
		screen: AuthScreen,
		navigationOptions: { header: null }
	},
	List: {
		screen: ListScreen,
		navigationOptions: {
			header: <ListNav />
		}
	},
	Record: {
		screen: RecordScreen,
		navigationOptions: {
			headerTitle: <Title />,
			headerRight: <Right />,
			headerStyle: {
				backgroundColor: 'white'
			}
		}
	},
	Edit: {
		screen: EditScreen,
		navigationOptions: {
			headerTitle: <Title />,			
		}
	},
	Misc: {
		screen: MiscScreen,
		navigationOptions: {
			headerLeft: <MiscLeft />,
			title: 'ÇENGEL'
		}
	}
})

export default Navigator