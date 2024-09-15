import { Outlet } from "react-router-dom"
import HomeDrawer from "../components/drawer/HomeDrawer"
import AppBarWithHeader from "../components/appbar/AppBarWithHeader"
import { Box, Toolbar } from "@mui/material"

type Props = {}

export default function HomeLayout({}: Props) {
  return (
    <Box sx={{display: 'flex'}}>
      <HomeDrawer />
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default'}}>
        <AppBarWithHeader />
        <Box component="main">
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}