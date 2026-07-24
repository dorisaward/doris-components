import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../theme/useTheme'

export const Container = ({ children }: React.PropsWithChildren) => {
	const {
		theme: { background, padding },
	} = useTheme()
	return (
		<ScrollView
			style={[styles.container, { backgroundColor: background, padding }]}
		>
			{children}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
