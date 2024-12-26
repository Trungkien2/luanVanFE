'use client'

import styled from '@emotion/styled';
import { Button, ButtonGroup } from '@mui/material'
import React from 'react'

interface ButtonGroupCustomProps {
  onSelect: (value: string) => void;
}

const CustomButtonGroup = styled(ButtonGroup)({
  '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
    borderColor: 'transparent',
  },
});

const ButtonGroupCustom: React.FC<ButtonGroupCustomProps> = ({ onSelect }) => {
  const handleButtonClick = (value: string) => {
    onSelect(value);
  };

  return (
    <div>
      <CustomButtonGroup variant="contained" aria-label="Basic button group" className="mb-3 border-none">
        <Button onClick={() => handleButtonClick("for_you")} className="custom-button">For you</Button>
        <Button onClick={() => handleButtonClick("following")} className="custom-button">Following</Button>
      </CustomButtonGroup>
    </div>
  )
}

export default ButtonGroupCustom