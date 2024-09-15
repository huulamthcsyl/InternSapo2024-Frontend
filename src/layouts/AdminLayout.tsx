import { Outlet } from "react-router-dom"
import AppBarWithHeader from "../components/appbar/AppBarWithHeader"
import { Box, Toolbar } from "@mui/material"
import AdminDrawer from "../components/drawer/AdminDrawer"

type Props = {}

export default function AdminLayout({ }: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDrawer />
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <AppBarWithHeader />
        <Box component="main">
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}