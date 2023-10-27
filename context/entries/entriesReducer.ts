import { Entry } from '@/interfaces';
import { EntriesState } from './';

type EntriesActionType =
  | { type: '[Entry] - Add Entry', payload: Entry }
  | { type: '[Entry] - Updated Entry', payload: Entry }

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
    default:
      return state
  }
}