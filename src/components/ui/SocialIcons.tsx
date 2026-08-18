import type { SVGProps } from 'react'

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
  </svg>
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 8.5h2V5.5h-2c-1.93 0-3.5 1.57-3.5 3.5v2H8.5v3H10.5V19h3v-6h2l.5-3h-2.5V9c0-.28.22-.5.5-.5Z" />
  </svg>
}

export function TiktokIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 4v9.7a3.3 3.3 0 1 1-3.3-3.3" />
    <path d="M15 4c.4 2.3 2.1 4 4.5 4.3" />
  </svg>
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="6" width="18" height="12" rx="4" />
    <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
  </svg>
}