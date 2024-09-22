import { Box, Button, ButtonGroup, Divider, InputBase } from "@mui/material";
import MainBox from "../../../components/layout/MainBox";
import ProductPageAppBar from "./ProductPageAppBar";
import Search from "@mui/icons-material/Search";
import { Add } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {};

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        // headerClassName: "super-app-theme--header",
        width: 70,
    },
    {
        field: "firstName",
        headerName: "First name",
        // headerClassName: "super-app-theme--header",
        width: 130,
    },
    {
        field: "lastName",
        headerName: "Last name",
        // headerClassName: "super-app-theme--header",
        width: 130,
    },
    {
        field: "age",
        headerName: "Age",
        // headerClassName: "super-app-theme--header",
        type: "number",
        width: 90,
    },
    {
        field: "fullName",
        headerName: "Full name",
        // headerClassName: "super-app-theme--header",
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

export default function ProductPage({}: Props) {
    return (
        <Box>
            <ProductPageAppBar />
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
                        <ButtonGroup>
                            <Button
                                variant="text"
                                size="large"
                                sx={{
                                    color: "black",
                                    textTransform: "none",
                                    fontSize: "18px",
                                }}
                            >
                                Loại sản phẩm
                            </Button>
                            <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                            />
                            <Button
                                variant="text"
                                size="large"
                                sx={{
                                    color: "black",
                                    textTransform: "none",
                                    fontSize: "18px",
                                }}
                            >
                                Nhãn hiệu
                            </Button>
                        </ButtonGroup>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            sx={{ textTransform: "none" }}
                        >
                            Thêm sản phẩm
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
                                    gap:'30px'
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
                                    placeholder="Tìm kiếm sản phẩm theo tên"
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
        </Box>
    );
}
