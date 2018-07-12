import React from 'react'
import { Text, View } from 'react-native'
import { assoc, compose, complement, concat, curry, dropLast, flatten, filter, head, isEmpty, is, join, juxt, 
	map, mapObjIndexed, merge, prop, reduce, split, slice, trim, toUpper, tail, values,
} from 'ramda'
import { withStateHandlers } from 'recompose'


export const simpleStateHandlers = (initials) => {
	const setCapitalize = compose(concat('set'), join(''), juxt([compose(toUpper, head), tail]))
	const setHandlers = (value, key) => assoc(value, props => val => assoc(key, val, {}), {})
	
	const ret = compose(
		reduce(merge,{}),
		values,
		mapObjIndexed(setHandlers),
		mapObjIndexed((value, key) => setCapitalize(key))
	)(initials)

	return withStateHandlers(initials, ret)
}

const isNotEmptyStr = compose(complement(isEmpty), trim)

export const splitItem = compose(
	filter(isNotEmptyStr),
	split('__')
)

export const splitMeaning = compose(
	filter(isNotEmptyStr),
	split('::'),
)

export const MeaningToComponent = (meaning, renderer, haveSeparator) =>
	compose(
		comps => haveSeparator ? dropLast(1, comps) : comps,
		flatten, 
		map(renderer), 
		splitMeaning
	)(meaning)

export const ItemRenderer = ({item, itemStyle, itemTextStyleGetter}) =>
	<View style={itemStyle}>
		{
			splitItem(item).map(itemItem => {
				const a = slice(0, 3, itemItem)
				const b = slice(3, itemItem.length, itemItem)
				return <Text style={itemTextStyleGetter(a)} key={b}>{b}</Text>
			})
		}
	</View>

export const pageNumOfHorizontalScrollView = e => {
	const { contentOffset, layoutMeasurement } = e.nativeEvent
	return Math.floor(contentOffset.x / layoutMeasurement.width)
}