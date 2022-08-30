import { Typography } from '@mui/material'
import React from 'react'


interface Props {
    text: string;
}

const MeaningText: React.FC<Props> = ({text}) => {
  return (
 <Typography 
 sx={{
  textAlign: 'start'
 }}
 variant="body2">
    {text}
  </Typography>
  )
}

export default MeaningText