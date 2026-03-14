/**
 * Returns an absolute URL for the given path.
 * In the browser we always use the current origin so relative API paths work
 * regardless of the deployment host. On the server-side we fall back to the
 * NEXT_PUBLIC_API_URL env variable.
 */
export function makeAbsoluteUrl(url: string | undefined): string {
  if (!url) return ''

  // Already absolute – return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // In the browser use the current origin
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`
  }

  // Server-side: use configured API URL or empty string (relative)
  const base = process.env.NEXT_PUBLIC_API_URL ?? ''
  return `${base}${url.startsWith('/') ? '' : '/'}${url}`
}
