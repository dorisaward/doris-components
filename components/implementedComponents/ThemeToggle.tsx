import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '../../theme/useTheme'
import { Toggle } from '../Toggle'
import { BodyText } from '../BodyText'

export const ThemeToggle = () => {
	const { mode, toggleTheme } = useTheme()
	const isDark = mode === 'dark'

	return (
		<View style={styles.container}>
			<BodyText>☀️ Light</BodyText>
			<Toggle
				value={isDark}
				onChange={toggleTheme}
				accessibilityHint={
					isDark ? 'Switch to light theme' : 'Switch to dark theme'
				}
				accessibilityLabel={`${isDark ? 'Dark' : 'Light'} mode, toggle to switch`}
			/>
			<BodyText>🌙 Dark</BodyText>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
})
