import { Box, Button, CardMedia, TextField, Typography } from "@mui/material";
import MainBox from "../../../../../components/layout/MainBox";
import { Image } from "@mui/icons-material";
import AddVariantAppBar from "./AddVariantAppBar";
import { useEffect, useState } from "react";
import { ProductResponse, VariantRequest } from "../../ProductInterface";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../../../firebaseConfig";

type Props = {};

export default function AddVariant({}: Props) {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductResponse>({});
    const [newVariant, setNewVariant] = useState<VariantRequest>({});
    // const [image,setImage] =useState<string>("");

    useEffect(() => {
        fetch(`http://localhost:8080/v1/products/${id}`)
            .then((res) => res.json())
            .then((result) => {
                setProduct(result.data);
                setNewVariant({
                    name: result.data.name,
                    sku: "",
                    size: "",
                    color: "",
                    material: "",
                    imagePath: "",
                    initialPrice: 0,
                    priceForSale: 0,
                });
                console.log(result.data);
            });
    }, []);

    function handleVariantChange(e) {
        setNewVariant({ ...newVariant, [e.target.name]: e.target.value });
    }

    function handleAddNewVariant() {
        fetch(`http://localhost:8080/v1/products/${id}/variants/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({ ...newVariant }),
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                window.alert(result.message);
            });
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file: File | undefined = e.target.files
            ? Array.from(e.target.files).at(0)
            : undefined;
        if (file) {
            const storageRef = ref(storage, `variants/${file.name}`); 
            const uploadTask = uploadBytesResumable(storageRef, file); 

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    //Clearing snapshot cannot upload images
                    const progressPercent =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    console.error("Upload failed:", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setNewVariant({ ...newVariant, imagePath: url });
                    });
                }
            );
        }
    }

    return (
        <Box>
            <AddVariantAppBar id={id} submit={handleAddNewVariant} />
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
                            Thêm phiên bản cho {product?.name}
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
                            {product?.variants?.length > 0 ? (
                                product.variants.map((variant) => (
                                    <Box
                                        sx={{ padding: "3px" }}
                                        key={variant.id}
                                    >
                                        <Box
                                            sx={{
                                                // backgroundColor: "#08f",
                                                padding: "16px",
                                                height: "40px",
                                                display: "flex",
                                                gap: "10px",
                                                borderRadius: "3px",
                                            }}
                                        >
                                            {variant?.imagePath?.length > 0 ? (
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        padding: "0 10px",
                                                        width: 40,
                                                        height: 40,
                                                    }}
                                                    image={variant.imagePath}
                                                    alt="Paella dish"
                                                />
                                            ) : (
                                                <Image
                                                    color="disabled"
                                                    sx={{
                                                        padding: "0 10px",
                                                        width: 40,
                                                        height: 40,
                                                    }}
                                                />
                                            )}
                                            <Box>
                                                <Typography
                                                    fontSize={"0.9rem"}
                                                    // sx={{ color: "white" }}
                                                >
                                                    {[
                                                        variant.size ||
                                                            newVariant.size,
                                                        variant.color ||
                                                            newVariant.color,
                                                        variant.material ||
                                                            newVariant.material,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" - ")}
                                                </Typography>
                                                <Typography
                                                    fontSize={"0.9rem"}
                                                    // sx={{ color: "white" }}
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
                                        <TextField
                                            required
                                            label="Tên phiên bản"
                                            name="name"
                                            value={newVariant.name || ""}
                                            onChange={handleVariantChange}
                                            fullWidth
                                            size="small"
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Mã SKU"
                                            sx={{ width: "50%" }}
                                            value={newVariant.sku}
                                            name="sku"
                                            onChange={handleVariantChange}
                                            size="small"
                                            margin="normal"
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
                                        <Box
                                            sx={{
                                                mt: 2,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {newVariant?.imagePath?.length >
                                            0 ? (
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        borderRadius: 1,
                                                        width: 100,
                                                        height: 100,
                                                    }}
                                                    image={newVariant.imagePath}
                                                    alt="Paella dish"
                                                />
                                            ) : (
                                                <Image
                                                    color="disabled"
                                                    sx={{
                                                        width: 100,
                                                        height: 100,
                                                    }}
                                                />
                                            )}
                                            <Button
                                                variant="text"
                                                color="primary"
                                                sx={{
                                                    textTransform: "none",
                                                    position: "relative",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                        opacity: 0,
                                                        cursor: "pointer",
                                                    }}
                                                />
                                                Thay đổi ảnh
                                            </Button>
                                        </Box>
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
                                        Thuộc tính
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        padding: "16px",
                                        rowGap: "20px",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <TextField
                                        label="Kích cỡ"
                                        required={
                                            product.size.length > 0
                                                ? true
                                                : false
                                        }
                                        name="size"
                                        size="small"
                                        value={newVariant.size}
                                        onChange={handleVariantChange}
                                        sx={{ width: "48.5%" }}
                                    />

                                    <TextField
                                        label="Màu sắc"
                                        required={
                                            product.color.length > 0
                                                ? true
                                                : false
                                        }
                                        name="color"
                                        value={newVariant.color}
                                        onChange={handleVariantChange}
                                        size="small"
                                        sx={{ width: "48.5%" }}
                                    />

                                    <TextField
                                        label="Chất liệu"
                                        required={
                                            product.material.length > 0
                                                ? true
                                                : false
                                        }
                                        name="material"
                                        value={newVariant.material}
                                        onChange={handleVariantChange}
                                        size="small"
                                        sx={{ width: "48.5%" }}
                                    />
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
                                        gap: "20px",
                                    }}
                                >
                                    <TextField
                                        label="Giá bán"
                                        required
                                        size="small"
                                        value={newVariant.priceForSale}
                                        name="priceForSale"
                                        onChange={handleVariantChange}
                                        sx={{ width: "50%" }}
                                    />
                                    <TextField
                                        label="Giá nhập"
                                        required
                                        onChange={handleVariantChange}
                                        size="small"
                                        value={newVariant.initialPrice}
                                        name="initialPrice"
                                        sx={{ width: "50%" }}
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
