import { Box, CardMedia, TextField, Typography } from "@mui/material";
import ProductDetailAppBar from "./ProductDetailAppBar";
import MainBox from "../../../../components/layout/MainBox";
import LabelInfo from "./LabelInfo";

type Props = {};

export default function ProductDetail({}: Props) {
    return (
        <Box>
            <ProductDetailAppBar />
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
                                        info="Áo khoác"
                                    />
                                    <LabelInfo
                                        label="Ngày khởi tạo"
                                        info="01/01/2024 10:00"
                                    />
                                    <LabelInfo
                                        label="Nhãn hiệu"
                                        info="Uniqlo"
                                    />
                                    <LabelInfo
                                        label="Ngày cập nhật cuối"
                                        info="01/01/2024 12:00"
                                    />
                                    <Box sx={{ width: "100%" }}>
                                        <Typography
                                            marginBottom={"10px"}
                                            fontSize={"0.9rem"}
                                        >
                                            Mô tả sản phẩm
                                        </Typography>
                                        <TextField
                                            rows={3}
                                            multiline
                                            disabled
                                            defaultValue={"Hàng chất lượng cao"}
                                            sx={{
                                                width: "100%",
                                                fontSize: "0.9rem",
                                            }}
                                        />
                                    </Box>
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
                            <Box sx={{ padding: "3px" }}>
                                <Box
                                    sx={{
                                        backgroundColor: "#08f",
                                        padding: "16px",
                                        height: "40px",
                                        display: "flex",
                                        gap: "10px",
                                        borderRadius: "3px",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            padding: "0 10px",
                                            width: 40,
                                            height: 40,
                                        }}
                                        image="https://firebasestorage.googleapis.com/v0/b/group1-sapo.appspot.com/o/products%2Fbachmahoangtu.jpg?alt=media&token=8bd45827-b5d6-49d6-81a9-91c856472dd7"
                                        alt="Paella dish"
                                    />
                                    <Box>
                                        <Typography
                                            fontSize={"0.9rem"}
                                            sx={{ color: "white" }}
                                        >
                                            Áo khoác Chino thời thượng - M -
                                            Trắng
                                        </Typography>
                                        <Typography
                                            fontSize={"0.9rem"}
                                            sx={{ color: "white" }}
                                        >
                                            Tồn kho: 9
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ padding: "3px" }}>
                                <Box
                                    sx={{
                                        padding: "16px",
                                        height: "40px",
                                        display: "flex",
                                        gap: "10px",
                                        borderRadius: "3px",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            padding: "0 10px",
                                            width: 40,
                                            height: 40,
                                        }}
                                        image="https://firebasestorage.googleapis.com/v0/b/group1-sapo.appspot.com/o/products%2Fbachmahoangtu.jpg?alt=media&token=8bd45827-b5d6-49d6-81a9-91c856472dd7"
                                        alt="Paella dish"
                                    />
                                    <Box>
                                        <Typography fontSize={"0.9rem"}>
                                            Áo khoác Chino thời thượng - M -
                                            Trắng
                                        </Typography>
                                        <Typography
                                            fontSize={"0.9rem"}
                                            color="textDisabled"
                                        >
                                            Tồn kho: 9
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
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
                                            info="Áo khoác Chino thời thượng - M - Trắng"
                                        />
                                        <LabelInfo
                                            label="Mã SKU"
                                            info="PVN00001"
                                        />
                                        <LabelInfo label="Kích cỡ" info="M" />
                                        <LabelInfo
                                            label="Màu sắc"
                                            info="Trắng"
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                borderRadius: 1,
                                                width: 140,
                                                height: 140,
                                            }}
                                            image="https://firebasestorage.googleapis.com/v0/b/group1-sapo.appspot.com/o/products%2Fbachmahoangtu.jpg?alt=media&token=8bd45827-b5d6-49d6-81a9-91c856472dd7"
                                            alt="Paella dish"
                                        />
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
                                    <LabelInfo label="Giá bán" info="480,000" />
                                    <LabelInfo
                                        label="Giá nhập"
                                        info="400,000"
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
