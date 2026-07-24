export interface ThemeType {
	bodyTextColour: string
	headingTextColour: string

	background: string
	backgroundSecondary: string

	padding: number
	paddingLarge: number
	paddingSmall: number

	// Semantic
	success: string
	warning: string
	error: string
}

export type ThemeMode = 'light' | 'dark'
