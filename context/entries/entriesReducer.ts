import { Entry } from '@/interfaces';
import { EntriesState } from './';

type EntriesActionType =
  | { type: '[Entry] - Add Entry', payload: Entry }
  | { type: '[Entry] - Updated Entry', payload: Entry }
  | { type: '[Entry] - Detele Entry', payload: string }
  | { type: '[Entry] - Refresh Data', payload: Entry[] }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  const { type, payload } = action
  switch (type) {
    case '[Entry] - Add Entry':
      return {
        ...state,
        entries: [...state.entries, payload]
      }
    case '[Entry] - Updated Entry':
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry._id === payload._id) {
            entry.status = payload.status
            entry.description = payload.description
          }
          return entry
        })
      }
    case '[Entry] - Detele Entry':
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== payload)
      }
    case '[Entry] - Refresh Data':
      return {
        ...state,
        entries: [...payload]
      }
    default:
      return state
  }
}