import { Divider, Drawer, List, Toolbar } from "@mui/material"
import DrawerItem from "./DrawerItem"

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
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        <DrawerItem name="Tổng quan" link="/" />
      </List>
    </Drawer>
  )
}