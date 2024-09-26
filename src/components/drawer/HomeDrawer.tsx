<<<<<<< HEAD
<<<<<<< HEAD
import { Collapse, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import DrawerItem from "./DrawerItem"
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
=======
import { Divider, Drawer, List, Toolbar } from "@mui/material"
import DrawerItem from "./DrawerItem"
>>>>>>> 7235897 (first commit)
=======
import { Divider, Drawer, List, Toolbar } from "@mui/material"
import DrawerItem from "./DrawerItem"
>>>>>>> 7235897a29a0ddcf6d2df765244383bc7fcf696a

type Props = {}

export default function HomeDrawer({ }: Props) {
<<<<<<< HEAD
<<<<<<< HEAD

  const [openOrder, setOpenOrder] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);

  const navigate = useNavigate();

=======
>>>>>>> 7235897 (first commit)
=======
>>>>>>> 7235897a29a0ddcf6d2df765244383bc7fcf696a
  return (
    <Drawer sx={{
      width: 240,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
      },
    }}
<<<<<<< HEAD
<<<<<<< HEAD
      PaperProps={{
        sx: {
          backgroundColor: '#182537',
        }
      }}
=======
>>>>>>> 7235897 (first commit)
=======
>>>>>>> 7235897a29a0ddcf6d2df765244383bc7fcf696a
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
<<<<<<< HEAD
<<<<<<< HEAD
      <List sx={{ p: 0 }}>
        <DrawerItem name="Tổng quan" icon={<HomeIcon />} link="/" />
        <ListItemButton onClick={() => setOpenOrder(!openOrder)}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <ReceiptLongIcon />
          </ListItemIcon>
          <ListItemText sx={{ color: "#fff" }} primary="Đơn hàng" />
          {openOrder ? <ExpandLess style={{ color: '#fff' }}/> : <ExpandMore style={{ color: '#fff' }}/>}
        </ListItemButton>
        <Collapse in={openOrder} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton sx={{ pl: 4, color: '#fff' }} onClick={() => navigate('/order/create')}>
              <ListItemText primary="Tạo đơn hàng" />
            </ListItemButton>
          </List>
          <List disablePadding>
            <ListItemButton sx={{ pl: 4, color: '#fff' }}>
              <ListItemText primary="Danh sách đơn hàng" onClick={() => navigate('/order')}/>
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => setOpenProduct(!openProduct)}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText sx={{ color: "#fff" }} primary="Sản phẩm" />
          {openProduct ? <ExpandLess style={{ color: '#fff' }}/> : <ExpandMore style={{ color: '#fff' }}/>}
        </ListItemButton>
        <Collapse in={openProduct} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton sx={{ pl: 4, color: '#fff' }}>
              <ListItemText primary="Danh sách sản phẩm" />
            </ListItemButton>
          </List>
          <List disablePadding>
            <ListItemButton sx={{ pl: 4, color: '#fff' }}>
              <ListItemText primary="Quản lý kho" />
            </ListItemButton>
          </List>
        </Collapse>
        <DrawerItem name="Khách hàng" icon={<PersonIcon style={{ color: '#fff' }} />} link="/"/>
=======
      <List>
        <DrawerItem name="Tổng quan" link="/" />
>>>>>>> 7235897 (first commit)
=======
      <List>
        <DrawerItem name="Tổng quan" link="/" />
>>>>>>> 7235897a29a0ddcf6d2df765244383bc7fcf696a
      </List>
    </Drawer>
  )
}