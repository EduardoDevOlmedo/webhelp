import {  Grid, Box,  Typography, TextField, CircularProgress, Button, Input } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../components/ui/Navbar'
import { Search } from '@mui/icons-material'
import { useRouter } from 'next/router'
import DataUsageIcon from '@mui/icons-material/DataUsage';

const Index = () => {
  

  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

              {
                isLoading && <DataUsageIcon className="loading" /> 
              }
        </Grid>
    </>
  )
}

export default Index