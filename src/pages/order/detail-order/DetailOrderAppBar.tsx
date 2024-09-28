import { Box, Button } from "@mui/material"
import MainAppBar from "../../../components/layout/MainAppBar"
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from "react-router-dom";

type Props = {}

export default function DetailOrderAppBar({ }: Props) {

  const navigate = useNavigate();

  return (
    <MainAppBar>
      <Box display="flex" alignItems="center">
        <Button variant="text" sx={{ color: '#637381' }} onClick={() => navigate(-1)}><KeyboardArrowLeft /> Quay lại danh sách đơn hàng</Button>
      </Box>
    </MainAppBar>
  )
}