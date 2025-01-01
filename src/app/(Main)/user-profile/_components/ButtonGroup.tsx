"use client";

import styled from "@emotion/styled";
import { Button, ButtonGroup } from "@mui/material";
import React from "react";

interface IProps {
  onSelect: (value: string) => void;
}

const CustomButtonGroup = styled(ButtonGroup)({
  "& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton": {
    borderColor: "transparent",
  },
});

const ButtonGroupCustom: React.FC<IProps> = ({ onSelect }) => {
  return (
    <div>
      <CustomButtonGroup
        variant="contained"
        aria-label="Basic button group"
        className="mb-3 border-none"
      >
        <Button className="custom-button" onClick={() => onSelect("Posts")}>
          Posts
        </Button>
        <Button className="custom-button" onClick={() => onSelect("Reels")}>
          Reels
        </Button>
        {/* <Button className="custom-button">Tagged</Button> */}
      </CustomButtonGroup>
    </div>
  );
};

export default ButtonGroupCustom;
