import { Drawer, Divider, Toolbar } from '@mui/material'

type Props = {}

export default function AdminDrawer({}: Props) {
  return (
    <Drawer sx={{
      width: 240,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
      },
    }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
    </Drawer>
  )
}