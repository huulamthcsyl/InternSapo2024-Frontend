import { Typography, Box } from '@mui/material'
import MainAppBar from '../../components/layout/MainAppBar'


type Props = {}

export default function CustomerPageAppBar({}: Props) {
  return (
    <MainAppBar >
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h6"  sx={{
            color: '#000', // Màu chữ
            fontFamily: '"Segoe UI", sans-serif', // Phông chữ
            fontSize: '26px', // Kích thước chữ
            fontStyle: 'normal', // Kiểu chữ
            fontWeight: 600, // Độ đậm của chữ
            lineHeight: 'normal', // Chiều cao dòng
        }}  >Khách hàng</Typography>
      </Box>
    </MainAppBar>
  )
}