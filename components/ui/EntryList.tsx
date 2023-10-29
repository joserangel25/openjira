import { DragEvent, useMemo } from "react"
import { List, Paper } from "@mui/material"
import { EntryCard } from "./"
import { EntryStatus } from "@/interfaces"
import { useEntriesContext, useUiContext } from "@/hooks"
import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList = ({ status }: Props) => {
  const { entries, updateEntry } = useEntriesContext()
  const { isDragging, endDraggin } = useUiContext()

  const entriesToView = useMemo(() =>
    entries.filter((entry) => entry.status === status),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries])

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('text')
    const entry = entries.find(entry => entry._id === id)!
    entry.status = status
    updateEntry(entry)
    endDraggin()
  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{ flexGrow: 1, overflowY: "auto", padding: 10 }}
      className={`${styles.bgColor} ${isDragging ? styles.dragging : ''}`}
    >
      <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all .3s' }}>
        {
          entriesToView.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))
        }
      </List>
    </div >
  )
}