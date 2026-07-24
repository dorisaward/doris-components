import React from 'react'
import { screen } from '@testing-library/react-native'
import { BodyText } from '../../components/BodyText'
import { renderWithTheme } from '../testHelpers'
import { lightTheme } from '../../theme/lightTheme'
import { darkTheme } from '../../theme/darkTheme'

describe('BodyText', () => {
	it('renders', async () => {
		const specialChars = '@#$%^&*() 🏆'
		const numbers = '123'
		const longText = 'A\n'.repeat(1000)

		const text = specialChars + '\n' + numbers + '\n' + longText
		await renderWithTheme(<BodyText>{text}</BodyText>)

		expect(screen.getByText(text)).toBeTruthy()
	})

	it.each(['light', 'dark'])(
		'applies body text color from %p theme',
		async (initialTheme) => {
			await renderWithTheme(<BodyText>Test</BodyText>, initialTheme)
			const theme = initialTheme === 'light' ? lightTheme : darkTheme

			const text = screen.getByText('Test')
			expect(text).toHaveStyle({
				color: theme.bodyTextColour,
				paddingBottom: theme.paddingSmall,
				fontSize: 18,
				lineHeight: 24,
			})
			expect(screen.toJSON()).toMatchSnapshot()
		},
	)
})
