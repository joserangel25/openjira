import { UIContext } from '@/context/ui';
import { useContext } from 'react';

export const useUiContext = () => {
  return useContext(UIContext)
}