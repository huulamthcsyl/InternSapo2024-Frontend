import { Box, Button, ButtonGroup, Divider, InputBase } from "@mui/material";
import MainBox from "../../../components/layout/MainBox";
import ProductPageAppBar from "./ProductPageAppBar";
import Search from "@mui/icons-material/Search";
import { Add, Image } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import SearchField from "./SearchField";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function ProductPage({}: Props) {
    const [data, setData] = useState([]);
    const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
    const [query, setQuery] = useState("");
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const navigate = useNavigate();
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
                            <Image />
                        )}
                    </div>
                );
            },
            width: 70,
        },
        {
            field: "name",
            headerName: "Tên sản phẩm",
            width: 130,
        },
        {
            field: "categoryName",
            headerName: "Loại",
            width: 130,
        },
        {
            field: "brandName",
            headerName: "Nhãn hiệu",
            width: 90,
        },
        {
            field: "totalQuantity",
            headerName: "Tồn kho",
            width: 160,
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
    ];

    function getListOfProducts() {
        fetch(
            `http://localhost:8080/v1/products?page=${paginationModel.page}&limit=${paginationModel.pageSize}&query=${query}`
        )
            .then((res) => res.json())
            .then((result) => {
                setData(result.data);
            });
    }

    function getTotalNumberOfProducts() {
        fetch(`http://localhost:8080/v1/products/total-products?query=${query}`)
            .then((res) => res.json())
            .then((result) => {
                setTotalNumberOfProducts(result.data);
            });
    }

    useEffect(() => {
        getListOfProducts();
    }, [paginationModel.pageSize, paginationModel.page]);

    useEffect(() => {
        getTotalNumberOfProducts();
        getListOfProducts();
    }, [query]);

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
                        <SearchField onKeyPress={setQuery} />
                        <DataGrid
                            rows={data}
                            columns={columns}
                            rowCount={totalNumberOfProducts}
                            {...data}
                            paginationMode="server"
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[10, 20, 30]}
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
