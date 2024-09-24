import { Collapse, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import DrawerItem from "./DrawerItem"
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';

type Props = {}

export default function HomeDrawer({ }: Props) {

  const [openOrder, setOpenOrder] = useState(false);

  return (
    <Drawer sx={{
      width: 240,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
      },
    }}
      PaperProps={{
        sx: {
          backgroundColor: 'purple',
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
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
            <ListItemButton sx={{ pl: 4, color: '#fff' }}>
              <ListItemText primary="Tạo đơn hàng" />
            </ListItemButton>
          </List>
          <List disablePadding>
            <ListItemButton sx={{ pl: 4, color: '#fff' }}>
              <ListItemText primary="Danh sách đơn hàng" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <DrawerItem name="Sản phẩm" icon={<InventoryIcon style={{ color: '#fff' }} />} link="/"/>
      <DrawerItem name="Khách hàng" icon={<PersonIcon style={{ color: '#fff' }} />} link="/"/>
    </Drawer>
  )
}