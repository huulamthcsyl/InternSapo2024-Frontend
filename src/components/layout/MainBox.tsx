import React from 'react'
import { Box } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'

type Props = {
<<<<<<< HEAD
<<<<<<< HEAD
    children: React.ReactNode
}

export default function MainBox({ children }: Props) {
    return (
        <Box component="main" sx={{ backgroundColor: '#F0F1F1'}}>
            <Toolbar />
            {children}
        </Box>
    )
=======
=======
>>>>>>> 7235897a29a0ddcf6d2df765244383bc7fcf696a
  children: React.ReactNode
}

export default function MainBox({ children }: Props) {
  return (
    <Box component="main">
      <Toolbar />
      {children}
    </Box>
  )
<<<<<<< HEAD
>>>>>>> 7235897 (first commit)
=======
>>>>>>> 7235897a29a0ddcf6d2df765244383bc7fcf696a
}