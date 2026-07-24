import React from 'react'
import { screen, userEvent } from '@testing-library/react-native'
import { renderWithTheme } from '../testHelpers'
import { Toggle } from '../../components/Toggle'

describe('Toggle', () => {
	describe('rendering', () => {
		it('renders with correct initial state', async () => {
			const mockOnChange = jest.fn()
			await renderWithTheme(
				<Toggle
					value={false}
					onChange={mockOnChange}
					accessibilityLabel='Test toggle'
					accessibilityHint='Toggle test'
				/>,
			)

			const toggle = screen.getByRole('switch')
			expect(toggle).toBeTruthy()
		})

		it.each([true, false])(
			'shows correct accessibility state when value is %s',
			async (accessibilityState) => {
				const mockOnChange = jest.fn()
				await renderWithTheme(
					<Toggle
						value={accessibilityState}
						onChange={mockOnChange}
						accessibilityLabel='Test toggle'
						accessibilityHint='Toggle test'
					/>,
				)

				const toggle = screen.getByRole('switch')
				expect(toggle.props.accessibilityState.checked).toBe(accessibilityState)
			},
		)

		it('applies accessibility props correctly', async () => {
			const mockOnChange = jest.fn()
			const accessibilityLabel = 'Dark mode toggle'
			const accessibilityHint = 'Switch between light and dark theme'
			await renderWithTheme(
				<Toggle
					value={false}
					onChange={mockOnChange}
					accessibilityLabel={accessibilityLabel}
					accessibilityHint={accessibilityHint}
				/>,
			)

			const toggle = screen.getByRole('switch')
			expect(toggle.props.accessibilityLabel).toBe(accessibilityLabel)
			expect(toggle.props.accessibilityHint).toBe(accessibilityHint)
		})

		it('sets accessibilityValue text based on state', async () => {
			const mockOnChange = jest.fn()
			const restProps = {
				onChange: mockOnChange,
				accessibilityLabel: 'Test toggle',
				accessibilityHint: 'Toggle test',
			}
			const { rerender } = await renderWithTheme(
				<Toggle value={false} {...restProps} />,
			)

			let toggle = screen.getByRole('switch')
			expect(toggle.props.accessibilityValue.text).toBe('Off')

			await rerender(<Toggle value={true} {...restProps} />)

			toggle = screen.getByRole('switch')
			expect(toggle.props.accessibilityValue.text).toBe('On')
		})
	})

	describe('interactions', () => {
		it('calls onChange when pressed', async () => {
			const mockOnChange = jest.fn()
			await renderWithTheme(
				<Toggle
					value={false}
					onChange={mockOnChange}
					accessibilityLabel='Test toggle'
					accessibilityHint='Toggle test'
				/>,
			)

			const toggle = screen.getByRole('switch')
			await userEvent.press(toggle)

			expect(mockOnChange).toHaveBeenCalledTimes(1)
			expect(mockOnChange).toHaveBeenCalledWith(true)
		})

		it('toggles from false to true on press', async () => {
			const mockOnChange = jest.fn()
			await renderWithTheme(
				<Toggle
					value={false}
					onChange={mockOnChange}
					accessibilityLabel='Test toggle'
					accessibilityHint='Toggle test'
				/>,
			)

			const toggle = screen.getByRole('switch')
			await userEvent.press(toggle)

			expect(mockOnChange).toHaveBeenCalledWith(true)
		})

		it('toggles from true to false on press', async () => {
			const mockOnChange = jest.fn()
			await renderWithTheme(
				<Toggle
					value={true}
					onChange={mockOnChange}
					accessibilityLabel='Test toggle'
					accessibilityHint='Toggle test'
				/>,
			)

			const toggle = screen.getByRole('switch')
			await userEvent.press(toggle)

			expect(mockOnChange).toHaveBeenCalledWith(false)
		})

		it('handles multiple presses correctly', async () => {
			const mockOnChange = jest.fn()
			await renderWithTheme(
				<Toggle
					value={false}
					onChange={mockOnChange}
					accessibilityLabel='Test toggle'
					accessibilityHint='Toggle test'
				/>,
			)

			const toggle = screen.getByRole('switch')

			await userEvent.press(toggle)
			expect(mockOnChange).toHaveBeenLastCalledWith(true)

			await userEvent.press(toggle)
			expect(mockOnChange).toHaveBeenLastCalledWith(true) // Still true because value hasn't updated in test

			// In a real scenario, the parent would update the value
			// We're just testing that onChange is called correctly
			expect(mockOnChange).toHaveBeenCalledTimes(2)
		})
	})

	it.each([true, false])(
		'renders using theme, given toggle value %p',
		async (value) => {
			const mockOnChange = jest.fn()
			await renderWithTheme(
				<Toggle
					value={value}
					onChange={mockOnChange}
					accessibilityLabel='Test toggle'
					accessibilityHint='Toggle test'
				/>,
			)

			expect(screen.toJSON()).toMatchSnapshot()
		},
	)

	describe('accessibility', () => {
		it('has switch role', async () => {
			const mockOnChange = jest.fn()
			await renderWithTheme(
				<Toggle
					value={false}
					onChange={mockOnChange}
					accessibilityLabel='Test toggle'
					accessibilityHint='Toggle test'
				/>,
			)

			const toggle = screen.getByRole('switch')
			expect(toggle.props.accessibilityRole).toBe('switch')
		})

		it('has accessibilityState with checked value', async () => {
			const mockOnChange = jest.fn()
			await renderWithTheme(
				<Toggle
					value={true}
					onChange={mockOnChange}
					accessibilityLabel='Test toggle'
					accessibilityHint='Toggle test'
				/>,
			)

			const toggle = screen.getByRole('switch')
			expect(toggle.props.accessibilityState).toEqual({
				checked: true,
				disabled: false,
				busy: false,
			})
		})

		it('has accessibilityValue with text', async () => {
			const mockOnChange = jest.fn()
			await renderWithTheme(
				<Toggle
					value={true}
					onChange={mockOnChange}
					accessibilityLabel='Test toggle'
					accessibilityHint='Toggle test'
				/>,
			)

			const toggle = screen.getByRole('switch')
			expect(toggle.props.accessibilityValue).toEqual({
				text: 'On',
			})
		})

		it('passes through additional accessibility props', async () => {
			const mockOnChange = jest.fn()
			await renderWithTheme(
				<Toggle
					value={false}
					onChange={mockOnChange}
					accessibilityLabel='Test toggle'
					accessibilityHint='Toggle test'
					accessibilityLiveRegion='polite'
					importantForAccessibility='yes'
				/>,
			)

			const toggle = screen.getByRole('switch')
			expect(toggle.props.accessibilityLiveRegion).toBe('polite')
			expect(toggle.props.importantForAccessibility).toBe('yes')
		})
	})

	// describe('error handling', () => {
	// 	it('throws error when accessibilityLabel is missing', () => {
	// 		// TypeScript would catch this, but we test runtime behavior
	// 		const mockOnChange = jest.fn()
	// 		// @ts-ignore - testing missing required prop
	// 		expect(
	// 			() =>
	// 				await renderWithTheme(
	// 					<Toggle
	// 						value={false}
	// 						onChange={mockOnChange}
	// 						accessibilityHint='Toggle test'
	// 					/>,
	// 				),
	// 		).toThrow()
	// 	})
	//
	// 	it('throws error when accessibilityHint is missing', () => {
	// 		const mockOnChange = jest.fn()
	// 		// @ts-ignore - testing missing required prop
	// 		expect(
	// 			() =>
	// 				await renderWithTheme(
	// 					<Toggle
	// 						value={false}
	// 						onChange={mockOnChange}
	// 						accessibilityLabel='Test toggle'
	// 					/>,
	// 				),
	// 		).toThrow()
	// 	})
	// })
})
