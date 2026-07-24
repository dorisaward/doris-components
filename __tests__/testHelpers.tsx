import { render } from '@testing-library/react-native'
import React from 'react'
import { ThemeProvider } from '../theme/useTheme'
import { useColorScheme } from 'react-native'

export const renderWithTheme = async (
	ui: React.ReactElement,
	theme = 'light',
) => {
	;(useColorScheme as jest.Mock).mockReturnValue(theme)
	const { rerender } = await render(<ThemeProvider>{ui}</ThemeProvider>)

	const rerenderFunction = (newUi: React.ReactElement) =>
		rerender(<ThemeProvider>{newUi}</ThemeProvider>)
	return { rerender: rerenderFunction }
}
