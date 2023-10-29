import { ChangeEvent, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  RadioGroup,
  TextField,
  Radio,
  capitalize,
  IconButton
} from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { Layout } from "@/components/layouts"

import type { Entry, EntryStatus } from "@/interfaces";
import { useEntriesContext } from "@/hooks";
import { dbEntries } from "@/database";
import { useRouter } from "next/router";
import { updateTimes } from "@/helpers";

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}

export default function EntryPage({ entry }: Props) {
  const { updateEntry, deleteEntry } = useEntriesContext()
  const router = useRouter()

  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)

  const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus)
  }

  const onSave = () => {
    if (!inputValue.trim().length) return
    const updatedEntry = {
      ...entry,
      description: inputValue,
      status,
    }
    updateEntry(updatedEntry, true)
    setTimeout(() => {
      router.push('/')
    }, 800);

  }

  const onDeleteEntry = () => {
    deleteEntry(entry._id)
    setTimeout(() => {
      router.push('/')
    }, 800);
  }

  const validInput = useMemo(() => Boolean(!inputValue.length) && touched, [inputValue, touched])

  return (
    <Layout title={`Tarea ${entry.status}`}>
      <Grid
        container
        justifyContent="center"
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              subheader={`Creada ${updateTimes(entry.createdAt)}`}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                autoFocus
                placeholder="Nueva entrada"
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={onTextFieldChange}
                onBlur={() => setTouched(true)}
                helperText={validInput && 'Campo obligatorio'}
                error={validInput} />

              {/* Radio */}
              <FormControl>
                <FormLabel>Estado: </FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChanged}

                >
                  {
                    validStatus.map(status => (
                      <FormControlLabel
                        key={status}
                        value={status}
                        control={<Radio />}
                        label={capitalize(status)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                fullWidth
                variant="contained"
                onClick={onSave}
                disabled={!inputValue.length}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }}
        onClick={onDeleteEntry}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }
  const entry = await dbEntries.getEntries(id)

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      entry
    }
  }
}