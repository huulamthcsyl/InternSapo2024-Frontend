import { Outlet } from "react-router-dom"
import HomeDrawer from "../components/drawer/HomeDrawer"
import { Box } from "@mui/material"

type Props = {}

export default function HomeLayout({}: Props) {
  return (
    <Box sx={{display: 'flex'}}>
      <HomeDrawer />
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  )
}