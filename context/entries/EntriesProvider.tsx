import { useReducer, FC } from 'react'
import { entriesReducer, EntriesContext } from './'
import { Entry } from '@/interfaces'
import { generateId } from '@/helpers'

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: generateId(),
      description: 'Pendiente: Esta es una descripcion',
      createdAd: Date.now() - 1000000,
      status: 'pending'
    },
    {
      _id: generateId(),
      description: 'En progreso: Lorem ipsum jose darndkjas lahsdfkue fadskhlf adsfasd',
      createdAd: Date.now(),
      status: 'in-progress'
    },
    {
      _id: generateId(),
      description: 'Terminada: Esta es una descripcion',
      createdAd: Date.now() - 100000,
      status: 'finished'
    }
  ]
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const EntriesProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = (description: string) => {
    const entry: Entry = {
      _id: generateId(),
      status: "pending",
      description,
      createdAd: Date.now()
    }
    dispatch({ type: '[Entry] - Add Entry', payload: entry })
  }

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entry] - Updated Entry', payload: entry })
  }
  return (
    <EntriesContext.Provider value={{
      ...state,
      addNewEntry,
      updateEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
}