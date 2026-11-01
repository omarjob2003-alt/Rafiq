export function parseServerDate(value: string): Date {
  const normalized = value.replace(/(\.\d{3})\d+/, '$1')
  const hasZone = /(Z|[+-]\d{2}:\d{2})$/.test(normalized)
  return new Date(hasZone ? normalized : `${normalized}Z`)
}