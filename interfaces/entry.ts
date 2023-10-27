export interface Entry {
  _id: string
  description: string
  createdAd: number
  status: EntryStatus
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished'