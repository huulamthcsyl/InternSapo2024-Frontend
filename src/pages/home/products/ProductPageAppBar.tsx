import { Typography, Box } from '@mui/material'
import MainAppBar from '../../../components/layout/MainAppBar'

type Props = {}

export default function ProductPageAppBar({}: Props) {
  return (
    <MainAppBar>
      <Box sx={{ display: 'flex'}}>
        <Typography sx={{fontSize:"26px"}}>Danh sách sản phẩm</Typography>
      </Box>
    </MainAppBar>
  )
}