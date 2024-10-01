import {
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    Divider,
} from "@mui/material";
import MainBox from "../../components/layout/MainBox";
import ProductPageAppBar from "./ProductPageAppBar";
import { Add, Image } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import SearchField from "./SearchField";
import { useNavigate } from "react-router-dom";
import { viVN } from "@mui/x-date-pickers/locales";
import {
    getListOfProducts,
    getNumberOfProducts,
} from "../../services/productAPI";
import { ProductResponse } from "../../models/ProductInterface";

type Props = {};

export default function ProductPage({}: Props) {
    const [data, setData] = useState<ProductResponse[]>([]);
    const [numberOfProducts, setNumberOfProducts] = useState<number>(0);
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
                const firstImageUrl =
                    params.value && params.value.length > 0
                        ? params.value[0]
                        : "";
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
                                alt="Product"
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
            headerName: "Tên sản phẩm",
            width: 300,
        },
        {
            field: "categoryName",
            headerName: "Loại",
            width: 200,
        },
        {
            field: "brandName",
            headerName: "Nhãn hiệu",
            width: 200,
        },
        {
            field: "totalQuantity",
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
                return value ? new Date(value) : "";
            },
            width: 160,
        },
    ];

    useEffect(() => {
        getNumberOfProducts(query).then((res) => {
            setNumberOfProducts(res);
        });
        getListOfProducts(paginationModel.page, paginationModel.pageSize, query)
            .then((res) => {
                setData(res);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        getListOfProducts(
            paginationModel.page,
            paginationModel.pageSize,
            query
        ).then((res) => {
            setData(res);
        });
    }, [paginationModel.pageSize, paginationModel.page]);

    useEffect(() => {
        getNumberOfProducts(query).then((res) => {
            setNumberOfProducts(res);
        });
        getListOfProducts(
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
                <ProductPageAppBar />
                <MainBox>
                    <Box
                        sx={{
                            padding: "20px 24px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                </MainBox>
            </Box>
        );
    }
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
                                onClick={() => navigate("/products/categories")}
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
                                onClick={() => navigate("/products/brands")}
                            >
                                Nhãn hiệu
                            </Button>
                        </ButtonGroup>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            sx={{ textTransform: "none" }}
                            onClick={() => navigate("/products/create")}
                        >
                            Thêm sản phẩm
                        </Button>
                    </Box>
                    <Box sx={{ backgroundColor: "white" }}>
                        <SearchField
                            onKeyPress={setQuery}
                            placeHolder="Tìm kiếm sản phẩm theo tên ..."
                        />
                        <DataGrid
                            rows={data}
                            columns={columns}
                            rowCount={numberOfProducts}
                            {...data}
                            paginationMode="server"
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[10, 20, 30]}
                            localeText={customLocaleText}
                            onRowClick={(params) =>
                                navigate(`/products/${params.row.id}`)
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
