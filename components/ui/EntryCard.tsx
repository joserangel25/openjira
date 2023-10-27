import { useUiContext } from "@/hooks"
import { Entry } from "@/interfaces"
import { Card, CardActionArea, CardContent, Typography, CardActions } from "@mui/material"
import { DragEvent } from "react"

interface Props {
  entry: Entry
}

export const EntryCard = ({ entry }: Props) => {
  const { description } = entry

  const { startDraggin, endDraggin } = useUiContext();
  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', entry._id)
    startDraggin()
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={endDraggin}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{description}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant="body2" >Hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}