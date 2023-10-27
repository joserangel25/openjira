import { ChangeEvent, useState } from "react";
import { Box, Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useEntriesContext, useUiContext } from "@/hooks";

type Props = {}

export const NewEntry = (props: Props) => {
  const { addNewEntry } = useEntriesContext()
  const { isAddingEntry, setIsAddingEntry } = useUiContext()

  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const toogleIsAdding = () => setIsAddingEntry(!isAddingEntry)
  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)

  const invalidInput = Boolean(!inputValue.length) && touched

  const resetApp = () => {
    setInputValue('')
    setTouched(false)
    setIsAddingEntry(false)
  }
  const onSaveTask = () => {
    if (invalidInput) return

    addNewEntry(inputValue)
    resetApp()
  }
  const dontSaveTask = () => {
    toogleIsAdding()
    resetApp()
  }
  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>

      {
        !isAddingEntry ?
          (
            <Button
              variant="contained"
              fullWidth
              endIcon={<AddIcon />}
              onClick={toogleIsAdding}
            >
              Agregar tarea
            </Button>
          )
          :
          (
            <>
              <TextField
                fullWidth
                sx={{ marginTop: 2, marginBottom: 1 }}
                placeholder="Nueva entrada"
                multiline
                label="Nueva entrada"
                helperText={invalidInput && "El campo es obligatorio"}
                value={inputValue}
                error={invalidInput}
                onChange={onTextFieldChange}
                onBlur={() => setTouched(true)}
              />

              <Box display={"flex"} justifyContent="space-between">
                <Button
                  variant="text"
                  onClick={dontSaveTask}
                >
                  Cancelar
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  endIcon={<SaveOutlinedIcon />}
                  onClick={onSaveTask}
                >Save</Button>
              </Box>
            </>
          )
      }
    </Box>
  )
}