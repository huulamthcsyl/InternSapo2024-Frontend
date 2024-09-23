import {
    Box,
    Button,
    CardContent,
    CardMedia,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import MainBox from "../../../../components/layout/MainBox";
import Add from "@mui/icons-material/Add";
import Cancel from "@mui/icons-material/Cancel";
import AddProductAppBar from "./AddProductAppBar";
import { DataGrid } from "@mui/x-data-grid";

type Props = {};

export default function AddProduct({}: Props) {
    return (
        <Box>
            <AddProductAppBar />
            <MainBox>
                <Box sx={{ padding: "20px 24px", backgroundColor: "#F0F1F1" }}>
                    <Box
                        sx={{
                            display: "flex",
                            height: "60px",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography sx={{ fontSize: "20px" }}>
                            Áo khoác Chino thời thượng
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "24px" }}>
                        <Box sx={{ width: "70%" }}>
                            <Box
                                sx={{
                                    borderRadius: "5px",
                                    backgroundColor: "white",
                                }}
                            >
                                <Box
                                    sx={{
                                        padding: "16px",
                                        height: "27px",
                                        borderBottom: "1px solid #d9d9d9",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "20px" }}>
                                        Thông tin sản phẩm
                                    </Typography>
                                </Box>
                                <Box sx={{ padding: "16px" }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Tên sản phẩm"
                                        defaultValue="foo"
                                        margin="normal"
                                        size="small"
                                    />
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Mô tả sản phẩm"
                                        defaultValue="foo"
                                        margin="normal"
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    borderRadius: "5px",
                                    backgroundColor: "white",
                                }}
                            >
                                <Box
                                    sx={{
                                        padding: "16px",
                                        height: "27px",
                                        borderBottom: "1px solid #d9d9d9",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mt: "24px",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "20px" }}>
                                        Ảnh sản phẩm
                                    </Typography>
                                    <Button
                                        variant="text"
                                        sx={{ textTransform: "none" }}
                                    >
                                        Xoá tất cả
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        padding: "20px 25px",
                                        display: "flex",
                                        gap: "20px",
                                    }}
                                >
                                    <Button
                                        sx={{
                                            border: "1px dashed #d9d9d9",
                                            borderRadius: 1,
                                            width: 100,
                                            height: 100,
                                        }}
                                    >
                                        <Add sx={{ color: "black" }} />
                                    </Button>
                                    <Box sx={{ position: "relative" }}>
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                borderRadius: 1,
                                                width: 100,
                                                height: 100,
                                            }}
                                            image="https://firebasestorage.googleapis.com/v0/b/group1-sapo.appspot.com/o/products%2Fbachmahoangtu.jpg?alt=media&token=8bd45827-b5d6-49d6-81a9-91c856472dd7"
                                            alt="Paella dish"
                                        />
                                        <Cancel
                                            sx={{
                                                position: "absolute",
                                                flexGrow: 1,
                                                top: 0,
                                                right: 0,
                                                width: "15px",
                                                height: "15px",
                                                backgroundColor: "white",
                                                borderRadius: "50%",
                                            }}
                                            color="error"
                                        />
                                    </Box>

                                    <CardMedia
                                        component="img"
                                        sx={{
                                            borderRadius: 1,
                                            width: 100,
                                            height: 100,
                                        }}
                                        image="https://firebasestorage.googleapis.com/v0/b/group1-sapo.appspot.com/o/products%2Fbachmahoangtu.jpg?alt=media&token=8bd45827-b5d6-49d6-81a9-91c856472dd7"
                                        alt="Paella dish"
                                    />
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            borderRadius: 1,
                                            width: 100,
                                            height: 100,
                                        }}
                                        image="https://firebasestorage.googleapis.com/v0/b/group1-sapo.appspot.com/o/products%2Fbachmahoangtu.jpg?alt=media&token=8bd45827-b5d6-49d6-81a9-91c856472dd7"
                                        alt="Paella dish"
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    borderRadius: "5px",
                                    backgroundColor: "white",
                                }}
                            >
                                <Box
                                    sx={{
                                        mt: "24px",
                                        padding: "16px",
                                        height: "27px",
                                        borderBottom: "1px solid #d9d9d9",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "20px" }}>
                                        Giá sản phẩm
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        padding: "16px",
                                        gap: "20px",
                                    }}
                                >
                                    <TextField
                                        label="Giá bán"
                                        required
                                        size="small"
                                        defaultValue={"sfds"}
                                        sx={{ width: "50%" }}
                                    />
                                    <TextField
                                        label="Giá nhập"
                                        required
                                        size="small"
                                        defaultValue={"sfds"}
                                        sx={{ width: "50%" }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    borderRadius: "5px",
                                    backgroundColor: "white",
                                }}
                            >
                                <Box
                                    sx={{
                                        padding: "16px",
                                        height: "27px",
                                        borderBottom: "1px solid #d9d9d9",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mt: "24px",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "20px" }}>
                                        Thuộc tính
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        padding: "20px 25px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "20px",
                                        width: "70%",
                                    }}
                                >
                                    <Box sx={{ display: "flex" }}>
                                        <Typography
                                            fontWeight={"bold"}
                                            width={150}
                                        >
                                            Tên thuộc tính
                                        </Typography>
                                        <Typography
                                            fontWeight={"bold"}
                                            sx={{ flexGrow: 1 }}
                                        >
                                            Giá trị
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            fontSize={"0.9rem"}
                                            width={150}
                                        >
                                            Kích cỡ
                                        </Typography>
                                        <TextField
                                            sx={{
                                                flexGrow: 1,
                                                fontSize: "0.9rem",
                                            }}
                                            size="small"
                                            defaultValue={"fdsf"}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            fontSize={"0.9rem"}
                                            width={150}
                                        >
                                            Màu sắc
                                        </Typography>
                                        <TextField
                                            sx={{
                                                flexGrow: 1,
                                                fontSize: "0.9rem",
                                            }}
                                            size="small"
                                            defaultValue={"fdsf"}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            fontSize={"0.9rem"}
                                            width={150}
                                        >
                                            Chất liệu
                                        </Typography>
                                        <TextField
                                            sx={{
                                                flexGrow: 1,
                                                fontSize: "0.9rem",
                                            }}
                                            size="small"
                                            defaultValue={"fdsf"}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                borderRadius: "5px",
                                backgroundColor: "white",
                                flexGrow: 1,
                                height: "fit-content",
                            }}
                        >
                            <Box
                                sx={{
                                    padding: "16px",
                                    height: "27px",
                                    borderBottom: "1px solid #d9d9d9",
                                }}
                            >
                                <Typography sx={{ fontSize: "20px" }}>
                                    Phân loại
                                </Typography>
                            </Box>
                            <Box sx={{ padding: "16px" }}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="category">
                                        Loại sản phẩm
                                    </InputLabel>
                                    <Select
                                        labelId="category"
                                        id="category"
                                        label="Loại sản phẩm"
                                        defaultValue={10}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="brand">
                                        Nhãn hiệu
                                    </InputLabel>
                                    <Select
                                        labelId="brand"
                                        id="brand"
                                        label="Nhãn hiệu"
                                        defaultValue={10}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            mt: "24px",
                            borderRadius: "5px",
                            backgroundColor: "white",
                            height: "fit-content",
                        }}
                    >
                        <Box
                            sx={{
                                padding: "16px",
                                height: "27px",
                                borderBottom: "1px solid #d9d9d9",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography sx={{ fontSize: "20px" }}>
                                Phiên bản
                            </Typography>
                            <Button></Button>
                        </Box>
                        <Box sx={{ padding: "16px" }}>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table"
                                >
                                    <TableHead sx={{backgroundColor:'#F4F6F8'}}>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell width={'400px'}>
                                                Tên phiên bản
                                            </TableCell>
                                            <TableCell width={'200px'} align="center">
                                                Mã SKU
                                            </TableCell>
                                            <TableCell width={'200px'} align="center">
                                                Giá bán
                                            </TableCell>
                                            <TableCell width={'200px'} align="center">
                                                Giá nhập
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell>
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                    }}
                                                    image="https://firebasestorage.googleapis.com/v0/b/group1-sapo.appspot.com/o/products%2Fbachmahoangtu.jpg?alt=media&token=8bd45827-b5d6-49d6-81a9-91c856472dd7"
                                                    alt="Paella dish"
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                M - Trắng
                                            </TableCell>
                                            <TableCell >
                                                <TextField size="small"/>
                                            </TableCell>
                                            <TableCell >
                                                <TextField size="small"/>
                                            </TableCell>
                                            <TableCell >
                                                <TextField size="small"/>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </Box>
            </MainBox>
        </Box>
    );
}
