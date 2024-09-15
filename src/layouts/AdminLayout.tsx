import { Outlet } from "react-router-dom"
import HomeDrawer from "../components/HomeDrawer"
import AppBarWithHeader from "../components/AppBarWithHeader"
import { Box } from "@mui/material"

type Props = {}

export default function AdminLayout({}: Props) {
  return (
    <Box sx={{display: 'flex'}}>
      <HomeDrawer />
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default'}}>
        <AppBarWithHeader />
        <Outlet />
      </Box>
    </Box>
  )
}