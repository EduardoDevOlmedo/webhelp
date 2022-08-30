import { GetServerSideProps } from 'next'
import { dbWords } from '../../database'
import { IWord } from '../../interfaces'
import React, { useState } from 'react'
import Navbar from '../../components/ui/Navbar'
import { Box } from '@mui/system'
import { Button, Input, TextField } from '@mui/material'
import wordsApi from '../../api/wordsApi'
import { useForm } from "react-hook-form";
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'

interface Props {
    word: IWord
}

type formData = {
    word: string;
    meaning: string[];
}

const EditPage: React.FC<Props> = ({word}) => {
  
    const {enqueueSnackbar} = useSnackbar()
    const router = useRouter()
    const {handleSubmit, register, formState: {errors}} = useForm<formData>()
    

    const handleEdit = async(dat: formData) => {
        const newData = dat;
        newData.meaning = dat.meaning.filter(n => n);
        const {data} = await wordsApi.put<IWord>(`/words/${word._id}`, {
            word: newData.word,
            meaning: newData.meaning
        });
        enqueueSnackbar(`Word updated successfully.`, {
            variant: "success",
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }
        })
    }

    const handleDelete = async() => {
        const id = word._id
        
        const {data} = await wordsApi.delete(`/words`, {data: {
            id
        }})
        
        enqueueSnackbar(`Se borró ${id}. Se actualizará en unos segundos.`, {
            variant: "warning",
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }
        })
        
        setTimeout(() => {
            router.replace("/") 
        }, 1500);
    }

    return (
    <>
        <Navbar />
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center'
            }}
        >
            <form
                onSubmit={handleSubmit(handleEdit)}
                style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '60%'
                }}
            >
                <TextField 
                label={'Word'}
                defaultValue={word.word}
                error={!!errors.word}
                helperText={errors.word?.message}
                {
                    ...register('word', {
                        required: 'Type a word'
                    })
                }
                />
                {
                    word.meaning.map((meaning, index) => {
                        
                        index+=1
                        return (
                            <TextField 
                                label={`Meaning ${index}`}
                                key={index}
                                {
                                    ...register(`meaning.${index}`)
                                }
                                defaultValue={meaning}
                                
                            />
                        )
                    })
                }
{
                    word.meaning.length === 2 &&
                    (
                        <TextField 
                                label={`Meaning ${3}`}
                                {
                                    ...register(`meaning.${3}`)
                                }
                                />
                    )
                }
                {
                    word.meaning.length === 1 &&
                    (
                        <>
                        <TextField 
                                label={`Meaning ${2}`}
                                
                                {
                                    ...register(`meaning.${2}`)
                                }
                                />
                        <TextField 
                        label={`Meaning ${3}`}
                        {
                            ...register(`meaning.${3}`)
                        }
                        />
                        </>
                    )
                }
                <Button
                onClick={handleDelete}
                >Delete</Button>
                <Button
                    type="submit"
                >Edit</Button>
            </form>
        </Box>
    </>
  )
}



export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    const { id } = params  as {id: string} // your fetch function here 

    
    const word = await dbWords.getWordById(id)// your fetch function here 

    return {
        props: {
            word
        }
    }
}

export default EditPage