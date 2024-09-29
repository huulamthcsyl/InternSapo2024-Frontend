import {
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, Grid,
    InputAdornment, InputLabel, MenuItem, Pagination, Radio, RadioGroup, Select, Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead, TablePagination,
    TableRow,
    TextField,
    Typography
} from "@mui/material"
import CustomerPageAppBar from "./CustomerPageAppBar.tsx"
import MainBox from "../../components/layout/MainBox"
import SearchIcon from '@mui/icons-material/Search';
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import {Alert} from "@mui/lab";
import Customer from "../../models/Customer.ts";
import {fetchCustomers, submitNewCustomer} from "../../services/customerAPI.ts";

type Props = {}

export default function CustomerPage({}: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [keyword, setKeyword] = useState("");
    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(5); // Số khách hàng mỗi trang
    const [totalPages, setTotalPages] = useState(1);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [errorMessage, setErrorMessage] = useState(""); // State để lưu thông báo lỗi
    const navigate = useNavigate();  // Khởi tạo useNavigate để điều hướng

    const [successMessage, setSuccessMessage] = useState(""); // State để lưu thông báo thành công





    const [openModal, setOpenModal] = useState(false);  // State để quản lý việc mở/đóng modal
    const [newCustomer, setNewCustomer] = useState<>({
        name: '',
        phoneNumber: '',
        totalExpense: 0,
        numberOfOrder: 0,
        gender: false, // Default value for gender
        birthday: null, // You can set a default or leave as null for now
        email: '',  // Added email field
        address: '' // Added address field
    });



    useEffect(() => {
        const timeout = setTimeout(() => {

            setErrorMessage('');
            setSuccessMessage('');
        }, 3000); // Thời gian hiển thị 3 giây

        return () => clearTimeout(timeout); // Dọn dẹp timeout khi component unmount hoặc cập nhật
    }, [ errorMessage, successMessage]);


   
    const loadCustomers = async () => {
        try {
            const fetchedCustomers = await fetchCustomers(pageNum, pageSize, keyword);
            setCustomers(fetchedCustomers.content);
            setTotalPages(fetchedCustomers.totalPages);// Cập nhật số trang
            setTotalCustomers(fetchedCustomers.totalElements);
            setErrorMessage("");
        } catch (error) {
            if (error.message.includes('Không tồn tại khách hàng')) {
                setCustomers([]);
                setTotalCustomers(0);
                setErrorMessage(error.message);
            } else {
                console.error('Lỗi khi lấy danh sách khách hàng:', error);
            }
        }
    };
    useEffect(() => {


        loadCustomers();
    }, [pageNum, pageSize, keyword]);
    const handleChangePage = (event, newPage) => {
        setPageNum(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setPageSize(parseInt(event.target.value, 10)); // Cập nhật số hàng trên mỗi trang
        setPageNum(0); // Reset về trang đầu khi thay đổi số hàng
    };

    // Hàm xử lý khi người dùng nhấn phím
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setKeyword(searchTerm); // Cập nhật từ khóa và gọi API tìm kiếm
            setPageNum(0); // Reset lại trang đầu tiên
        }
    };



    // Xử lý mở modal
    const handleAddCustomerClick = () => {
        setOpenModal(true);  // Mở modal
    };


    // Xử lý đóng modal
    const handleCloseModal = () => {
        setOpenModal(false);  // Đóng modal
        // Reset lại thông tin khách hàng
        setNewCustomer({
            name: '',
            phoneNumber: '',
            totalExpense: 0,
            numberOfOrder: 0,
            gender: false,
            birthday: null,
            email: '',
            address: ''
        });
    };

    const handleSubmitNewCustomer = async () => {
        try {
            console.log("Thông tin khách hàng mới:", newCustomer);

            // Gọi API để tạo khách hàng mới
            const createdCustomer = await submitNewCustomer(newCustomer);
            console.log("Tạo khách hàng thành công:", createdCustomer);

            setSuccessMessage("Tạo khách hàng thành công!"); // Thiết lập thông báo thành công
            setNewCustomer({
                name: '',
                phoneNumber: '',
                totalExpense: 0,
                numberOfOrder: 0,
                gender: false,
                birthday: null,
                email: '',
                address: ''
            });
            setOpenModal(false);  // Đóng modal sau khi tạo thành công
            loadCustomers(); // Gọi lại API để cập nhật danh sách khách hàng
        } catch (error: any) {
            console.error("Lỗi khi tạo khách hàng:", error.message);
            setErrorMessage(error.message); // Cập nhật thông báo lỗi

            setNewCustomer({
                name: '',
                phoneNumber: '',
                totalExpense: 0,
                numberOfOrder: 0,
                gender: false,
                birthday: null,
                email: '',
                address: ''
            });
        }
        setOpenModal(false);  // Đóng modal sau khi submit
    };
    // Cập nhật state khi nhập dữ liệu vào form
    const handleChangeNewCustomer = (e) => {
        setNewCustomer({
            ...newCustomer,
            [e.target.name]: e.target.value
        });
    };

    const handleDetailsClick = (customerId) => {
        navigate(`/customers/${customerId}`); // Chuyển hướng tới trang chi tiết của khách hàng
    };


    return (
        <Box>
            <CustomerPageAppBar />
            <MainBox>
                <Box
                    sx={{ padding: '24px' }}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center">
                    <Typography variant="h6" sx={{
                        color: '#000', // Màu chữ
                        fontFamily: '"Segoe UI", sans-serif', // Phông chữ
                        fontSize: '20px', // Kích thước chữ
                        fontStyle: 'normal', // Kiểu chữ
                        fontWeight: 600, // Độ đậm của chữ
                        lineHeight: 'normal', // Chiều cao dòng
                    }} >Danh sách khách hàng</Typography>
                    <Button sx={{ backgroundColor: 'primary.main', color: 'white',fontFamily: '"Segoe UI", sans-serif', // Phông chữ
                        fontSize: '14px', // Kích thước chữ
                        fontStyle: 'normal', // Kiểu chữ
                        fontWeight: 400, }} onClick={handleAddCustomerClick}>+ Thêm khách hàng</Button>
                </Box>

                {/*Hiển thị thông báo alert*/}
                <Box sx={{ padding: '16px 14px 16px 14px' }}>
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

                </Box>

                {/*thanh tìm kiếm và bảng listCustomers*/}
                <Box sx={{background: '#FFFFFF', margin: '10px 20px'}}>
                    <Box sx={{   }}>
                        <TextField
                            variant="outlined"
                            placeholder="Tìm kiếm khách hàng theo tên hoặc SĐT"
                            onChange={(e) => setSearchTerm(e.target.value)}  // Cập nhật giá trị tìm kiếm
                            onKeyPress={handleKeyPress}  // Gắn sự kiện khi nhấn phím
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ width: '100%' }}
                        />
                    </Box>
                    <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#e0f7fa' }}>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Mã khách hàng</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Tên khách hàng</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Số điện thoại</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Tổng chi tiêu</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Tổng số đơn hàng</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customers.map((customer) => (
                                    <TableRow
                                        key={customer.id}
                                        sx={{
                                            // '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                                            // '&:hover': { backgroundColor: '#e0f7fa' },  // Hover effect
                                        }}
                                    >
                                        <TableCell>{customer.code}</TableCell>
                                        <TableCell>{customer.name}</TableCell>
                                        <TableCell>{customer.phoneNumber}</TableCell>
                                        <TableCell>{customer.totalExpense}</TableCell>
                                        <TableCell>{customer.numberOfOrder}</TableCell>
                                        <TableCell>
                                            <Typography
                                                onClick={() => handleDetailsClick(customer.id)} // Chuyển hướng khi nhấn vào
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
                                ))}
                            </TableBody>
                        </Table>

                        <TablePagination
                            component="div"
                            count={totalCustomers} // Tổng số lượng khách hàng
                            page={pageNum}
                            onPageChange={handleChangePage}
                            rowsPerPage={pageSize}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 20, 50]} // Các tùy chọn số hàng
                            sx={{ mt: 2 }} // Margin top
                        />
                    </Box>


                </Box>
                {/* Modal Thêm khách hàng */}
                <Dialog sx={{padding: '10px'}} open={openModal} onClose={handleCloseModal}>
                    <DialogTitle sx={{fontWeight: '700'}}>Thêm mới khách hàng </DialogTitle>
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
                                    value={newCustomer.name}
                                    onChange={handleChangeNewCustomer}
                                />
                            </Grid>

                            {/* Số điện thoại */}
                            <Grid item xs={6}>
                                <TextField
                                    margin="dense"
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                    fullWidth
                                    value={newCustomer.phoneNumber}
                                    onChange={handleChangeNewCustomer}
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
                                    value={newCustomer.birthday}
                                    onChange={handleChangeNewCustomer}
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
                                    value={newCustomer.email}
                                    onChange={handleChangeNewCustomer}
                                />
                            </Grid>

                            {/* Địa chỉ */}
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    label="Địa chỉ"
                                    name="address"
                                    fullWidth
                                    value={newCustomer.address}
                                    onChange={handleChangeNewCustomer}
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
                                        value={newCustomer.gender ? "male" : "female"}  // Hiển thị đúng giới tính theo boolean
                                        onChange={(e) => setNewCustomer({
                                            ...newCustomer,
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
                            onClick={handleSubmitNewCustomer}
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


            </MainBox>
        </Box>
    )
}
