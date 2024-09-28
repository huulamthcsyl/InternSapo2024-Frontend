import { Typography, Box } from '@mui/material'
import MainAppBar from '../../components/layout/MainAppBar'


type Props = {}

export default function NewCustomerPageAppBar({}: Props) {
    return (
        <MainAppBar>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h6" sx={{ color: 'black',fontWeight: '700'   }}>Thêm mới khách hàng</Typography>
            </Box>
        </MainAppBar>
    )
}