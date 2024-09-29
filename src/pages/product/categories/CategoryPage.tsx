import { Box, Button, Typography } from "@mui/material";
import MainBox from "../../../components/layout/MainBox";
import { Add } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import CategoryPageAppBar from "./CategoryPageAppBar";
import { useEffect, useState } from "react";
import UpdateOrAdd from "./UpdateOrAdd";
import { CategoryResponse } from "../../../models/ProductInterface";
import SearchField from "../SearchField";
import {
    getListOfCategories,
    getNumberOfCategories,
} from "../../../services/categoryAPI";

type Props = {};

export default function CategoryPage({}: Props) {
    const [data, setData] = useState<CategoryResponse[]>([]);
    const [numberOfCategories, setNumberOfCategories] = useState(0);
    const [query, setQuery] = useState("");
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [isUpdate, setIsUpdate] = useState(0);
    const [selectedCategory, setSelectedCategory] =
        useState<CategoryResponse | null>({});
    const customLocaleText = {
        MuiTablePagination: {
            labelRowsPerPage: "Số hàng mỗi trang:",
            labelDisplayedRows: ({ from, to, count }) =>
                `${from}-${to} trên tổng số ${count !== -1 ? count : `nhiều hơn ${to}`}`,
        },
    };
    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Tên loại sản phẩm",
            width: 280,
        },
        {
            field: "code",
            headerName: "Mã loại",
            width: 220,
        },
        {
            field: "description",
            headerName: "Ghi chú",
            width: 280,
        },
        {
            field: "createdOn",
            headerName: "Ngày tạo",
            type: "date",
            valueGetter: (value) => {
                return value ? new Date(value) : "";
            },
            width: 230,
        },
        {
            field: "updatedOn",
            headerName: "Ngày cập nhật cuối",
            type: "date",
            valueGetter: (value) => {
                return value ? new Date(value) : "";
            },
            width: 230,
        },
    ];

    function updateListOfProducts() {
        getNumberOfCategories(query).then((res) => {
            setNumberOfCategories(res);
        });
        getListOfCategories(
            paginationModel.page,
            paginationModel.pageSize,
            query
        ).then((res) => {
            setData(res);
        });
    }
    function handleRowClick(params: GridRowParams<CategoryResponse>) {
        setIsUpdate(1);
        setSelectedCategory(params.row);
    }

    useEffect(() => {
        getListOfCategories(
            paginationModel.page,
            paginationModel.pageSize,
            query
        ).then((res) => {
            setData(res);
        });
    }, [paginationModel.pageSize, paginationModel.page]);

    useEffect(() => {
        getNumberOfCategories(query).then((res) => {
            setNumberOfCategories(res);
        });
        getListOfCategories(
            paginationModel.page,
            paginationModel.pageSize,
            query
        ).then((res) => {
            setData(res);
        });
    }, [query]);
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
                            onClick={() => setIsUpdate(2)}
                        >
                            Thêm loại sản phẩm
                        </Button>
                    </Box>
                    <Box sx={{ backgroundColor: "white" }}>
                        <SearchField
                            onKeyPress={setQuery}
                            placeHolder="Tìm kiếm loại sản phẩm theo tên ..."
                        />
                        <DataGrid
                            rows={data}
                            columns={columns}
                            rowCount={numberOfCategories}
                            onRowClick={handleRowClick}
                            {...data}
                            paginationMode="server"
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[5, 10, 15]}
                            localeText={customLocaleText}
                            sx={{
                                border: 0,
                            }}
                        />
                    </Box>
                </Box>
            </MainBox>
            {isUpdate != 0 ? (
                <UpdateOrAdd
                    isUpdate={isUpdate}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setIsUpdate={setIsUpdate}
                    onUpdate={updateListOfProducts}
                />
            ) : (
                <></>
            )}
        </Box>
    );
}
