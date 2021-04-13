import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Config } from 'App/Config'

export const TmIcon = (props) => {
	// return <AwesomeIcon {...props} />
	return (<TouchableOpacity onPress={props.onPress || null}>
		<Avatar.Icon
			icon={props.icon || props.name || ''}
			color={props.color || Config.PRIMARY_COLOR}
			size={props.size || 50}
			style={{ backgroundColor: props.backgroundColor || 'transparent' }}
		/></TouchableOpacity>)
}