import { updateTimes } from "@/helpers"
import { useUiContext } from "@/hooks"
import { Entry } from "@/interfaces"
import { Card, CardActionArea, CardContent, Typography, CardActions } from "@mui/material"
import { useRouter } from "next/router"
import { DragEvent } from "react"

interface Props {
  entry: Entry
}

export const EntryCard = ({ entry }: Props) => {
  const { description, _id, createdAt } = entry
  const router = useRouter()

  const { startDraggin, endDraggin } = useUiContext();
  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', entry._id)
    startDraggin()
  }

  const onClickCard = () => {
    router.push(`/entries/${_id}`)
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={endDraggin}
      onClick={onClickCard}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{description}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant="body2" >{updateTimes(createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}