import { useReducer, FC, useEffect } from 'react'
import { entriesReducer, EntriesContext } from './'
import type { Entry } from '@/interfaces'
import { entriesApi } from '@/apis'
import { useSnackbar } from 'notistack'

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: []
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const EntriesProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    const refreshEntries = async () => {
      try {
        const { data } = await entriesApi<Entry[]>('/entries')
        dispatch({ type: '[Entry] - Refresh Data', payload: data })
      } catch (error) {
        console.log(error)
      }
    }
    refreshEntries()
  }, [])

  const showAlertFn = (msg: string) => {
    enqueueSnackbar(msg, {
      variant: 'success',
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    })
  }

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description })
    dispatch({ type: '[Entry] - Add Entry', payload: data })
  }

  const updateEntry = async (entry: Entry, showAlert = false) => {
    const { _id, description, status } = entry
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
      dispatch({ type: '[Entry] - Updated Entry', payload: data })
      if (showAlert) {
        showAlertFn('Entrada actualizada correctamente')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteEntry = async (id: string) => {
    try {
      const { data } = await entriesApi.delete(`/entries/${id}`)
      dispatch({ type: '[Entry] - Detele Entry', payload: id })
      showAlertFn(data.msg)
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <EntriesContext.Provider value={{
      ...state,
      addNewEntry,
      updateEntry,
      deleteEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
}


