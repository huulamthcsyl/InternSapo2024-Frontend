import { ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
<<<<<<< HEAD
<<<<<<< HEAD
import { useNavigate } from "react-router-dom"

=======
import HomeIcon from '@mui/icons-material/Home';
>>>>>>> 7235897 (first commit)
=======
import HomeIcon from '@mui/icons-material/Home';
>>>>>>> 7235897a29a0ddcf6d2df765244383bc7fcf696a

type Props = {
  name: string,
  link: string,
<<<<<<< HEAD
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
=======
>>>>>>> 7235897a29a0ddcf6d2df765244383bc7fcf696a
}

export default function DrawerItem({ name }: Props) {
  return (
    <ListItem key={name} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
<<<<<<< HEAD
>>>>>>> 7235897 (first commit)
=======
>>>>>>> 7235897a29a0ddcf6d2df765244383bc7fcf696a
      </ListItemButton>
    </ListItem>
  )
}