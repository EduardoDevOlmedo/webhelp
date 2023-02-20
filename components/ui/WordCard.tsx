import { Delete, Edit } from '@mui/icons-material'
import { CardContent, Typography, CardActions, Button, Card } from '@mui/material'
import React, { useState } from 'react'
import MeaningText from './MeaningText'


interface Props {
  _id?: string;
  title: string;
  meanings: string[]
}

const WordCard: React.FC<Props> = ({_id, title, meanings}) => {


  return (
    <Card
      sx={{
        height: '200px',
        display: 'grid'
      }}
    >
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {
        meanings.map((text, index) => {
          index+=1
          return (
              <MeaningText key={index} text={`${index}. ${text}`}/>            
          )
        })
      }
    </CardContent>
    <CardActions>
    <Button href={`/edit/${_id}`} variant="contained" endIcon={<Edit />}>
      Edit
    </Button>
    </CardActions>
    </Card>
 )
}

export default WordCard