import React from 'react'
import { Box } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'

type Props = {
  children: React.ReactNode
}

export default function MainBox({ children }: Props) {
  return (
    <Box component="main" >
      <Toolbar />
      {children}
    </Box>
  )
}