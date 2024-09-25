import { Box, Button, Typography } from "@mui/material"
import MainAppBar from "../../../components/layout/MainAppBar"

type Props = {
  handleCreateOrder: () => void
}

export default function CreateOrderAppBar({ handleCreateOrder }: Props) {
  return (
    <MainAppBar>
      <Box display="flex" flexGrow={1} justifyContent="space-between" alignItems="center">
        <Typography variant="body1" sx={{ color: '#747C87', fontWeight: '600' }}>Tạo đơn hàng</Typography>
        <Box>
          <Button sx={{ marginRight: '25px' }} variant="outlined">Thoát</Button>
          <Button onClick={handleCreateOrder} variant="contained">Tạo đơn hàng</Button>
        </Box>
      </Box>
    </MainAppBar>
  )
}