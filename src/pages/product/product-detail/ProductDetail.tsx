import { Box, CardMedia, TextField, Typography } from "@mui/material";
import ProductDetailAppBar from "./ProductDetailAppBar";
import MainBox from "../../../components/layout/MainBox";
import LabelInfo from "./LabelInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductResponse, VariantResponse } from "../ProductInterface";
import { Image } from "@mui/icons-material";
import { formatCurrency } from "../../../utils/formatCurrency";

type Props = {};

export default function ProductDetail({}: Props) {
    const { id } = useParams();
    const [data, setData] = useState<ProductResponse>({});
    const [currentVariant, setCurrentVariant] = useState<VariantResponse>({});
    useEffect(() => {
        fetch(`http://localhost:8080/v1/products/${id}`)
            .then((res) => res.json())
            .then((result) => {
                setData(result.data);
                setCurrentVariant(result.data.variants[0]);
            });
    }, []);

    return (
        <Box>
            <ProductDetailAppBar id={id} />
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
                            {data?.name}
                        </Typography>
                    </Box>
                    <Box>
                        <Box
                            sx={{
                                borderRadius: "5px",
                                backgroundColor: "white",
                                width: "100%",
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
                            <Box sx={{ display: "flex", padding: "16px" }}>
                                <Box
                                    sx={{
                                        width: "60%",
                                        display: "flex",
                                        flexWrap: "wrap",
                                        rowGap: "10px",
                                    }}
                                >
                                    <LabelInfo
                                        label="Loại sản phẩm"
                                        info={data?.categoryName}
                                    />
                                    <LabelInfo
                                        label="Ngày khởi tạo"
                                        info={new Date(
                                            data?.createdOn
                                        ).toLocaleString()}
                                    />
                                    <LabelInfo
                                        label="Nhãn hiệu"
                                        info={data?.brandName}
                                    />
                                    <LabelInfo
                                        label="Ngày cập nhật cuối"
                                        info={new Date(
                                            data?.updatedOn
                                        ).toLocaleString()}
                                    />
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        id="outlined-uncontrolled"
                                        label="Mô tả sản phẩm"
                                        value={data?.description}
                                        margin="normal"
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        flexGrow: "1",
                                        padding: "20px 40px",
                                        display: "flex",
                                        gap: "20px",
                                        justifyContent: "center",
                                    }}
                                >
                                    {data?.imagePath?.length > 0 ? (
                                        data.imagePath.map((path, index) => (
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    borderRadius: 1,
                                                    width: 100,
                                                    height: 100,
                                                }}
                                                key={index}
                                                image={path}
                                            />
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            height: "60px",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography sx={{ fontSize: "20px" }}>
                            Chi tiết phiên bản
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "24px" }}>
                        <Box
                            sx={{
                                borderRadius: "5px",
                                backgroundColor: "white",
                                width: "35%",
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
                                    Phiên bản
                                </Typography>
                            </Box>
                            {data?.variants?.length > 0 ? (
                                data.variants.map((variant) => (
                                    <Box
                                        sx={{ padding: "3px" }}
                                        key={variant.id}
                                        onClick={() =>
                                            setCurrentVariant(variant)
                                        }
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor:
                                                    currentVariant.id ==
                                                    variant.id
                                                        ? "#1976d2"
                                                        : "#fff",
                                                padding: "16px",
                                                height: "40px",
                                                display: "flex",
                                                gap: "10px",
                                                borderRadius: "3px",
                                            }}
                                        >
                                            {variant.imagePath.length > 0 ? (
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        padding: "0 10px",
                                                        width: 40,
                                                        height: 40,
                                                    }}
                                                    image={variant.imagePath}
                                                />
                                            ) : (
                                                <Image
                                                    sx={{
                                                        padding: "0 10px",
                                                        width: 40,
                                                        height: 40,
                                                        color:
                                                            currentVariant.id ==
                                                            variant.id
                                                                ? "#fff"
                                                                : "#d9d9d9",
                                                    }}
                                                />
                                            )}
                                            <Box>
                                                <Typography
                                                    fontSize={"0.9rem"}
                                                    sx={{
                                                        color:
                                                            currentVariant.id ==
                                                            variant.id
                                                                ? "#fff"
                                                                : "#000",
                                                    }}
                                                >
                                                    {[
                                                        variant.size,
                                                        variant.color,
                                                        variant.material,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" - ") || ""}
                                                </Typography>
                                                <Typography
                                                    fontSize={"0.9rem"}
                                                    sx={{
                                                        color:
                                                            currentVariant.id ==
                                                            variant.id
                                                                ? "#fff"
                                                                : "#000",
                                                    }}
                                                >
                                                    Tồn kho: {variant.quantity}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <></>
                            )}
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
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
                                        Thông tin chi tiết phiên bản
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Box
                                        sx={{
                                            width: "60%",
                                            padding: "16px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "10px",
                                        }}
                                    >
                                        <LabelInfo
                                            label="Tên phiên bản"
                                            info={currentVariant?.name || ""}
                                        />
                                        <LabelInfo
                                            label="Mã SKU"
                                            info={currentVariant?.sku || ""}
                                        />
                                        {currentVariant?.size ? (
                                            <LabelInfo
                                                label="Kích cỡ"
                                                info="M"
                                            />
                                        ) : (
                                            <></>
                                        )}
                                        {currentVariant?.color ? (
                                            <LabelInfo
                                                label="Màu sắc"
                                                info={currentVariant.color}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                        {currentVariant?.material ? (
                                            <LabelInfo
                                                label="Chất liệu"
                                                info={currentVariant.material}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </Box>
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "20px",
                                        }}
                                    >
                                        {currentVariant?.imagePath?.length >
                                        0 ? (
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    borderRadius: 1,
                                                    width: 120,
                                                    height: 120,
                                                }}
                                                image={
                                                    currentVariant?.imagePath
                                                }
                                                alt="Paella dish"
                                            />
                                        ) : (
                                            <Image
                                                color="disabled"
                                                sx={{
                                                    width: 120,
                                                    height: 120,
                                                }}
                                            />
                                        )}
                                    </Box>
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
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <LabelInfo
                                        label="Giá bán"
                                        info={formatCurrency(
                                            currentVariant?.priceForSale
                                        )}
                                    />
                                    <LabelInfo
                                        label="Giá nhập"
                                        info={formatCurrency(
                                            currentVariant?.initialPrice
                                        )}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </MainBox>
        </Box>
    );
}
