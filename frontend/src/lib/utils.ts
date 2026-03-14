import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the API base URL.
 * In the browser we always use the current origin so relative API paths work
 * regardless of the deployment host and regardless of whether
 * NEXT_PUBLIC_API_URL was set at build time.
 */
export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) return ''
  return apiUrl
}
