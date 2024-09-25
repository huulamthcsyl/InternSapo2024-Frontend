import { useState } from "react"
import MainBox from "../../../components/layout/MainBox"
import OrderListAppBar from "./OrderListAppBar"
import { Box, Button, Paper, TableBody, TableContainer, Table, TableHead, TableRow, TableCell } from '@mui/material'

type Props = {}

export default function OrderListPage({}: Props) {

  const [orderData, setOrderData] = useState([]);

  return (
    <MainBox>
      <OrderListAppBar />
      <Box sx={{ backgroundColor: '#F0F1F1', padding: '25px 30px' }} flex={1} display='flex' flexDirection='column'>
        <Button sx={{ alignSelf: 'end' }} variant="contained">Tạo đơn hàng</Button>
        <Box>
          <Box>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã đơn hàng</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Số sản phẩm</TableCell>
                  <TableCell>Số tiền thanh toán</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </MainBox>
  )
}