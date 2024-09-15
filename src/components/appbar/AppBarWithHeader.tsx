import { Toolbar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'

type Props = {}

export default function AppBarWithHeader({}: Props) {
  return (
    <AppBar sx={{ width: 'calc(100% - 240px)' }} position="fixed">
      <Toolbar>
        <Typography>App Bar with Header</Typography>
      </Toolbar>
    </AppBar>
  )
}