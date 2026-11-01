export function buildWhatsAppLink(phone: string, message: string): string {
  const digitsOnly = phone.replace(/\D/g, '')
  const withCountryCode = digitsOnly.startsWith('0') ? `2${digitsOnly}` : digitsOnly.startsWith('20') ? digitsOnly : `20${digitsOnly}`
  return `https://wa.me/${withCountryCode}?text=${encodeURIComponent(message)}`
}