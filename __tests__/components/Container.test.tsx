import React from 'react'
import { screen } from '@testing-library/react-native'
import { Text, View } from 'react-native'
import { renderWithTheme } from '../testHelpers'
import { Container } from '../../components/Container'

describe('Container', () => {
	it('renders children correctly', async () => {
		await renderWithTheme(
			<Container>
				<Text>Child 1</Text>
				<Text>Child 2</Text>
			</Container>,
		)

		expect(screen.getByText('Child 1')).toBeTruthy()
		expect(screen.getByText('Child 2')).toBeTruthy()
	})

	it('renders single child correctly', async () => {
		await renderWithTheme(
			<Container>
				<Text>Single Child</Text>
			</Container>,
		)

		expect(screen.getByText('Single Child')).toBeTruthy()
	})

	it('renders nested children correctly', async () => {
		await renderWithTheme(
			<Container>
				<View>
					<Text>Nested Child</Text>
				</View>
			</Container>,
		)

		expect(screen.getByText('Nested Child')).toBeTruthy()
	})

	it('styling', async () => {
		await renderWithTheme(
			<Container>
				<></>
			</Container>,
		)

		expect(screen.toJSON()).toMatchSnapshot()
	})

	it('renders as ScrollView', async () => {
		const longContent = Array(100).fill('Content').join(' \n')

		await renderWithTheme(
			<Container>
				<Text>{longContent}</Text>
			</Container>,
		)

		expect(screen.toJSON()?.type).toBe('RCTScrollView')
	})
})
