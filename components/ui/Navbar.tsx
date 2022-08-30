import { AppBar, Typography, Link } from '@mui/material';
import NextLink from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <AppBar
        sx={{
            mb: 5,
            height:60,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            position: 'static',
            padding: '10px'
        }}
    >
        <NextLink passHref href="/">
            <Link
                sx={{color: '#fff'}}
            >
        <Typography>WebHelp Glossary</Typography>   
            </Link>
        </NextLink>
        <NextLink passHref href="/add">
            <Link
                sx={{color: '#fff'}}
            >
        <Typography>Add a word</Typography>   
            </Link>
        </NextLink>
    </AppBar>
 )
}

export default Navbar