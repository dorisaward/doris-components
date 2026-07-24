import React from 'react'
import { screen, userEvent } from '@testing-library/react-native'
import { renderWithTheme } from '../../testHelpers'
import { ThemeToggle } from '../../../components/implementedComponents/ThemeToggle'

describe.each(['light', 'dark'])('ThemeToggle %p', (initialThemeMode) => {
	describe('rendering mode', () => {
		it('renders theme labels when in mode', async () => {
			await renderWithTheme(<ThemeToggle />, initialThemeMode)

			expect(screen.getByText('☀️ Light')).toBeTruthy()
			expect(screen.getByText('🌙 Dark')).toBeTruthy()
		})

		it('renders toggle with correct initial state in mode', async () => {
			await renderWithTheme(<ThemeToggle />, initialThemeMode)

			const toggle = screen.getByRole('switch')
			expect(toggle.props.accessibilityState.checked).toBe(
				initialThemeMode === 'dark',
			)
		})

		it('has correct accessibility label in mode', async () => {
			const sentenceCase = initialThemeMode === 'dark' ? 'Dark' : 'Light'
			await renderWithTheme(<ThemeToggle />, initialThemeMode)

			const toggle = screen.getByRole('switch')
			expect(toggle.props.accessibilityLabel).toBe(
				sentenceCase + ' mode, toggle to switch',
			)
		})

		it('has correct accessibility hint in mode', async () => {
			await renderWithTheme(<ThemeToggle />, initialThemeMode)

			const toggle = screen.getByRole('switch')
			expect(toggle.props.accessibilityHint).toBe(
				`Switch to ${initialThemeMode === 'dark' ? 'light' : 'dark'} theme`,
			)
		})

		it('renders correctly', async () => {
			await renderWithTheme(<ThemeToggle />, initialThemeMode)

			expect(screen.toJSON()).toMatchSnapshot()
		})
	})

	describe('interactions', () => {
		it('toggles theme when pressed', async () => {
			await renderWithTheme(<ThemeToggle />, initialThemeMode)

			const toggle = screen.getByRole('switch')

			// Initially unchecked (light mode)
			expect(toggle.props.accessibilityState.checked).toBe(
				initialThemeMode === 'dark',
			)
			expect(screen.getByText('☀️ Light')).toBeTruthy()
			expect(screen.getByText('🌙 Dark')).toBeTruthy()

			// Press to toggle
			await userEvent.press(toggle)

			expect(toggle.props.accessibilityState.checked).toBe(
				initialThemeMode === 'light',
			)
		})
	})

	describe('accessibility', () => {
		it('has correct accessibility role', async () => {
			await renderWithTheme(<ThemeToggle />, initialThemeMode)

			const toggle = screen.getByRole('switch')
			expect(toggle.props.accessibilityRole).toBe('switch')
		})

		it('has correct accessibility state', async () => {
			await renderWithTheme(<ThemeToggle />, initialThemeMode)

			const toggle = screen.getByRole('switch')

			const expectedAccessibilityState =
				initialThemeMode === 'dark'
					? {
							busy: false,
							checked: true,
							disabled: false,
						}
					: {
							checked: false,
							disabled: false,
							busy: false,
						}
			expect(toggle.props.accessibilityState).toEqual(
				expectedAccessibilityState,
			)
		})

		it('has correct accessibility value', async () => {
			await renderWithTheme(<ThemeToggle />, initialThemeMode)

			const toggle = screen.getByRole('switch')

			const expectedAccessibilityValue =
				initialThemeMode === 'dark' ? { text: 'On' } : { text: 'Off' }
			expect(toggle.props.accessibilityValue).toEqual(
				expectedAccessibilityValue,
			)
		})
	})
})
