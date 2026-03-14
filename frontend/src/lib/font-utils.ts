export interface FontSelectProps {
  value: string
  onValueChange: (value: string) => void
  availableFonts?: string[]
  placeholder?: string
  disabled?: boolean
}

const BUILT_IN_FONTS = [
  'AvenirNextLTProBold.otf',
  'DejaVuSans.ttf',
  'ARIAL.TTF',
]

/**
 * Combines the built-in font list with any additional fonts loaded from the API.
 */
export function getCombinedFontList(apifonts: string[]): string[] {
  const combined = new Set([...BUILT_IN_FONTS, ...apifonts])
  return Array.from(combined).sort()
}

/**
 * Fetches the list of available fonts from the API.
 */
export async function loadAvailableFonts(): Promise<string[]> {
  try {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_API_URL ?? '')
    const response = await fetch(`${baseUrl}/api/v1/config/available-fonts`)
    if (!response.ok) return BUILT_IN_FONTS

    const data = await response.json()
    return data.fonts ?? BUILT_IN_FONTS
  } catch {
    return BUILT_IN_FONTS
  }
}
