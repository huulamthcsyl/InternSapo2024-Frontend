import { Box, Button, Typography } from "@mui/material"
import MainAppBar from "../../../components/layout/MainAppBar"
import { useNavigate } from "react-router-dom"

type Props = {
  handleCreateOrder: () => void
}

export default function CreateOrderAppBar({ handleCreateOrder }: Props) {

  const navigate = useNavigate();

  return (
    <MainAppBar>
      <Box display="flex" flexGrow={1} justifyContent="space-between" alignItems="center">
        <Typography variant="body1" sx={{ color: '#747C87', fontWeight: '600' }}>Tạo đơn hàng</Typography>
        <Box>
          <Button sx={{ marginRight: '25px' }} variant="outlined" onClick={() => navigate('/order')}>Thoát</Button>
          <Button onClick={handleCreateOrder} variant="contained">Tạo đơn hàng</Button>
        </Box>
      </Box>
    </MainAppBar>
  )
}