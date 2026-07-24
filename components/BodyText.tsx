import { StyleSheet, Text } from 'react-native'
import { useTheme } from '../theme/useTheme'
import React from 'react'

export const BodyText = ({ children }: React.PropsWithChildren) => {
	const {
		theme: { bodyTextColour, paddingSmall },
	} = useTheme()

	return (
		<Text
			style={[
				styles.body,
				{ color: bodyTextColour, paddingBottom: paddingSmall },
			]}
		>
			{children}
		</Text>
	)
}

const styles = StyleSheet.create({
	body: {
		fontSize: 18,
		lineHeight: 24,
	},
})
