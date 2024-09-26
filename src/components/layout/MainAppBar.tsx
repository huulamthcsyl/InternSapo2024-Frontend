import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

type Props = {
    children: React.ReactNode | null | undefined
}

export default function MainAppBar({ children }: Props) {
  return (
<<<<<<< HEAD
    <AppBar sx={{ width: 'calc(100% - 240px)', backgroundColor: '#fff' }} position="fixed">
=======
    <AppBar sx={{ width: 'calc(100% - 240px)' }} position="fixed">
>>>>>>> 7235897 (first commit)
      <Toolbar>
        {children}
      </Toolbar>
    </AppBar>
  )
}