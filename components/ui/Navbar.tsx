/* eslint-disable @next/next/no-img-element */
import { AppBar, Typography, Link } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <AppBar
        sx={{
            mb: 5,
            height:110,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            background: '#f1f1f1',
            position: 'static',
            padding: '10px'
        }}
    >
        <NextLink passHref href="/">
            <Link
               
            >
        <img
            alt="logo"
            width={100}
            height={100}
            src={'/assets/logo-webhelp-LS.jpeg'}
        />
            </Link>
        </NextLink>
        <NextLink passHref href="/add">
            <Link
                sx={{color: '#000'}}
            >
        <Typography
            sx={{fontSize: '22px'}}
        >Add a word</Typography>   
            </Link>
        </NextLink>
    </AppBar>
 )
}

export default Navbar