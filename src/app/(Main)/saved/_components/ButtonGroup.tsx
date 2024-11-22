'use client'

import styled from '@emotion/styled';
import { Button,ButtonGroup } from '@mui/material'
import React from 'react'
const CustomButtonGroup = styled(ButtonGroup)({
    '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
      borderColor: 'transparent',
    },
  });
const ButtonGroupCustom = () => {
  return (
   <div>
     <CustomButtonGroup variant="contained" aria-label="Basic button group" className="mb-3 border-none">
      <Button className="custom-button">Posts</Button>
      <Button className="custom-button">Reels </Button>
      <Button className="custom-button">Collection</Button>
    </CustomButtonGroup>
   </div>
  )
}

export default ButtonGroupCustom