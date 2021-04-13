import React from 'react'
import { ListItem, Text, Left, Body, Right } from 'native-base'
import { intersection, keys, get } from 'lodash'

import { rem } from '../Services/utils'
import { TmIcon } from './TmIcon'
import Assets from '../Assets'

export const TmListItem = (props) => {
	console.log('props inside TmListItem??', props)
	const { icon, iconColor, title, _onPress, white } = props
	const matchingStyles = intersection(keys(props), keys(styles)).map((s) =>
		get(styles, s),
	)
	return (
		<ListItem style={matchingStyles} icon onPress={_onPress}>
			<Left>
				<TmIcon color={iconColor || Assets.Colors.primary} name={icon} />
			</Left>
			<Body>
				<Text>{title}</Text>
			</Body>
			<Right>
				<TmIcon name="chevron-right" />
			</Right>
		</ListItem>
	)
}

const styles = {
	default: {},
	parent: {
		flex: 1,
	},
	content: {
		marginTop: rem(30),
		margin: rem(22),
	},
	pushBottom: {
		flexGrow: 1,
		justifyContent: 'flex-end',
	},
	white: {
		backgroundColor: Assets.Colors.white
	}
}
