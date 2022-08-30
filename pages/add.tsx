import { Box, TextField, Button, Chip } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../components/ui/Navbar'
import { useForm } from "react-hook-form";
import { useSnackbar } from 'notistack'
import wordsApi from '../api/wordsApi';
import { IWord } from '../interfaces';

type formData = {
  word: string;
  meaning: string[];
}

const AddPage = () => {
  const {handleSubmit, register, formState: {errors}} = useForm<formData>()
  const [error, setError] = useState('')
  const {enqueueSnackbar} = useSnackbar()

  const handleAdd = async(dat: formData) => {
    const newData = dat;
        newData.meaning = dat.meaning.filter(n => n);
       try {
        const {data} = await wordsApi.post<IWord>(`/words`, {
          word: newData.word,
          meaning: newData.meaning
        });
        setError('')
        enqueueSnackbar(`Se agregó ${newData.word}. Se actualizará en unos segundos.`, {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right'
          }
      })
      } catch (error) {
         setError("Couldn't add this word. Try adding non repeated words.")
       }
  }

  return (
    <>
        <Navbar />
        <Box
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2
        }}
        >
        {
              error && (
                <Chip 
                  sx={{
                    background: 'red', color: 'white'
                  }}
                  label={error}
                  variant='outlined'
                />
              )
          }
        </Box>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center'
            }}
        >
            <form
                onSubmit={handleSubmit(handleAdd)}
                style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '60%'
                }}
            >
                <TextField 
                label={'Word'}
                error={!!errors.word}
                helperText={errors.word?.message}
                {
                    ...register('word', {
                        required: 'Type a word'
                    })
                }
                />
                {
                  [1,2,3].map(el => {
                    return (
                      <TextField 
                        label={`Meaning ${el}`}
                        key={el}
                        {
                            ...register(`meaning.${el}`)
                        }
                    />
                    )
                  })
                }
                <Button
                    type="submit"
                >Add word</Button>
            </form>
        </Box>
    </>
  )
}

export default AddPage