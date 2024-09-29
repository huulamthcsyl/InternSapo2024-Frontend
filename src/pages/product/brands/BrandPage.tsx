import { Box, Button, Typography } from "@mui/material";
import MainBox from "../../../components/layout/MainBox";
import { Add } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import BrandPageAppBar from "./BrandPageAppBar";
import { useEffect, useState } from "react";
import { BrandResponse } from "../../../services/ProductInterface";
import SearchField from "../SearchField";
import UpdateOrAddBrand from "./UpdateOrAddBrand";
import { getListOfBrands, getNumberOfBrands } from "../../../services/brandAPI";

type Props = {};

export default function BrandPage({}: Props) {
    const [data, setData] = useState<BrandResponse[]>([]);
    const [numberOfBrands, setNumberOfBrands] = useState(0);
    const [query, setQuery] = useState("");
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [isUpdate, setIsUpdate] = useState(0);
    const [selectedBrand, setSelectedBrand] = useState<BrandResponse | null>(
        {}
    );
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
            headerName: "Tên nhãn hiệu",
            width: 280,
        },
        {
            field: "code",
            headerName: "Mã nhãn hiệu",
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
                // Assuming the value is a string or timestamp and needs to be transformed into a Date object
                return value ? new Date(value) : "";
            },
            width: 230,
        },
    ];

    function updateListOfProducts() {
        getNumberOfBrands(query).then((res) => {
            setNumberOfBrands(res);
        });
        getListOfBrands(
            paginationModel.page,
            paginationModel.pageSize,
            query
        ).then((res) => {
            setData(res);
        });
    }
    function handleRowClick(
        params: GridRowParams<BrandResponse>
        // e: GridEventListener<"rowClick">
    ) {
        // e.preventDefault();
        setIsUpdate(1);
        setSelectedBrand(params.row);
    }

    useEffect(() => {
        getListOfBrands(
            paginationModel.page,
            paginationModel.pageSize,
            query
        ).then((res) => {
            setData(res);
        });
    }, [paginationModel.pageSize, paginationModel.page]);

    useEffect(() => {
        getNumberOfBrands(query).then((res) => {
            setNumberOfBrands(res);
        });
        getListOfBrands(
            paginationModel.page,
            paginationModel.pageSize,
            query
        ).then((res) => {
            setData(res);
        });
    }, [query]);
    return (
        <Box>
            <BrandPageAppBar />
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
                            placeHolder="Tìm kiếm nhãn hiệu theo tên ..."
                        />
                        <DataGrid
                            rows={data}
                            columns={columns}
                            rowCount={numberOfBrands}
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
                <UpdateOrAddBrand
                    isUpdate={isUpdate}
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                    setIsUpdate={setIsUpdate}
                    onUpdate={updateListOfProducts}
                />
            ) : (
                <></>
            )}
        </Box>
    );
}
