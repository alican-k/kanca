import React from 'react'
import { Provider } from 'react-redux'
import codepush from 'react-native-code-push'
import store from './store'
import { setNavigation } from './helpers/navigation'
import Navigator from './Navigator'

import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])
console.disableYellowBox = true;


const Index = () =>
	<Provider store={store}>
		<Navigator ref={ref => setNavigation(ref)} />
	</Provider>

export default codepush(Index)