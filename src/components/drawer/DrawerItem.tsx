import { ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';

type Props = {
  name: string,
  link: string,
}

export default function DrawerItem({ name, link }: Props) {
  return (
    <ListItem key={name} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  )
}