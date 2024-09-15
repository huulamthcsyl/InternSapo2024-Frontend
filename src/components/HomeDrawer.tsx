import { Drawer } from "@mui/material"

type Props = {}

export default function HomeDrawer({ }: Props) {
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
        anchor="left">
      <div>HomeDrawer</div>
    </Drawer>
  )
}