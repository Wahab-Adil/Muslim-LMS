import React, { useState } from "react";
// @mui
import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
// hooks
import useLocales from "../hook/useLocales";

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const { allLangs, currentLang, onChangeLang } = useLocales();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLang = (newLang) => {
    onChangeLang(newLang);
    handleClose();
  };

  console.log(allLangs);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <img
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          disabledEffect
          style={{ ml: 3, width: 40, heght: 30, cursor: "pointer" }}
          src={currentLang.icon}
          alt={currentLang.label}
        />
        <Typography sx={{ mt: 1 }}>{currentLang.label}</Typography>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={0.75}>
          {allLangs.map((option) => (
            <MenuItem
              sx={{ display: "flex", gap: 1, pr: 3, pl: 3 }}
              key={option.value}
              selected={option.value === currentLang.value}
              onClick={(e) => {
                handleChangeLang(option.value);
                handleClose();
              }}
            >
              <img
                disabledEffect
                alt={option.label}
                src={option.icon}
                style={{ width: 28, mr: 2, pr: 4 }}
              />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
}
