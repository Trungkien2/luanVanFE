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
      <Button className="custom-button">For you</Button>
      <Button className="custom-button">Follwing </Button>
      <Button className="custom-button">Popular</Button>
      <Button className="custom-button">Featured</Button>
      
    </CustomButtonGroup>
   </div>
  )
}

export default ButtonGroupCustom