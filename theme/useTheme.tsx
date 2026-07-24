import React, { createContext, useContext, useState, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { lightTheme } from './lightTheme'
import { darkTheme } from './darkTheme'
import { ThemeType, ThemeMode } from './ThemeType'

interface ThemeContextType {
	theme: ThemeType
	mode: ThemeMode
	toggleTheme: () => void
	setTheme: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const deviceTheme = useColorScheme()
	const [mode, setMode] = useState<ThemeMode>(deviceTheme || 'light')

	useEffect(() => {
		if (deviceTheme) {
			setMode(deviceTheme)
		}
	}, [deviceTheme])

	const theme = mode === 'light' ? lightTheme : darkTheme

	const toggleTheme = () => {
		setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
	}

	const setTheme = (newMode: ThemeMode) => {
		setMode(newMode)
	}

	return (
		<ThemeContext.Provider value={{ theme, mode, toggleTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}
