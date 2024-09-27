import { Box, Button, Typography } from "@mui/material";
import MainBox from "../../../../components/layout/MainBox";
import { Add } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import CategoryPageAppBar from "./CategoryPageAppBar";
import { useEffect, useState } from "react";
import UpdateOrAdd from "./UpdateOrAdd";
import { CategoryResponse } from "../ProductInterface";
import SearchField from "../SearchField";

type Props = {};

export default function CategoryPage({}: Props) {
    const [data, setData] = useState<CategoryResponse[]>([]);
    const [totalNumberOfCategories, setTotalNumberOfCategories] = useState(0);
    const [query, setQuery] = useState("");
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [isUpdate, setIsUpdate] = useState(0);
    const [selectedCategory, setSelectedCategory] =
        useState<CategoryResponse | null>({});
    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Tên loại sản phẩm",
            width: 130,
        },
        {
            field: "code",
            headerName: "Mã loại",
            width: 130,
        },
        {
            field: "description",
            headerName: "Ghi chú",
            width: 90,
        },
        {
            field: "createdOn",
            headerName: "Ngày tạo",
            type: "date",
            valueGetter: (value) => {
                return value ? new Date(value) : "";
            },
            width: 160,
        },
        {
            field: "updatedOn",
            headerName: "Ngày cập nhật cuối",
            type: "date",
            valueGetter: (value) => {
                // Assuming the value is a string or timestamp and needs to be transformed into a Date object
                return value ? new Date(value) : "";
            },
            width: 160,
        },
    ];

    function getListOfCategories() {
        fetch(
            `http://localhost:8080/v1/products/categories?page=${paginationModel.page}&limit=${paginationModel.pageSize}&query=${query}`
        )
            .then((res) => res.json())
            .then((result) => {
                setData(result.data);
            });
    }

    function getTotalNumberOfCategories() {
        fetch(
            `http://localhost:8080/v1/products/categories/total-categories?query=${query}`
        )
            .then((res) => res.json())
            .then((result) => {
                setTotalNumberOfCategories(result.data);
            });
    }

    function updateListOfProducts() {
        getTotalNumberOfCategories();
        getListOfCategories();
    }
    function handleRowClick(
        params: GridRowParams<CategoryResponse>
        // e: GridEventListener<"rowClick">
    ) {
        // e.preventDefault();
        setIsUpdate(1);
        setSelectedCategory(params.row);
    }

    useEffect(() => {
        getListOfCategories();
    }, [paginationModel.pageSize, paginationModel.page]);

    useEffect(() => {
        getTotalNumberOfCategories();
        getListOfCategories();
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
                        <SearchField onKeyPress={setQuery} />
                        <DataGrid
                            rows={data}
                            columns={columns}
                            rowCount={totalNumberOfCategories}
                            onRowClick={handleRowClick}
                            {...data}
                            paginationMode="server"
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[5, 10, 15]}
                            // checkboxSelection
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
