import { Typography, Box } from '@mui/material'
import MainAppBar from '../../../../components/layout/MainAppBar'
import NavigateBefore from '@mui/icons-material/NavigateBefore'

type Props = {}

export default function BrandPageAppBar({}: Props) {
  return (
    <MainAppBar>
      <Box sx={{ display: 'flex', gap:'20px'}}>
        <NavigateBefore color='disabled' sx={{width:'30px',height:'30px'}}/>
        <Typography color="textDisabled">Quay lại danh sách sản phẩm</Typography>
      </Box>
    </MainAppBar>
  )
}