import type { Collection } from '../types'

export interface CollectionEdit {
  name?: string
  nameEn?: string
  description?: string
  image?: string
}

const EDITS_KEY = 'rafiq-collection-edits'
const CUSTOM_KEY = 'rafiq-custom-collections'
const DELETED_KEY = 'rafiq-deleted-collections'

function getEdits(): Record<string, CollectionEdit> {
  try { return JSON.parse(localStorage.getItem(EDITS_KEY) ?? '{}') } catch { return {} }
}
function getCustom(): Collection[] {
  try { return JSON.parse(localStorage.getItem(CUSTOM_KEY) ?? '[]') } catch { return [] }
}
function getDeleted(): string[] {
  try { return JSON.parse(localStorage.getItem(DELETED_KEY) ?? '[]') } catch { return [] }
}

// بتتنفذ مرة واحدة لما collections.ts يتحمّل، وبتدمج أي تعديلات/إضافات/حذف محفوظة
export function applyCollectionOverrides(collections: Collection[]) {
  const edits = getEdits()
  const deleted = new Set(getDeleted())

  for (let i = collections.length - 1; i >= 0; i--) {
    const collection = collections[i]
    if (deleted.has(collection.id)) {
      collections.splice(i, 1)
      continue
    }
    const edit = edits[collection.id]
    if (edit) Object.assign(collection, edit)
  }

  const custom = getCustom().filter(c => !deleted.has(c.id))
  custom.forEach(c => {
    if (!collections.some(existing => existing.id === c.id)) collections.push(c)
  })
}

export function isCustomCollection(id: string): boolean {
  return getCustom().some(c => c.id === id)
}

export function addCustomCollection(collection: Collection, collections: Collection[]) {
  const custom = getCustom()
  custom.push(collection)
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom))
  collections.push(collection)
}

export function updateCollection(id: string, edit: CollectionEdit, collections: Collection[]) {
  if (isCustomCollection(id)) {
    const custom = getCustom().map(c => c.id === id ? { ...c, ...edit } : c)
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom))
  } else {
    const edits = getEdits()
    edits[id] = { ...edits[id], ...edit }
    localStorage.setItem(EDITS_KEY, JSON.stringify(edits))
  }
  const target = collections.find(c => c.id === id)
  if (target) Object.assign(target, edit)
}

export function deleteCollection(id: string, collections: Collection[]) {
  const deleted = getDeleted()
  if (!deleted.includes(id)) deleted.push(id)
  localStorage.setItem(DELETED_KEY, JSON.stringify(deleted))

  const custom = getCustom().filter(c => c.id !== id)
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom))

  const index = collections.findIndex(c => c.id === id)
  if (index !== -1) collections.splice(index, 1)
}