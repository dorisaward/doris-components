import React from 'react'
import { screen } from '@testing-library/react-native'
import { Heading } from '../../components/Heading'
import { darkTheme } from '../../theme/darkTheme'
import { lightTheme } from '../../theme/lightTheme'
import { renderWithTheme } from '../testHelpers'

describe('Heading', () => {
	it('renders the heading text correctly', async () => {
		await renderWithTheme(<Heading text='Hello World' level={1} />)

		expect(screen.getByText('Hello World')).toBeTruthy()
	})

	it('applies the correct heading level styles', async () => {
		await renderWithTheme(<Heading text='Test' level={2} />)
		const heading = screen.getByText('Test')

		// Check that heading2 styles are applied
		expect(heading.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					fontSize: 30,
					fontWeight: '600',
					lineHeight: 30,
				}),
			]),
		)
	})

	it('uses heading colour from light theme', async () => {
		await renderWithTheme(<Heading text='Test' level={1} />, 'light')
		const heading = screen.getByText('Test')

		expect(heading.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					color: lightTheme.headingTextColour,
				}),
			]),
		)
	})

	it('uses heading colour from dark theme', async () => {
		await renderWithTheme(<Heading text='Test' level={1} />, 'dark')
		const heading = screen.getByText('Test')

		expect(heading.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					color: darkTheme.headingTextColour,
				}),
			]),
		)
	})

	it('applies padding from theme', async () => {
		await renderWithTheme(<Heading text='Test' level={1} />)
		const heading = screen.getByText('Test')

		expect(heading.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					paddingBottom: lightTheme.paddingLarge,
				}),
			]),
		)
	})

	it.each<[1 | 2 | 3 | 4 | 5 | 6, number, string]>([
		[1, 40, '700'],
		[2, 30, '600'],
		[3, 28, '500'],
		[4, 26, '400'],
		[5, 24, '300'],
		[6, 20, '200'],
	])(
		'renders heading level %p correctly',
		async (level, expectedFontSize, expectedFontWeight) => {
			await renderWithTheme(<Heading text={`Heading ${level}`} level={level} />)
			const heading = screen.getByText(`Heading ${level}`)

			expect(heading.props.style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						fontSize: expectedFontSize,
						fontWeight: expectedFontWeight,
					}),
				]),
			)
		},
	)
})
