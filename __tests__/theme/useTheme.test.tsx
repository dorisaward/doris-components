import { useColorScheme, View, Button, Text } from 'react-native'
import { render, screen, userEvent } from '@testing-library/react-native'
import { ThemeProvider, useTheme } from '../../theme/useTheme'
import { lightTheme } from '../../theme/lightTheme'
import { darkTheme } from '../../theme/darkTheme'

const TestComponent = () => {
	const { theme, mode, toggleTheme, setTheme } = useTheme()
	return (
		<View>
			<Text testID='theme-color'>{theme.headingTextColour}</Text>
			<Text testID='theme-mode'>{mode}</Text>
			<Button title='Toggle Theme' onPress={toggleTheme} />
			<Button title='Set Light' onPress={() => setTheme('light')} />
			<Button title='Set Dark' onPress={() => setTheme('dark')} />
		</View>
	)
}

describe('useTheme', () => {
	describe('initial theme', () => {
		it('uses dark theme when device theme is dark', async () => {
			;(useColorScheme as jest.Mock).mockReturnValue('dark')

			await render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>,
			)

			expect(screen.getByTestId('theme-color')).toHaveTextContent(
				darkTheme.headingTextColour,
			)
			expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark')
		})

		it.each(['light', undefined, null])(
			'uses light theme when device theme is %p',
			async (deviceTheme) => {
				;(useColorScheme as jest.Mock).mockReturnValue(deviceTheme)

				await render(
					<ThemeProvider>
						<TestComponent />
					</ThemeProvider>,
				)

				expect(screen.getByTestId('theme-color')).toHaveTextContent(
					lightTheme.headingTextColour,
				)
				expect(screen.getByTestId('theme-mode')).toHaveTextContent('light')
			},
		)
	})
	// yo
	describe('theme switching', () => {
		it('toggles between light and dark themes', async () => {
			;(useColorScheme as jest.Mock).mockReturnValue('light')

			await render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>,
			)

			// Initially light
			expect(screen.getByTestId('theme-mode')).toHaveTextContent('light')
			expect(screen.getByTestId('theme-color')).toHaveTextContent(
				lightTheme.headingTextColour,
			)

			// Toggle to dark
			await userEvent.press(screen.getByText('Toggle Theme'))

			expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark')
			expect(screen.getByTestId('theme-color')).toHaveTextContent(
				darkTheme.headingTextColour,
			)

			// Toggle back to light
			await userEvent.press(screen.getByText('Toggle Theme'))

			expect(screen.getByTestId('theme-mode')).toHaveTextContent('light')
			expect(screen.getByTestId('theme-color')).toHaveTextContent(
				lightTheme.headingTextColour,
			)
		})

		it('sets theme to light with setTheme', async () => {
			;(useColorScheme as jest.Mock).mockReturnValue('dark')

			await render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>,
			)

			// Initially dark
			expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark')

			// Set to light
			await userEvent.press(screen.getByText('Set Light'))

			expect(screen.getByTestId('theme-mode')).toHaveTextContent('light')
			expect(screen.getByTestId('theme-color')).toHaveTextContent(
				lightTheme.headingTextColour,
			)
		})

		it('sets theme to dark with setTheme', async () => {
			;(useColorScheme as jest.Mock).mockReturnValue('light')

			await render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>,
			)

			// Initially light
			expect(screen.getByTestId('theme-mode')).toHaveTextContent('light')

			// Set to dark
			await userEvent.press(screen.getByText('Set Dark'))

			expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark')
			expect(screen.getByTestId('theme-color')).toHaveTextContent(
				darkTheme.headingTextColour,
			)
		})
	})
})
