import { getApiBaseUrl } from './utils'

/**
 * Saves badge settings to the API and clears the server-side config cache
 * so that the next read picks up the new values.
 */
export async function saveSettingsWithCacheClear(filename: string, settings: unknown): Promise<void> {
  const baseUrl = getApiBaseUrl()

  // 1. Persist the settings
  const saveResponse = await fetch(`${baseUrl}/api/v1/config/${filename}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ config: settings }),
  })

  if (!saveResponse.ok) {
    const text = await saveResponse.text().catch(() => saveResponse.statusText)
    throw new Error(`Failed to save settings: ${text}`)
  }

  // 2. Clear the cache so the backend reloads the file on next access
  await fetch(`${baseUrl}/api/v1/config/cache/clear`, {
    method: 'POST',
  }).catch(() => {
    // Non-fatal – the settings are saved even if cache clear fails
    console.warn('Could not clear settings cache')
  })
}
