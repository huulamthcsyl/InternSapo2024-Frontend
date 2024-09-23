import {
    Box,
    Button,
    InputBase,
    TextField,
    Typography,
} from "@mui/material";
import MainBox from "../../../../components/layout/MainBox";
import Search from "@mui/icons-material/Search";
import { Add } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CategoryPageAppBar from "./CategoryPageAppBar";
import Close from "@mui/icons-material/Close";
import { useState } from "react";

type Props = {};

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        headerClassName: "super-app-theme--header",
        width: 70,
    },
    {
        field: "firstName",
        headerName: "First name",
        headerClassName: "super-app-theme--header",
        width: 130,
    },
    {
        field: "lastName",
        headerName: "Last name",
        headerClassName: "super-app-theme--header",
        width: 130,
    },
    {
        field: "age",
        headerName: "Age",
        headerClassName: "super-app-theme--header",
        type: "number",
        width: 90,
    },
    {
        field: "fullName",
        headerName: "Full name",
        headerClassName: "super-app-theme--header",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
        valueGetter: (value, row) =>
            `${row.firstName || ""} ${row.lastName || ""}`,
    },
];

const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function CategoryPage({}: Props) {
    const [openPopup, setOpenPopup] = useState(false);

    return (
        <Box>
            <CategoryPageAppBar />
            <MainBox>
                <Box sx={{ padding: "20px 24px", backgroundColor: "#F0F1F1" }}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            padding: "11px 0",
                            height: "38px",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography sx={{ fontSize: "20px" }}>
                            Loại sản phẩm
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            sx={{ textTransform: "none" }}
                            onClick={() => setOpenPopup(!openPopup)}
                        >
                            Thêm loại sản phẩm
                        </Button>
                    </Box>
                    <Box sx={{ backgroundColor: "white" }}>
                        <Box sx={{ padding: "16px" }}>
                            <Box
                                sx={{
                                    border: "1px solid #d9d9d9",
                                    alignItems: "center",
                                    display: "flex",
                                    borderRadius: "5px",
                                    padding: "10px 15px",
                                    gap: "30px",
                                }}
                            >
                                <Search
                                    sx={{
                                        color: "#d9d9d9",
                                        height: "32px",
                                        width: "32px",
                                    }}
                                />
                                <InputBase
                                    sx={{ width: "100%" }}
                                    placeholder="Tìm kiếm loại sản phẩm theo tên"
                                />
                            </Box>
                        </Box>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            sx={{
                                border: 0,
                            }}
                        />
                    </Box>
                </Box>
            </MainBox>
            <Box
                visibility={openPopup ? "visible" : "collapse"}
                sx={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "white",
                        width: "600px",
                        height: "auto",
                        padding: "10px 30px 30px 30px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        border: "1px solid black",
                        borderRadius: "5px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px 0",
                            borderBottom: "1px solid #d9d9d9",
                        }}
                    >
                        <Typography variant="h5">
                            Thêm mới loại sản phẩm
                        </Typography>
                        <Close color="disabled" />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "20px",
                        }}
                    >
                        <TextField
                            sx={{ width: "50%" }}
                            required
                            size="small"
                            label="Tên loại sản phẩm"
                            defaultValue="foo"
                            margin="normal"
                        />
                        <TextField
                            sx={{ width: "50%" }}
                            label="Mã loại"
                            size="small"
                            defaultValue="foo"
                            margin="normal"
                        />
                    </Box>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Ghi chú"
                        defaultValue="foo"
                        margin="normal"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "25px",
                        }}
                    >
                        <Button variant="outlined" color="error">
                            Xóa
                        </Button>
                        <Button
                            onClick={() => setOpenPopup(!openPopup)}
                            variant="outlined"
                            color="primary"
                        >
                            Thoát
                        </Button>
                        <Button variant="contained">Lưu</Button>
                    </Box>
                {/* <Box
                    sx={{
                        backgroundColor: "white",
                        width: "600px",
                        height: "auto",
                        padding: "10px 30px 30px 30px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        border: "1px solid black",
                        borderRadius: "5px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px 0",
                            borderBottom: "1px solid #d9d9d9",
                        }}
                    >
                        <Typography variant="h5">Xóa loại sản phẩm</Typography>
                        <Close color="disabled" />
                    </Box>
                    <Typography>
                        Thao tác này sẽ xóa loại sản phẩm bạn đã chọn. Thao tác
                        này không thể khôi phục.
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "25px",
                        }}
                    >
                        <Button
                            onClick={() => setOpenPopup(!openPopup)}
                            variant="outlined"
                            color="error"
                        >
                            Thoát
                        </Button>
                        <Button variant="contained" color="error">
                            Xóa
                        </Button>
                    </Box>*/}
                </Box> 
            </Box>
        </Box>
    );
}
