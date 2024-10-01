import { Box, CircularProgress } from "@mui/material";
import MainBox from "../../../components/layout/MainBox";
import { Image } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VariantPageAppBar from "./VariantPageAppBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchField from "../SearchField";
import {
    getListOfVariants,
    getNumberOfVariants,
} from "../../../services/productAPI";
import { VariantResponse } from "../../../models/ProductInterface";

type Props = {};

export default function VariantPage({}: Props) {
    const [data, setData] = useState<VariantResponse[]>([]);
    const [numberOfVariants, setNumberOfVariants] = useState<number>(0);
    const [query, setQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const navigate = useNavigate();
    const customLocaleText = {
        MuiTablePagination: {
            labelRowsPerPage: "Số hàng mỗi trang:",
            labelDisplayedRows: ({
                from,
                to,
                count,
            }: {
                from: number;
                to: number;
                count: number;
            }) =>
                `${from}-${to} trên tổng số ${count !== -1 ? count : `nhiều hơn ${to}`}`,
        },
    };
    const columns: GridColDef[] = [
        {
            field: "imagePath",
            headerName: "Ảnh",
            renderCell: (params) => {
                const firstImageUrl = params.value;
                return (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        {firstImageUrl ? (
                            <img
                                src={firstImageUrl}
                                alt="Variant"
                                style={{ width: 30, height: 30 }}
                            />
                        ) : (
                            <Image color="disabled" />
                        )}
                    </div>
                );
            },
            width: 100,
        },
        {
            field: "name",
            headerName: "Tên phiên bản",
            width: 300,
        },
        {
            field: "sku",
            headerName: "Mã SKU",
            width: 180,
        },

        {
            field: "quantity",
            headerName: "Tồn kho",
            width: 160,
            valueGetter: (value) => {
                return value ? value : 0;
            },
        },
        {
            field: "createdOn",
            headerName: "Ngày khởi tạo",
            type: "date",
            valueGetter: (value) => {
                // Assuming the value is a string or timestamp and needs to be transformed into a Date object
                return value ? new Date(value) : "";
            },
            width: 160,
        },
        {
            field: "priceForSale",
            headerName: "Giá bán",
            width: 150,
            align: "right",
        },
        {
            field: "initialPrice",
            headerName: "Giá nhập",
            width: 150,
            align: "right",
        },
    ];

    useEffect(() => {
        getNumberOfVariants(query).then((res) => {
            setNumberOfVariants(res);
        });
        getListOfVariants(paginationModel.page, paginationModel.pageSize, query)
            .then((res) => {
                setData(res);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        getListOfVariants(
            paginationModel.page,
            paginationModel.pageSize,
            query
        ).then((res) => {
            setData(res);
        });
    }, [paginationModel.pageSize, paginationModel.page]);

    useEffect(() => {
        getNumberOfVariants(query).then((res) => {
            setNumberOfVariants(res);
        });
        getListOfVariants(
            paginationModel.page,
            paginationModel.pageSize,
            query
        ).then((res) => {
            setData(res);
        });
    }, [query]);

    if (loading) {
        return (
            <Box>
                <VariantPageAppBar />
                <MainBox>
                    <Box
                        sx={{
                            padding: "20px 24px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress style={{ zIndex: 10000 }} />
                    </Box>
                </MainBox>
            </Box>
        );
    }

    return (
        <Box>
            <VariantPageAppBar />
            <MainBox>
                <Box sx={{ padding: "20px 24px", backgroundColor: "#F0F1F1" }}>
                    <Box sx={{ backgroundColor: "white" }}>
                        <SearchField
                            onKeyPress={setQuery}
                            placeHolder="Tìm kiếm phiên bản theo tên, mã SKU ..."
                        />
                        <DataGrid
                            rows={data}
                            columns={columns}
                            rowCount={numberOfVariants}
                            {...data}
                            paginationMode="server"
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[10, 20, 30]}
                            localeText={customLocaleText}
                            onRowClick={(params) =>
                                navigate(`/products/${params.row.productId}`)
                            }
                            // checkboxSelection
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
