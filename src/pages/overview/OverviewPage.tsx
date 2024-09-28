import { Box, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import MainBox from "../../components/layout/MainBox"
import MainAppBar from "../../components/layout/MainAppBar.tsx";
import { useEffect, useState } from "react";

type Props = {}

export default function OverviewPage({ }: Props) {
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const fetchTodayOrders = () => {
    fetch(`http://localhost:8000/v1/order/today?pageNum=${pageNum}&pageSize=${pageSize}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Có lỗi xảy ra khi gọi API');
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data.orders.content);
        setTotalOrders(data.orders.totalElements);
        setTotalRevenue(data.totalRevenue);
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
      });
  };

  useEffect(() => {
    fetchTodayOrders();
  }, [pageNum, pageSize]);
  const handleChangePage = (_event : React.MouseEvent<HTMLButtonElement> | null, newPage : number) => {
    setPageNum(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10)); // Cập nhật số hàng trên mỗi trang
    setPageNum(0); // Reset về trang đầu khi thay đổi số hàng
  };
  return (
    <Box>
      <MainAppBar>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h6" sx={{
            color: '#000', // Màu chữ
            fontFamily: '"Segoe UI", sans-serif', // Phông chữ
            fontSize: '26px', // Kích thước chữ
            fontStyle: 'normal', // Kiểu chữ
            fontWeight: 600, // Độ đậm của chữ
            lineHeight: 'normal', // Chiều cao dòng
          }}  >Tổng quan</Typography>
        </Box>
      </MainAppBar>
      <MainBox>
        <Box>
          <Box sx={{ display: 'flex', padding: '20px 30px' }}>
            <Box sx={{
              display: 'flex', flexBasis: '40%', marginRight: '20px', backgroundColor: 'white', borderRadius: '5px',  // Bo góc
              background: '#FFF',   // Màu nền trắng
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            }}>
              <Box sx={{ flexBasis: '30%' }}>
                <Box sx={{ padding: '30px' }}>
                  <img src={`public/profit-up.jpg`} alt="Description" style={{ width: '100%' }} />
                </Box>

              </Box>
              <Box sx={{ flexBasis: '70%', display: 'flex', flexDirection: 'column', padding: '30px' }}>
                <Typography variant="h5" component="div" sx={{
                  height: '50%', color: '#000', // Màu chữ
                  fontFamily: '"Segoe UI", sans-serif', // Phông chữ
                  fontSize: '26px', // Kích thước chữ
                  fontStyle: 'normal', // Kiểu chữ
                  fontWeight: 600, // Độ đậm của chữ
                  lineHeight: 'normal'
                }} // Chiều cao dòng
                >
                  Doanh thu hôm nay
                </Typography>
                <Typography variant="h6" component="div" sx={{ height: '50%' }}>
                  ${totalRevenue}
                </Typography>
              </Box>
            </Box>
            <Box sx={{
              display: 'flex', flexBasis: '40%', backgroundColor: 'white', borderRadius: '5px',  // Bo góc
              background: '#FFF',   // Màu nền trắng
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            }}>
              <Box sx={{ flexBasis: '30%' }}>
                <Box sx={{ padding: '30px' }}>
                  <img src={`public/shopping-bag.jpg`} alt="Description" style={{ width: '100%' }} />
                </Box>

              </Box>
              <Box sx={{ flexBasis: '70%', display: 'flex', flexDirection: 'column', padding: '30px' }}>
                <Typography variant="h5" component="div" sx={{
                  height: '50%', color: '#000', // Màu chữ
                  fontFamily: '"Segoe UI", sans-serif', // Phông chữ
                  fontSize: '26px', // Kích thước chữ
                  fontStyle: 'normal', // Kiểu chữ
                  fontWeight: 600, // Độ đậm của chữ
                  lineHeight: 'normal',
                  justifyContent: 'space-between'
                }} // Chiều cao dòng
                >
                  Đơn hàng hôm nay
                </Typography>
                <Typography variant="h6" component="div" sx={{ height: '50%' }}>
                  ${totalOrders}
                </Typography>
              </Box>
            </Box>

          </Box>
          <Box sx={{ padding: '20px 30px' }}>
            <Box >
              <Typography variant="h6" sx={{
                color: '#000', // Màu chữ
                fontFamily: '"Segoe UI", sans-serif', // Phông chữ
                fontSize: '26px', // Kích thước chữ
                fontStyle: 'normal', // Kiểu chữ
                fontWeight: 600, // Độ đậm của chữ
                lineHeight: 'normal', // Chiều cao dòng
                paddingBottom: '30px'
              }}  >Đơn hàng mới</Typography>

            </Box>
            <Box>
              <Table sx={{ minWidth: 650, border: '1px solid #ccc' }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#e0f7fa' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Mã đơn hàng</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Tên khách hàng</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Ngày tạo đơn</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Số lượng sản phẩm</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Số tiền thanh toán</TableCell>
                    {/*<TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Nhân viên xử lý đơn</TableCell>*/}
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {totalOrders > 0 ? (
                    orders.map((order: any) => (
                      <TableRow
                        key={order.id}
                        sx={{
                          '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                          '&:hover': { backgroundColor: '#e0f7fa' }, // Hover effect
                        }}
                      >
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.customer.name}</TableCell>
                        <TableCell>{order.createdOn}</TableCell>
                        <TableCell>{order.totalQuantity}</TableCell>
                        <TableCell>{order.totalPayment}</TableCell>
                        <TableCell>
                          <Typography
                            // onClick={() => handleDetailsClick(customer.id)} // Chuyển hướng khi nhấn vào
                            sx={{
                              color: 'blue',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              '&:hover': {
                                color: 'darkblue', // Đổi màu khi hover
                              },
                            }}
                          >
                            Chi tiết
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>Không có đơn hàng nào</TableCell>
                    </TableRow>
                  )}
                </TableBody>

              </Table>

              <TablePagination
                component="div"
                count={totalOrders} // Tổng số lượng đơn hàng
                page={pageNum}
                onPageChange={handleChangePage}
                rowsPerPage={pageSize}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10]} // Các tùy chọn số hàng
                sx={{ mt: 2 }} // Margin top
              />
            </Box>
          </Box>
        </Box>
      </MainBox>
    </Box>
  )
}