import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"
import AdminDrawer from "../components/drawer/AdminDrawer"

type Props = {}

export default function AdminLayout({ }: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDrawer />
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  )
}