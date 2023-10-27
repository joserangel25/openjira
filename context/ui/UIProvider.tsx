import { useReducer, FC } from 'react'
import { UIContext, uiReducer } from './'

export interface UIState {
  isOpenMenu: boolean
  isAddingEntry: boolean
  isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
  isOpenMenu: false,
  isAddingEntry: false,
  isDragging: false
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const UIProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const openSideMenu = () => {
    dispatch({ type: 'UI - Open Sidebar' })
  }

  const closeSideMenu = () => {
    dispatch({ type: 'UI - Close Sidebar' })
  }

  const setIsAddingEntry = (open: boolean) => {
    dispatch({ type: 'UI - isAddingEntry', payload: open })
  }

  const startDraggin = () => {
    dispatch({ type: 'UI - Start Dragging' })
  }

  const endDraggin = () => {
    dispatch({ type: 'UI - End Dragging' })
  }
  return (
    <UIContext.Provider value={{
      ...state,
      openSideMenu,
      closeSideMenu,
      setIsAddingEntry,
      startDraggin,
      endDraggin
    }}>
      {children}
    </UIContext.Provider>
  )
}