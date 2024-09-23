import React, { useState } from "react";
import { Chip, InputBase, Paper } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { pink } from "@mui/material/colors";

type Props = {};

export default function TextFieldd({}: Props) {
  const [inputValue, setInputValue] = useState('');
  const [badges, setBadges] = useState<string[]>([]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle Enter key press to create a badge
  const handleKeyPress = (e) => {
    const trimmedValue = inputValue.trim();
    if (e.key === 'Enter' && trimmedValue) {
      
      // Check if the input value is already a badge
      if (!badges.includes(trimmedValue)) {
        setBadges((prevBadges) => [...prevBadges, trimmedValue]);
      }

      setInputValue(''); // Clear input field
      e.preventDefault(); 
    }
  };

  // Remove badge handler
  const handleDeleteBadge = (badgeToDelete) => {
    setBadges((prevBadges) => prevBadges.filter((badge) => badge !== badgeToDelete));
  };

  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '2px 8px',
        flexWrap: 'wrap',
        width: 400,
        border: '1px solid #ccc',
      }}
      onSubmit={(e) => e.preventDefault()} 
    >
      {/* Rendering the badges (Chips) inside the input */}
      {badges.map((badge, index) => (
        <Chip
          sx={{margin: '2px', padding:'0 4px'}}
          key={index}
          label={badge}
          onDelete={() => handleDeleteBadge(badge)}
          deleteIcon={<Clear/>}
        />
      ))}

      {/* InputBase for free-form text entry next to the badges */}
      <InputBase
        sx={{ flex: 1 }}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Gõ ký tự và nhấn Enter để thêm giá trị"
        inputProps={{ 'aria-label': 'input-with-badges' }}
      />
    </Paper>
  );
}