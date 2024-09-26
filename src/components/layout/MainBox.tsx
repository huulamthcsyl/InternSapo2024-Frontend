import React from 'react'
import { Box } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'

type Props = {
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
  children: React.ReactNode
}

export default function MainBox({ children }: Props) {
  return (
    <Box component="main">
      <Toolbar />
      {children}
    </Box>
  )
>>>>>>> 7235897 (first commit)
}