import { createContext } from 'react';

export interface ContextProps {
  isOpenMenu: boolean
  isAddingEntry: boolean
  isDragging: boolean
  openSideMenu: () => void
  closeSideMenu: () => void
  setIsAddingEntry: (open: boolean) => void
  startDraggin: () => void
  endDraggin: () => void
}

export const UIContext = createContext({} as ContextProps)