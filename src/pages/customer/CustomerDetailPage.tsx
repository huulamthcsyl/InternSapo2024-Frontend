import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from "@mui/material"

import MainBox from "../../components/layout/MainBox"

import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Alert} from "@mui/lab";
import MainAppBar from "../../components/layout/MainAppBar.tsx";

// type Customer = {
//     id: number;
//     code: string;
//     name: string;
//     phoneNumber: string;
//     email: string;
//     address: string;
//     birthday: string;
//     gender: boolean;
//     createdOn: string;
//     updatedOn: string;
//     totalExpense: number;
//     numberOfOrder: number;
//     note: string;
// };


export default function CustomerDetailPage({}: Props) {
    const navigate = useNavigate();
    const { customerId } = useParams<{ customerId: string }>();
    const [customer, setCustomer] = useState();
    const [customer1, setCustomer1] = useState();
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState(""); // State để lưu thông báo lỗi

    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");  // Thông báo thành công
    const [openDeleteModal, setOpenDeleteModal] = useState(false); // Modal xác nhận xóa
    // Khai báo ref cho giá trị tạm thời
    const tempCustomerRef = useRef({ ...customer });



    function formatDate(dateString) {
        // Tạo một đối tượng Date từ chuỗi ngày tháng
        const date = new Date(dateString);

        // Lấy ngày, tháng và năm
        const day = String(date.getDate()).padStart(2, '0'); // Ngày
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng (tháng bắt đầu từ 0)
        const year = date.getFullYear(); // Năm

        // Trả về định dạng "dd-mm-yyyy"
        return `${day}-${month}-${year}`;
    }

    const fetchCustomerById = (customerId) => {
        fetch(`http://localhost:8000/customers/${customerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  // Đặt loại nội dung nếu cần thiết
            }
        })
            .then(response => {
                if (response.status === 404) {
                    throw new Error(`Không tìm thấy khách hàng với ID: ${customerId}`);
                } else if (!response.ok) {
                    throw new Error('Error: ' + response.statusText);
                }

                return response.json();  // Chuyển đổi phản hồi thành JSON
            })
            .then(data => {
                setCustomer(data);  // Cập nhật thông tin khách hàng
                tempCustomerRef.current = { ...data };
                setErrorMessage("");  // Xóa thông báo lỗi nếu có dữ liệu thành công
            })
            .catch(error => {
                // if (error.message.includes('Không tìm thấy khách hàng')) {
                //     setCustomer(null);  // Đặt giá trị khách hàng thành null nếu không tìm thấy
                //     setErrorMessage(error.message);  // Đặt thông báo lỗi
                // } else {
                //     console.error('Lỗi khi lấy thông tin khách hàng:', error);
                // }

                setCustomer(null);  // Đặt giá trị khách hàng thành null nếu không tìm thấy
                setErrorMessage(error.message);  // Đặt thông báo lỗi
            });
    };


    useEffect(() => {
        if (customerId) {
            fetchCustomerById(customerId);

        }
    }, [customerId,customer1]);


    const handleBackToCustomers = () => {
        navigate("/customers"); // Điều hướng về trang danh sách khách hàng
    };
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const updateCustomer = (customerId) => {
        fetch(`http://localhost:8000/customers/update/${customerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer), // Gửi ghi chú trong body
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 409) {
                        // Trả về thông báo riêng cho lỗi 409 Conflict
                        throw new Error('Số điện thoại đã tồn tại');
                    } else {
                        // Trả về các lỗi khác dựa trên response.statusText
                        throw new Error(response.statusText || 'Có lỗi xảy ra khi cập nhật khách hàng');
                    }
                }
                return response.json(); // Chuyển đổi phản hồi thành JSON nếu thành công
            })
            .then(data => {
                setCustomer1(data);

                setSuccessMessage('Khách hàng đã được cập nhật thành công!');  // Set thông báo thành công
                setErrorMessage("");  // Xóa thông báo lỗi
                setOpenModal(false);  // Đóng modal
            })
            .catch(error => {
                setErrorMessage( error.message);  // Set thông báo lỗi
                setSuccessMessage("");  // Xóa thông báo thành công
            });
    };


    const handleChangePage = (event, newPage) => {
        setPageNum(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setPageSize(parseInt(event.target.value, 10)); // Cập nhật số hàng trên mỗi trang
        setPageNum(0); // Reset về trang đầu khi thay đổi số hàng
    };

    const handleCloseModal = () => {
        setCustomer(tempCustomerRef.current);
        setOpenModal(false);  // Đóng modal


    };
    const handleChangeCustomer = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
    };


    const handleUpdateCustomerClick = () => {

        setOpenModal(true);  // Mở modal
    };

    const handleDeleteCustomer = (customerId) => {
        fetch(`http://localhost:8000/customers/delete/${customerId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setOpenDeleteModal(false); // Đóng modal sau khi xóa

                console.log('Khách hàng đã được xóa:', data);
                // Thực hiện cập nhật giao diện hoặc thông báo thành công
            })
            .catch(error => {
                setOpenDeleteModal(false);
                console.error('Lỗi khi xóa khách hàng:', error);
                // Xử lý lỗi nếu xảy ra
            });

    };

    useEffect(() => {
        const timeout = setTimeout(() => {

            setErrorMessage('');
            setSuccessMessage('');
        }, 3000); // Thời gian hiển thị 3 giây

        return () => clearTimeout(timeout); // Dọn dẹp timeout khi component unmount hoặc cập nhật
    }, [ errorMessage, successMessage]);

    return (
        <Box>
            <MainAppBar >
                <Box  sx={{ width: '100%' }}  display="flex"  justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ color: '#637381',

                        /* body-text */
                        fontFamily: 'Segoe UI',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: 'normal',
                        cursor: 'pointer'}} onClick={handleBackToCustomers}
                        >&lt; Quay lại danh sách khách hàng
                    </Typography>
                    <Button
                        sx={{
                            borderRadius: '5px',
                            border: '1px solid var(--danger-color, #FF4D4D)', // Màu viền đỏ
                            color: '#FF4D4D', // Màu chữ đỏ khi không hover
                            background: 'none', // Nền trong suốt
                            padding: '8px 16px',
                            '&:hover': {
                                background: '#FF4D4D', // Màu nền đỏ khi hover
                                color: 'white', // Đổi màu chữ thành trắng khi hover
                            }
                        }}
                        onClick={() => setOpenDeleteModal(true)}
                    >
                        Xoá khách hàng
                    </Button>



                </Box>
            </MainAppBar>
            <MainBox>
                <Box>
                    {/* Hiển thị thông báo lỗi nếu có */}
                    {errorMessage && (
                        <Alert severity="error" sx={{ marginTop: '16px' }}>
                            {errorMessage}
                        </Alert>
                    )}

                    {/* Hiển thị thông báo thành công nếu có */}
                    {successMessage && (
                        <Alert severity="success" sx={{ marginTop: '16px' }}>
                            {successMessage}
                        </Alert>
                    )}
                    {/*<Snackbar*/}
                    {/*    open={!!successMessage}  // Hiển thị nếu có thông báo thành công*/}
                    {/*    autoHideDuration={6000}  // 6 giây sau tự ẩn*/}
                    {/*    onClose={() => setSuccessMessage("")}  // Đóng Snackbar*/}
                    {/*    message={successMessage}*/}
                    {/*/>*/}

                    {/*<Snackbar*/}
                    {/*    open={!!errorMessage}  // Hiển thị nếu có lỗi*/}
                    {/*    autoHideDuration={6000}*/}
                    {/*    onClose={() => setErrorMessage("")}*/}
                    {/*    message={errorMessage}*/}
                    {/*/>*/}
                    <Box sx={{ padding: '16px 24px 16px 24px' }}>
                        <Typography variant="h6" sx={{
                            color: '#000',
                            fontFamily: 'Segoe UI',
                            fontSize: '20px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: 'normal',
                        }} >
                            {tempCustomerRef.current?.gender ? 'Anh ' : 'Chị '}
                            {tempCustomerRef.current?.name}
                        </Typography>
                    </Box>
                    <Box display="flex">
                        <Box sx={{ flexBasis: '70%' }}>
                            <Box sx={{backgroundColor: 'white', margin: '16px 24px'}}>
                                <Box sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottom: '1px solid var(--sub-color, #D9D9D9)'  // Thêm border-bottom
                                }}>
                                    <Box sx={{ padding: '16px' }}>
                                        <Typography variant="h6" sx={{  fontWeight: 600, fontSize: '20px', color: 'black'  }} >
                                            Thông tin cá nhân
                                        </Typography>
                                    </Box>

                                    <Box sx={{ padding: '16px' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '20px', cursor: 'pointer', color: 'var(--primary-color, #08F)'  }} onClick={handleUpdateCustomerClick}>
                                            Cập nhật
                                        </Typography>
                                    </Box>



                                </Box>
                                <Box>
                                    <Grid container >
                                        {/* Cột đầu tiên */}
                                        <Grid item xs={6} display="flex" alignItems="center" sx={{ padding: '16px' }} >
                                            <Typography variant="subtitle1" sx={{ flex: 1 }}>Mã khách hàng</Typography>
                                            <Typography variant="body1" sx={{ flex: 1 }}>:{tempCustomerRef.current?.id}</Typography> {/* Giá trị trường */}
                                        </Grid>

                                        <Grid item xs={6} display="flex" alignItems="center" sx={{ padding: '16px' }}>
                                            <Typography variant="subtitle1" sx={{ flex: 1 }}>Địa chỉ</Typography>
                                            <Typography variant="body1" sx={{ flex: 1 }}>:{tempCustomerRef.current?.address}</Typography> {/* Giá trị trường */}
                                        </Grid>

                                        <Grid item xs={6} display="flex" alignItems="center" sx={{ padding: '16px' }}>
                                            <Typography variant="subtitle1" sx={{ flex: 1 }}>Số điện thoại</Typography>
                                            <Typography variant="body1" sx={{ flex: 1 }}>:{tempCustomerRef.current?.phoneNumber}</Typography> {/* Giá trị trường */}
                                        </Grid>

                                        <Grid item xs={6} display="flex" alignItems="center" sx={{ padding: '16px' }}>
                                            <Typography variant="subtitle1" sx={{ flex: 1 }}>Ngày sinh</Typography>
                                            <Typography variant="body1" sx={{ flex: 1 }}>: {customer ? formatDate(tempCustomerRef.current.birthday) : 'N/A'}</Typography> {/* Giá trị trường */}
                                        </Grid>

                                        {/* Cột thứ hai */}
                                        <Grid item xs={6} display="flex" alignItems="center" sx={{ padding: '16px' }}>
                                            <Typography variant="subtitle1" sx={{ flex: 1 }}>Email</Typography>
                                            <Typography variant="body1" sx={{ flex: 1 }}>:{tempCustomerRef.current?.email}</Typography> {/* Giá trị trường */}
                                        </Grid>

                                        <Grid item xs={6} display="flex" alignItems="center" sx={{ padding: '16px' }}>
                                            <Typography variant="subtitle1" sx={{ flex: 1 }}>Ngày tạo</Typography>
                                            <Typography variant="body1" sx={{ flex: 1 }}>: {customer ? formatDate(tempCustomerRef.current.createdOn) : 'N/A'}</Typography> {/* Giá trị trường */}
                                        </Grid>

                                        <Grid item xs={6} display="flex" alignItems="center" sx={{ padding: '16px' }}>
                                            <Typography variant="subtitle1" sx={{ flex: 1 }}>Giới tính</Typography>
                                            <Typography variant="body1" sx={{ flex: 1 }}>:{tempCustomerRef.current?.gender ? 'Nam' : 'Nữ'}</Typography> {/* Giá trị trường */}
                                        </Grid>

                                        <Grid item xs={6} display="flex" alignItems="center" sx={{ padding: '16px' }}>
                                            <Typography variant="subtitle1" sx={{ flex: 1 }}>Ngày cập nhật cuối cùng</Typography>
                                            <Typography variant="body1" sx={{ flex: 1 }}>: {customer ? formatDate(tempCustomerRef.current.updatedOn) : 'N/A'}</Typography> {/* Giá trị trường */}
                                        </Grid>

                                    </Grid>

                                </Box>

                            </Box>
                            <Box sx={{backgroundColor: 'white', margin: '16px 24px'}}>
                                <Box sx={{
                                    width: '100%',
                                    borderBottom: '1px solid var(--sub-color, #D9D9D9)'  // Thêm border-bottom
                                }}>
                                    <Box sx={{ padding: '16px' }}>
                                        <Typography variant="h6" sx={{  fontWeight: 600, fontSize: '20px', color: 'black'  }} >
                                            Thông tin mua hàng
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Grid container>
                                        <Grid item xs={6} display="flex" alignItems="center" sx={{ padding: '16px' }} >
                                            <Typography variant="subtitle1" sx={{ flex: 1 }}>Tổng chi tiêu</Typography>
                                            <Typography variant="body1" sx={{ flex: 1 }}>:{tempCustomerRef.current?.totalExpense}</Typography> {/* Giá trị trường */}
                                        </Grid>

                                        <Grid item xs={6} display="flex" alignItems="center" sx={{ padding: '16px' }}>
                                            <Typography variant="subtitle1" sx={{ flex: 1 }}>Ngày đầu tiên mua hàng</Typography>
                                            <Typography variant="body1" sx={{ flex: 1 }}>:</Typography> {/* Giá trị trường */}
                                        </Grid>

                                        <Grid item xs={6} display="flex" alignItems="center" sx={{ padding: '16px' }}>
                                            <Typography variant="subtitle1" sx={{ flex: 1 }}>Tổng SL đơn hàng</Typography>
                                            <Typography variant="body1" sx={{ flex: 1 }}>:{tempCustomerRef.current?.numberOfOrder}</Typography> {/* Giá trị trường */}
                                        </Grid>

                                        <Grid item xs={6} display="flex" alignItems="center" sx={{ padding: '16px' }}>
                                            <Typography variant="subtitle1" sx={{ flex: 1 }}>Ngày mua hàng gần nhất</Typography>
                                            <Typography variant="body1" sx={{ flex: 1 }}>:01/01/1990</Typography> {/* Giá trị trường */}
                                        </Grid>
                                    </Grid>

                                </Box>

                            </Box>
                        </Box>
                        <Box sx={{ flexBasis: '30%', display: 'inline-block',backgroundColor: 'white', margin: '16px 24px' }}>
                            <Box sx={{
                                width: '100%',
                                borderBottom: '1px solid var(--sub-color, #D9D9D9)'  // Thêm border-bottom
                            }}>
                                <Box sx={{ padding: '16px' }}>
                                    <Typography variant="h6" sx={{  fontWeight: 600, fontSize: '20px',  color: 'black'  }} >
                                        Thông tin tích điểm
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Grid container>
                                    <Grid item xs={12} display="flex" alignItems="center" sx={{ padding: '16px' }} >
                                        <Typography variant="subtitle1" sx={{ flex: 1 }}>Điểm hiện tại</Typography>
                                        <Typography variant="body1" sx={{ flex: 1 }}>:KH001</Typography> {/* Giá trị trường */}
                                    </Grid>

                                    <Grid item xs={12} display="flex" alignItems="center" sx={{ padding: '16px' }}>
                                        <Typography variant="subtitle1" sx={{ flex: 1 }}>Xếp hạng</Typography>
                                        <Typography variant="body1" sx={{ flex: 1 }}>:123 ABC Street</Typography> {/* Giá trị trường */}
                                    </Grid>

                                </Grid>
                            </Box>

                        </Box>

                    </Box>
                    <Box sx={{ backgroundColor: 'white', margin: '16px 24px' }}>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="customer detail tabs">
                                        <Tab label="Lịch sử đơn hàng" value="1" sx={{
                                            fontWeight: 600,
                                            fontSize: '15px',
                                            cursor: 'pointer',
                                            color: value === "1" ? 'var(--primary-color, #08F)' : '#747C87' // Thay đổi màu chữ
                                        }}  />
                                        <Tab label="Ghi chú" value="2" sx={{
                                            fontWeight: 600,
                                            fontSize: '15px',
                                            cursor: 'pointer',
                                            color: value === "2" ? 'var(--primary-color, #08F)' : '#747C87' // Thay đổi màu chữ
                                        }}  />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                                        <Table sx={{ minWidth: 650 }}>
                                            <TableHead>
                                                <TableRow sx={{ backgroundColor: '#f1f1f1' }}>
                                                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Mã đơn hàng</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Ngày tạo đơn</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Số lượng sản phẩm</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Số tiền thanh toán</TableCell>
                                                    {/*<TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Nhân viên xử lý đơn</TableCell>*/}
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Array.isArray(customer?.orders) && customer.orders.length > 0 ? (
                                                    customer.orders.map((order, index) => (
                                                        <TableRow
                                                            key={order.id}
                                                            sx={{
                                                                '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                                                                '&:hover': { backgroundColor: '#e0f7fa' }, // Hover effect
                                                            }}
                                                        >
                                                            <TableCell>{order.id}</TableCell>
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
                                            count={customer?.orders.length} // Tổng số lượng đơn hàng
                                            page={pageNum}
                                            onPageChange={handleChangePage}
                                            rowsPerPage={pageSize}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            rowsPerPageOptions={[5, 10]} // Các tùy chọn số hàng
                                            sx={{ mt: 2 }} // Margin top
                                        />
                                    </Box>
                                </TabPanel>
                                <TabPanel value="2">
                                    {/* Nội dung Ghi chú */}

                                    <textarea
                                        rows={4}
                                        style={{ width: '100%', padding: '8px',fontFamily: 'Segoe UI' }}
                                        placeholder="Nhập ghi chú ở đây..."
                                        value={customer?.note} // Hiển thị ghi chú từ customer.note
                                        onChange={(e) => {
                                            // Xử lý khi người dùng thay đổi ghi chú
                                            setCustomer({ ...customer, note: e.target.value });
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => updateCustomer(customer?.id)}
                                        >
                                            Lưu
                                        </Button>
                                    </Box>
                                </TabPanel>

                            </TabContext>
                        </Box>

                    </Box>
                    <Dialog sx={{padding: '10px'}} open={openModal} onClose={handleCloseModal}>
                        <DialogTitle sx={{fontWeight: '700'}}>Cập nhật thông tin khách hàng </DialogTitle>
                        <Divider/>
                        <DialogContent>
                            <Grid container spacing={2}>
                                {/* Tên khách hàng */}
                                <Grid item xs={6}>
                                    <TextField

                                        margin="dense"
                                        label="Tên khách hàng"
                                        name="name"
                                        fullWidth
                                        value={customer?.name}
                                        onChange={handleChangeCustomer}
                                    />
                                </Grid>

                                {/* Số điện thoại */}
                                <Grid item xs={6}>
                                    <TextField
                                        margin="dense"
                                        label="Số điện thoại"
                                        name="phoneNumber"
                                        fullWidth
                                        value={customer?.phoneNumber}
                                        onChange={handleChangeCustomer}
                                    />
                                </Grid>

                                {/* Ngày sinh */}
                                <Grid item xs={6}>
                                    <TextField
                                        margin="dense"
                                        label="Ngày sinh"
                                        name="birthday"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={customer?.birthday}
                                        onChange={handleChangeCustomer}
                                    />
                                </Grid>

                                {/* Email */}
                                <Grid item xs={6}>
                                    <TextField
                                        margin="dense"
                                        label="Email"
                                        name="email"
                                        type="email"
                                        fullWidth
                                        value={customer?.email}
                                        onChange={handleChangeCustomer}
                                    />
                                </Grid>

                                {/* Địa chỉ */}
                                <Grid item xs={12}>
                                    <TextField
                                        margin="dense"
                                        label="Địa chỉ"
                                        name="address"
                                        fullWidth
                                        value={customer?.address}
                                        onChange={handleChangeCustomer}
                                    />
                                </Grid>

                                {/* Giới tính */}
                                <Grid item xs={12}>
                                    <FormControl component="fieldset" margin="dense">
                                        <FormLabel component="legend">Giới tính</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-label="gender"
                                            name="gender"
                                            value={customer?.gender ? "male" : "female"}  // Hiển thị đúng giới tính theo boolean
                                            onChange={(e) => setCustomer({
                                                ...customer,
                                                gender: e.target.value === "male"  // Cập nhật giá trị boolean
                                            })}
                                        >
                                            <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                            <FormControlLabel value="female" control={<Radio />} label="Nữ" />

                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>

                        </DialogContent>
                        <Divider/>
                        <DialogActions>
                            <Button
                                onClick={handleCloseModal}
                                color="secondary"
                                sx={{
                                    borderRadius: '5px',
                                    border: '1px solid var(--primary-color, #08F)',
                                    color: '#08F',
                                    background: 'none', // Hoặc bỏ thuộc tính này nếu muốn màu nền mặc định
                                    padding: '8px 16px', // Có thể thêm padding để nút đẹp hơn
                                    '&:hover': {
                                        background: 'var(--primary-color, #08F)', // Đổi màu nền khi hover
                                        color: 'white', // Đổi màu chữ khi hover
                                    }
                                }}
                            >
                                Thoát
                            </Button>
                            <Button
                                onClick={() => {

                                    updateCustomer(customer.id); // Gọi hàm cập nhật
                                    handleCloseModal();
                                    // setOpenModal(false);
                                }}
                                sx={{
                                    borderRadius: '5px',
                                    border: '1px solid var(--primary-color, #08F)',
                                    background: 'var(--primary-color, #08F)', // Màu nền cho nút Lưu
                                    color: 'white', // Màu chữ cho nút Lưu
                                    padding: '8px 16px', // Có thể thêm padding
                                    '&:hover': {
                                        background: 'darken(var(--primary-color, #08F), 10%)', // Tối màu nền khi hover
                                    }
                                }}
                            >
                                Lưu
                            </Button>
                        </DialogActions>


                    </Dialog>
                    <Dialog
                        open={openDeleteModal}
                        onClose={() => setOpenDeleteModal(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        sx={{
                            '& .MuiDialog-paper': {
                                position: 'absolute',
                                top: '10%', // Đặt modal nằm gần phía trên
                                left: '50%',
                                transform: 'translate(-50%, 0)', // Giữ modal ở giữa theo chiều ngang
                                 // Giới hạn độ rộng modal nếu cần
                                width: '100%', // Đảm bảo modal không vượt quá kích thước
                            },
                        }}
                    >
                        <DialogTitle id="alert-dialog-title" sx={{
                            fontWeight: '600',
                            color: '#000', // Màu chữ đen
                            fontFamily: 'Segoe UI', // Font chữ
                            fontSize: '26px', // Kích thước chữ
                            fontStyle: 'normal', // Kiểu chữ (không nghiêng)
                            lineHeight: 'normal', // Khoảng cách dòng bình thường
                        }}>
                            Xoá khách hàng
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" style={{
                                color: '#000', // Màu chữ đen
                                fontFamily: 'Segoe UI', // Font Segoe UI
                                fontSize: '16px', // Kích thước chữ 16px
                                fontStyle: 'normal', // Kiểu chữ bình thường
                                fontWeight: 400, // Độ đậm chữ
                                lineHeight: 'normal', // Độ cao dòng bình thường
                            }}>
                                Bạn có chắc chắn muốn xóa khách hàng
                                <span
                                    style={{
                                        color: '#000', // Màu chữ đen
                                        fontFamily: 'Segoe UI', // Font Segoe UI
                                        fontSize: '16px', // Kích thước chữ 16px
                                        fontStyle: 'normal', // Kiểu chữ bình thường
                                        fontWeight: 700, // Độ đậm chữ
                                        lineHeight: 'normal', // Độ cao dòng bình thường
                                    }}
                                >
                                    {customer?.gender ? ' Anh ' : ' Chị '} {customer?.name}
                                </span> ? Thao tác này không thể khôi phục.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDeleteModal(false)}
                                    color="secondary"
                                    sx={{
                                        borderRadius: '5px', // Bo góc 5px
                                        border: '1px solid var(--danger-color, #FF4D4D)', // Viền màu đỏ (hoặc biến màu nguy hiểm)
                                        color: '#FF4D4D', // Màu chữ đỏ
                                        padding: '8px 16px', // Thêm khoảng cách bên trong nút
                                        background: 'none', // Nền trong suốt
                                        '&:hover': {
                                            backgroundColor: '#f0f0f0', // Màu nền xám nhạt khi hover
                                            color: '#FF4D4D', // Giữ màu chữ đỏ
                                        },
                                    }}>
                                Thoát
                            </Button>
                            <Button
                                onClick={() => {
                                    handleDeleteCustomer(customer.id);  // Hàm xử lý xóa khách hàng
                                    navigate('/customers');
                                }}
                                color="error"
                                autoFocus
                                sx={{
                                    borderRadius: '5px', // Bo góc 5px
                                    background: 'var(--danger-color, #FF4D4D)', // Nền đỏ từ biến hoặc màu cụ thể
                                    color: 'white', // Màu chữ trắng
                                    padding: '8px 16px', // Thêm khoảng cách bên trong nút
                                    '&:hover': {
                                        backgroundColor: 'darkred', // Màu nền khi hover (có thể điều chỉnh)
                                    },
                                }}
                            >
                                Xoá
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Box>


            </MainBox>
        </Box>
    )
}
