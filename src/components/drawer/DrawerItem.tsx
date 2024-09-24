import { ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"


type Props = {
  name: string,
  link: string,
  icon: any
}

export default function DrawerItem({ name, icon }: Props) {
  return (
    <ListItem key={name} disablePadding>
      <ListItemButton>
        <ListItemIcon sx={{ color: "#fff" }}>
          {icon}
        </ListItemIcon>
        <ListItemText sx={{ color: '#fff' }} primary={name} />
      </ListItemButton>
    </ListItem>
  )
}