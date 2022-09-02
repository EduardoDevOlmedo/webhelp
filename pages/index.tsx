import {  Grid, Box,  Typography, TextField, CircularProgress, Button, Input } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../components/ui/Navbar'
import WordCard from '../components/ui/WordCard'
import useSWR from 'swr'
import { IWord } from '../interfaces'
import { Search } from '@mui/icons-material'
import { useRouter } from 'next/router'

const Index = () => {
  

  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter();
 

  const onSearchTerm = () => {
    if(searchTerm.trim().length === 0) return;
    console.log(searchTerm)
    router.push(`/search/${searchTerm}`)
  }

  return (
    <>
    <Navbar />
    <Grid container sx={{justifyContent: 'center', mb: 5, alignItems: 'center', display: 'flex'}}>
        <Box
          sx={{
            background: 'white',
            padding: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',

          }}
        >
            <Input
            sx={{
              color: '#010'
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Search a word"}
            value={searchTerm}
           />
            <Button 
            onClick={onSearchTerm}
            variant="contained" endIcon={<Search />}>
             Buscar
           </Button>
        </Box>        
    </Grid>
      <Box
        sx={{textAlign: 'center', mb: 4}}
      >
        {/* <Typography variant="h6">
          Featured words:
        </Typography> */}
      </Box>
          <Grid container 
            spacing={3}
            sx={{
              margin: '0 auto',
              textAlign: 'center',
              width: '90%',
              justifyContent: 'center', alignItems: 'center', display: 'flex'}}
          >
              {/* {
                data!.map((word: IWord) => {
                    return (
                      <Grid key={word._id} item xs={12} md={4}>
                          <WordCard 
                              _id={word._id!}
                              title={word.word}
                              meanings={word.meaning}
                          />
                      </Grid>
                    )
                })
              } */}
        </Grid>
    </>
  )
}

export default Index