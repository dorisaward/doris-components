import { render, screen, userEvent } from '@testing-library/react-native'
import App from '../App'

it('should render App', async () => {
	await render(<App />)

	for (let i = 1; i < 7; i++) {
		expect(screen.getByText('This is a Heading ' + i)).toBeTruthy()
	}
	expect(screen.getByText('This is body text')).toBeTruthy()
	expect(screen.getByText('☀️ Light')).toBeTruthy()
	expect(screen.getByText('🌙 Dark')).toBeTruthy()

	expect(screen.toJSON()).toMatchSnapshot()
})

it('should render after toggling theme', async () => {
	await render(<App />)

	const toggle = screen.getByRole('switch')
	await userEvent.press(toggle)

	expect(screen.toJSON()).toMatchSnapshot()
})
