import {  Grid, Box,  Typography, TextField, CircularProgress, Button, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/ui/Navbar'
import { Search } from '@mui/icons-material'
import { useRouter } from 'next/router'
import DataUsageIcon from '@mui/icons-material/DataUsage';
import useSWR  from 'swr'
import { IWord } from '../interfaces'
import WordCard from '../components/ui/WordCard'



const Index = () => {
  

  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [wordLength, setWordLength] = useState(4)
  const [words, setWords] = useState<IWord[]>()


  const {data, isLoading: wordsLoading} = useSWR<IWord[]>("/api/words?size=" + wordLength);

  useEffect(() => {
    setWords(data!)
  }, [data, wordLength])


  const router = useRouter();
 

  const onSearchTerm = () => {
    if(searchTerm.trim().length === 0) return;
    setIsLoading(true);
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
        <Typography variant="h6">
          Featured words:
        </Typography>
      </Box>
          <Grid container 
            spacing={3}
            sx={{
              padding: '0 0 20px 0',
              margin: '0 auto',
              textAlign: 'center',
              width: '90%',
              justifyContent: 'center', alignItems: 'center', display: 'flex'}}
          >
              {
                isLoading || wordsLoading && <DataUsageIcon className="loading" />  
              }

              {
                  words?.slice(0, wordLength).map(word => {
                    return (
                    <Grid 
                    xs={12} md={8} lg={3}
                    key={word._id} item>
                      <WordCard key={word._id} _id={word._id} title={word.word} meanings={word.meaning} />
                    </Grid>
                    )
                  })
              }
        </Grid>
        <Box sx={{display: 'flex', justifyContent: 'center', padding: '10px'}}>
              <Button onClick={() => setWordLength(wordLength + 4)}>Load More</Button>
              {
                words?.length! >= 8 && <Button onClick={() => setWordLength(wordLength - 4)}>Load Less</Button>
              }
        </Box>
    </>
  )
}

export default Index