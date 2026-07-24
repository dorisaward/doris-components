import { render } from '@testing-library/react-native'
import React from 'react'
import { ThemeProvider } from '../theme/useTheme'
import { useColorScheme } from 'react-native'

export const renderWithTheme = async (
	ui: React.ReactElement,
	theme = 'light',
) => {
	;(useColorScheme as jest.Mock).mockReturnValue(theme)
	await render(<ThemeProvider>{ui}</ThemeProvider>)
}
