import React from 'react'
import { Text } from 'react-native'
import { intersection, keys, get } from 'lodash'

import { rem } from '../Services/utils'
import Colors from '../Theme/Colors'
import Assets from '../Assets'

const defaultFont = {
	// fontFamily: 'ProximaNova-Regular',
	color: '#464646',
}

export const TmText = (props) => {
	const matchingStyles = intersection(keys(props), keys(style)).map((s) =>
		get(style, s),
	)
	return <Text {...props} style={[{ ...defaultFont }, matchingStyles]} />
}

const style = {
	header: {
		fontSize: rem(22),
		// fontFamily: 'ProximaNova-Bold'
	},
	centered: {
		textAlign: 'center',
	},
	tmSubtitle: {
		width: '70%',
		textAlign: 'center',
		alignSelf: 'center',
		lineHeight: rem(21),
		paddingTop: rem(7),
	},
	classHeader: {
		fontSize: rem(18),
		// fontFamily: 'ProximaNova-Bold',
	},
	newMsgBadge: {
		color: Assets.Colors.white,
	},
	role: {
		color: 'white',
		fontWeight: 'bold',
	},
	classesCreatedDate: {
		color: Assets.Colors.heighLight
	},
	wayoTitle: {
		fontSize: rem(15),
	},
	mMarginLeft: {
		marginLeft: rem(5)
	},
	delete: {
		textAlign: 'center',
		color: '#FFFFFF',
		margin: rem(10),
		fontWeight: 'bold',
	},
	likeDislike: {
		fontWeight: 'bold',
		fontSize: rem(15),
		color: Colors.text,
	},
}
