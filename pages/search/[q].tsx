import { GetServerSideProps, NextPage } from 'next'
import Navbar from '../../components/ui/Navbar'
import { Typography, Grid, Box } from '@mui/material'
import { IWord } from '../../interfaces'
import React from 'react'
import WordCard from '../../components/ui/WordCard'
import { dbWords } from '../../database'

interface Props {
    words: IWord[]
}

const SearchPage:NextPage<Props> = ({words}) => {
  return (
    <>
    <Navbar />
    <Box
        sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}
    >
        <Typography>We found {words.length} words matching that query</Typography>
    </Box>

    <Grid container 
            spacing={3}
            sx={{
              margin: '0 auto',
              textAlign: 'center',
              width: '90%',
              justifyContent: 'space-between', alignItems: 'center', display: 'flex'}}
        >
        {
            words.map(word => {
                return (
                <Grid key={word._id} item xs={12} md={4}>
                    <WordCard 
                        _id={word._id}
                        title={word.word}
                        meanings={word.meaning}
                    />
                </Grid>        
                )
            })
        }
    </Grid>
    </>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { q } = params  as {q: string} // your fetch function here 
    
    const words = await dbWords.getWordByTerm(q)


    if(!words){
        return {
            redirect: {
                destination: "/",
                permanent: true
            }
        }
    }

    return {
        props: {
            words
        }
    }
}

export default SearchPage