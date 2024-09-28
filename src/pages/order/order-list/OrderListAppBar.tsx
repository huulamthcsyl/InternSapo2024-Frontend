import { Typography, Box, Select, MenuItem } from '@mui/material'
import MainAppBar from '../../../components/layout/MainAppBar'

type Props = {}

export default function OrderListAppBar({ }: Props) {
  return (
    <MainAppBar>
      <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: '#000', fontWeight: '600' }}>Danh sách đơn hàng</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#000', fontWeight: '600' }}>Nguyễn Hữu Lâm</Typography>
          <Select sx={{ '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none' } }}>
            <MenuItem>Quản lý tài khoản</MenuItem>
            <MenuItem>Đăng xuất</MenuItem>
          </Select>
        </Box>
      </Box>
    </MainAppBar>
  )
}