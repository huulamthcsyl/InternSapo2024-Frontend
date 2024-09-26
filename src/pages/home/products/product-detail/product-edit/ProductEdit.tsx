import {
    Box,
    Button,
    CardContent,
    CardMedia,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import ProductEditAppBar from "./ProductEditAppBar";
import MainBox from "../../../../../components/layout/MainBox";
import Add from "@mui/icons-material/Add";
import Cancel from "@mui/icons-material/Cancel";
import { AddCircle } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    BrandResponse,
    CategoryResponse,
    ProductRequest,
    VariantRequest,
} from "../../ProductInterface";
import Property from "../../Property";

type Props = {};

export default function ProductDetail({}: Props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductRequest>({});
    const [sizes, setSizes] = useState<string[]>([]);
    const [additionalSizes, setAdditionalSizes] = useState<string[]>([]);
    const [additionalColors, setAdditionalColors] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [materials, setMaterials] = useState<string[]>([]);
    const [additionalMaterials, setAdditionalMaterials] = useState<string[]>(
        []
    );
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [currentVariant, setCurrentVariant] = useState<{
        variant: VariantRequest;
        index: number;
    }>({
        variant: {
            name: "",
            sku: "",
            size: "",
            color: "",
            material: "",
            imagePath: "",
            initialPrice: 0,
            priceForSale: 0,
        },
        index: 0,
    });
    const [brands, setBrands] = useState<BrandResponse[]>([]);
    const [variants, setVariants] = useState<VariantRequest[]>([]);

    function handleProductChange(e) {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    function handleVariantChange(index, field, value) {
        console.log(index, field, value);
        const updatedVariants = [...variants];
        updatedVariants[index] = {
            ...updatedVariants[index],
            [field]: value,
        };
        setVariants(updatedVariants);
        if (index === currentVariant?.index) {
            setCurrentVariant({
                ...currentVariant,
                variant: updatedVariants[index],
            });
        }
    }

    function handleUpdateProduct() {
        fetch(`http://localhost:8080/v1/products/${id}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({ ...product, variants: variants }),
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                window.alert(result.message);
            });
    }

    useEffect(() => {
        fetch(`http://localhost:8080/v1/products/${id}`)
            .then((res) => res.json())
            .then((result) => {
                setProduct(result.data);
                setSizes(result.data.size);
                setColors(result.data.color);
                setMaterials(result.data.material);
                setCurrentVariant({
                    variant: result.data.variants[0],
                    index: 0,
                });
                setVariants(result.data.variants);
            });
        fetch(
            `http://localhost:8080/v1/products/categories?page=0&limit=10&query=`
        )
            .then((res) => res.json())
            .then((result) => {
                setCategories(result.data);
            });
        fetch(`http://localhost:8080/v1/products/brands?page=0&limit=10&query=`)
            .then((res) => res.json())
            .then((result) => {
                setBrands(result.data);
            });
    }, []);
    console.log(variants);
    console.log(currentVariant.index);
    return (
        <Box>
            <ProductEditAppBar id={id} submit={handleUpdateProduct} />
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
                            {product.name}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "24px" }}>
                        <Box sx={{ width: "70%" }}>
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
                                        Thông tin sản phẩm
                                    </Typography>
                                </Box>
                                <Box sx={{ padding: "16px" }}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="name"
                                        label="Tên sản phẩm"
                                        value={product.name}
                                        onChange={handleProductChange}
                                        margin="normal"
                                        size="small"
                                    />
                                    <TextField
                                        fullWidth
                                        multiline
                                        name="description"
                                        value={product.description}
                                        onChange={handleProductChange}
                                        rows={4}
                                        label="Mô tả sản phẩm"
                                        defaultValue="foo"
                                        margin="normal"
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
                                        padding: "16px",
                                        height: "27px",
                                        borderBottom: "1px solid #d9d9d9",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mt: "24px",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "20px" }}>
                                        Ảnh sản phẩm
                                    </Typography>
                                    <Button
                                        variant="text"
                                        sx={{ textTransform: "none" }}
                                    >
                                        Xoá tất cả
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        padding: "20px 25px",
                                        display: "flex",
                                        gap: "20px",
                                    }}
                                >
                                    <Button
                                        sx={{
                                            border: "1px dashed #d9d9d9",
                                            borderRadius: 1,
                                            width: 100,
                                            height: 100,
                                        }}
                                    >
                                        <Add sx={{ color: "black" }} />
                                    </Button>
                                    <Box sx={{ position: "relative" }}>
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
                                        <Cancel
                                            sx={{
                                                position: "absolute",
                                                flexGrow: 1,
                                                top: 0,
                                                right: 0,
                                                width: "15px",
                                                height: "15px",
                                                backgroundColor: "white",
                                                borderRadius: "50%",
                                            }}
                                            color="error"
                                        />
                                    </Box>

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
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mt: "24px",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "20px" }}>
                                        Thuộc tính
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        padding: "20px 25px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "20px",
                                        width: "70%",
                                    }}
                                >
                                    <Box sx={{ display: "flex" }}>
                                        <Typography
                                            fontWeight={"bold"}
                                            width={150}
                                        >
                                            Tên thuộc tính
                                        </Typography>
                                        <Typography
                                            fontWeight={"bold"}
                                            sx={{ flexGrow: 1 }}
                                        >
                                            Giá trị
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            fontSize={"0.9rem"}
                                            width={150}
                                        >
                                            Kích cỡ
                                        </Typography>
                                        <Property
                                            fixedBadges={sizes}
                                            badges={additionalSizes}
                                            setBadges={setAdditionalSizes}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            fontSize={"0.9rem"}
                                            width={150}
                                        >
                                            Màu sắc
                                        </Typography>
                                        <Property
                                            fixedBadges={colors}
                                            badges={additionalColors}
                                            setBadges={setAdditionalColors}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            fontSize={"0.9rem"}
                                            width={150}
                                        >
                                            Chất liệu
                                        </Typography>
                                        <Property
                                            fixedBadges={materials}
                                            badges={additionalMaterials}
                                            setBadges={setAdditionalMaterials}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                borderRadius: "5px",
                                backgroundColor: "white",
                                flexGrow: 1,
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
                                    Phân loại
                                </Typography>
                            </Box>
                            <Box sx={{ padding: "16px" }}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="category">
                                        Loại sản phẩm
                                    </InputLabel>
                                    <Select
                                        labelId="category"
                                        id="category"
                                        name="categoryId"
                                        label="Loại sản phẩm"
                                        value={
                                            product.categoryId !== undefined
                                                ? product.categoryId
                                                : ""
                                        }
                                        onChange={handleProductChange}
                                    >
                                        {categories?.map((category) => (
                                            <MenuItem
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="brand">
                                        Nhãn hiệu
                                    </InputLabel>
                                    <Select
                                        labelId="brand"
                                        id="brand"
                                        name="brandId"
                                        value={
                                            product.brandId !== undefined
                                                ? product.brandId
                                                : ""
                                        }
                                        onChange={handleProductChange}
                                    >
                                        {brands?.map((brand) => (
                                            <MenuItem
                                                key={brand.id}
                                                value={brand.id}
                                            >
                                                {brand.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography sx={{ fontSize: "20px" }}>
                                    Phiên bản
                                </Typography>
                                <Button></Button>
                            </Box>
                            {product?.variants?.length > 0 ? (
                                product.variants.map((variant, index) => (
                                    <Box
                                        sx={{ padding: "3px" }}
                                        key={variant.id}
                                        onClick={() =>
                                            setCurrentVariant({
                                                variant,
                                                index,
                                            })
                                        }
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
                                            <Box>
                                                <Typography
                                                    fontSize={"0.9rem"}
                                                    // sx={{ color: "white" }}
                                                >
                                                    {variant.name}
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
                            <Box
                                sx={{
                                    borderTop: "1px solid #d9d9d9",
                                    height: "60px",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    startIcon={
                                        <AddCircle
                                            sx={{ width: 20, height: 20 }}
                                            color="primary"
                                        />
                                    }
                                    sx={{ textTransform: "none" }}
                                    variant="text"
                                    onClick={() =>
                                        navigate(
                                            `/products/${id}/variants/create`
                                        )
                                    }
                                >
                                    Thêm phiên bản
                                </Button>
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
                                        <TextField
                                            required
                                            label="Tên phiên bản"
                                            value={
                                                currentVariant?.variant?.name
                                            }
                                            onChange={(e) =>
                                                handleVariantChange(
                                                    currentVariant?.index,
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            fullWidth
                                            size="small"
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Mã SKU"
                                            value={currentVariant?.variant?.sku}
                                            onChange={(e) =>
                                                handleVariantChange(
                                                    currentVariant?.index,
                                                    "sku",
                                                    e.target.value
                                                )
                                            }
                                            sx={{ width: "50%" }}
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
                                            <Button
                                                variant="text"
                                                color="primary"
                                                sx={{ textTransform: "none" }}
                                            >
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
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <FormControl
                                        sx={{ width: "48.5%" }}
                                        margin="normal"
                                        size="small"
                                    >
                                        <InputLabel id="category">
                                            Kích cỡ
                                        </InputLabel>
                                        <Select
                                            labelId="size"
                                            id="size"
                                            label="Kích cỡ"
                                            value={
                                                currentVariant?.variant
                                                    ?.size !== undefined
                                                    ? currentVariant?.variant
                                                          ?.size
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                handleVariantChange(
                                                    currentVariant?.index,
                                                    "size",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {[...sizes, ...additionalSizes].map(
                                                (size, index) => (
                                                    <MenuItem
                                                        value={size}
                                                        key={index}
                                                    >
                                                        {size}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl
                                        sx={{ width: "48.5%" }}
                                        margin="normal"
                                        size="small"
                                    >
                                        <InputLabel id="color">
                                            Màu sắc
                                        </InputLabel>
                                        <Select
                                            labelId="color"
                                            id="color"
                                            label="Màu sắc"
                                            value={
                                                currentVariant?.variant
                                                    ?.color !== undefined
                                                    ? currentVariant?.variant
                                                          ?.color
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                handleVariantChange(
                                                    currentVariant?.index,
                                                    "color",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {[
                                                ...colors,
                                                ...additionalColors,
                                            ].map((color, index) => (
                                                <MenuItem
                                                    value={color}
                                                    key={index}
                                                >
                                                    {color}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl
                                        sx={{ width: "48.5%" }}
                                        margin="normal"
                                        size="small"
                                    >
                                        <InputLabel id="material">
                                            Chất liệu
                                        </InputLabel>
                                        <Select
                                            labelId="material"
                                            id="material"
                                            label="Chất liệu"
                                            value={
                                                currentVariant?.variant
                                                    ?.material !== undefined
                                                    ? currentVariant?.variant
                                                          ?.material
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                handleVariantChange(
                                                    currentVariant?.index,
                                                    "material",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {[
                                                ...materials,
                                                ...additionalMaterials,
                                            ].map((material, index) => (
                                                <MenuItem
                                                    value={material}
                                                    key={index}
                                                >
                                                    {material}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                                        value={
                                            currentVariant?.variant
                                                ?.priceForSale
                                        }
                                        onChange={(e) =>
                                            handleVariantChange(
                                                currentVariant?.index,
                                                "priceForSale",
                                                e.target.value
                                            )
                                        }
                                        sx={{ width: "50%" }}
                                    />
                                    <TextField
                                        label="Giá nhập"
                                        required
                                        size="small"
                                        value={
                                            currentVariant?.variant
                                                ?.initialPrice
                                        }
                                        onChange={(e) =>
                                            handleVariantChange(
                                                currentVariant?.index,
                                                "initialPrice",
                                                e.target.value
                                            )
                                        }
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
