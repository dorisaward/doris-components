// import '@testing-library/react-native/extend-expect'

// Mock useColorScheme for Expo
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
	__esModule: true,
	default: jest.fn(() => 'light'),
}))

// Mock Expo modules
jest.mock('expo', () => ({
	Constants: {
		manifest: {},
		expoConfig: {},
		executionEnvironment: 'storeClient',
		appOwnership: 'standalone',
	},
}))

// Reset mocks between tests
beforeEach(() => {
	jest.clearAllMocks()
})
