import { ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
<<<<<<< HEAD
import { useNavigate } from "react-router-dom"

=======
import HomeIcon from '@mui/icons-material/Home';
>>>>>>> 7235897 (first commit)

type Props = {
  name: string,
  link: string,
<<<<<<< HEAD
  icon: any
}

export default function DrawerItem({ name, link, icon }: Props) {

  const navigate = useNavigate();

  return (
    <ListItem key={name} disablePadding>
      <ListItemButton onClick={() => navigate(link)}>
        <ListItemIcon sx={{ color: "#fff" }}>
          {icon}
        </ListItemIcon>
        <ListItemText sx={{ color: '#fff' }} primary={name} />
=======
}

export default function DrawerItem({ name }: Props) {
  return (
    <ListItem key={name} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
>>>>>>> 7235897 (first commit)
      </ListItemButton>
    </ListItem>
  )
}