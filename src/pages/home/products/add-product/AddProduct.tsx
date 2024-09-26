import {
    Box,
    Button,
    CardMedia,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import MainBox from "../../../../components/layout/MainBox";
import Add from "@mui/icons-material/Add";
import Cancel from "@mui/icons-material/Cancel";
import AddProductAppBar from "./AddProductAppBar";
import { useEffect, useState } from "react";
import {
    BrandResponse,
    CategoryResponse,
    ProductRequest,
    VariantRequest,
} from "../ProductInterface";
import Property from "../Property";

type Props = {};

export default function AddProduct({}: Props) {
    const [newProduct, setNewProduct] = useState<ProductRequest>({
        name: "",
        categoryId: 0,
        brandId: 0,
        description: "",
        imagePath: [],
        createdOn: new Date(),
        updatedOn: new Date(),
        variants: [],
    });
    const [priceForSale, setPriceForSale] = useState(0);
    const [initialPrice, setInitialPrice] = useState(0);
    const [sizes, setSizes] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [materials, setMaterials] = useState<string[]>([]);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [brands, setBrands] = useState<BrandResponse[]>([]);
    const [variants, setVariants] = useState<VariantRequest[]>([]);
    const [nameError, setNameError] = useState<boolean>(false);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    function handleDataChange(e) {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === "name" && value.trim() === "") {
            setNameError(true);
        } else {
            setNameError(false);
        }
    }

    function handleVariantChange(index, field, value) {
        const updatedVariants = [...variants];
        updatedVariants[index] = {
            ...updatedVariants[index],
            [field]: value,
        };
        setVariants(updatedVariants);
    }

    function handleAddNewProduct() {
        if (newProduct.name.trim() !== "") {
            // const formData = new FormData();

            // formData.append("name", newProduct.name);
            // formData.append("categoryId", newProduct.categoryId.toString());
            // formData.append("brandId", newProduct.brandId.toString());
            // formData.append("description", newProduct.description);
            // formData.append("createdOn", newProduct.createdOn.toISOString());
            // formData.append("updatedOn", newProduct.updatedOn.toISOString());

            // // Append product images to FormData
            // selectedImages.forEach((file) => {
            //     formData.append(`imagePath`, file);
            // });

            // // Append variants to FormData
            // variants.forEach((variant) => {
            //     formData.append(`variants`, JSON.stringify(variant));
            // });
            // for (let pair of formData.entries()) {
            //     console.log(pair[0] + ": " + pair[1]);
            // }
            fetch(`http://localhost:8080/v1/products/create`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    // Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                    ...newProduct,
                    variants: { ...variants },
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((result) => {
                    window.alert(result.message);
                });
        } else {
            window.alert("Tên sản phẩm không được trống.");
        }
    }

    function handleImageChange(e) {
        const files: File[] = Array.from(e.target.files);
        const updatedImages: File[] = files.filter(
            (file) => new Blob([file], { type: file.type })
        );
        setSelectedImages([...selectedImages, ...updatedImages]);
    }

    function handleRemoveImage(indexToRemove) {
        setSelectedImages((prev) => {
            return prev.filter((_, index) => index !== indexToRemove);
        });
    }
    console.log(newProduct);

    useEffect(() => {
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

    useEffect(() => {
        if (sizes.length + colors.length + materials.length > 0) {
            const updatedVariants: VariantRequest[] = [];
            const validSizes = sizes.length ? sizes : [""];
            const validColors = colors.length ? colors : [""];
            const validMaterials = materials.length ? materials : [""];
            for (let i = 0; i < validSizes.length; i++) {
                for (let j = 0; j < validColors.length; j++) {
                    for (let k = 0; k < validMaterials.length; k++) {
                        const variant: VariantRequest = {
                            name:
                                newProduct.name +
                                    [sizes[i], colors[j], materials[k]]
                                        .filter(Boolean)
                                        .join(" - ") || "",
                            sku: "",
                            size: sizes[i] || "",
                            color: colors[j] || "",
                            material: materials[k] || "",
                            imagePath: "",
                            initialPrice: 0,
                            priceForSale: 0,
                        };
                        console.log(variant);
                        updatedVariants.push(variant);
                    }
                }
            }
            setVariants(updatedVariants);
        } else {
            setVariants([]);
        }
    }, [sizes, materials, colors, newProduct.name]);

    return (
        <Box>
            <AddProductAppBar submit={handleAddNewProduct} />
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
                            Thêm sản phẩm
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
                                    <FormControl required={true} fullWidth>
                                        <TextField
                                            name="name"
                                            label="Tên sản phẩm"
                                            value={newProduct.name}
                                            onChange={handleDataChange}
                                            error={nameError}
                                            helperText={
                                                nameError
                                                    ? "Tên sản phẩm là bắt buộc"
                                                    : ""
                                            }
                                            margin="normal"
                                            size="small"
                                        />
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            name="description"
                                            label="Mô tả sản phẩm"
                                            value={newProduct.description}
                                            onChange={handleDataChange}
                                            margin="normal"
                                        />
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
                                            position: "relative",
                                            overflow: "hidden",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Add sx={{ color: "black" }} />
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
                                    </Button>
                                    {selectedImages.map((img, index) => (
                                        <Box
                                            sx={{
                                                position: "relative",
                                                "&:hover .remove-icon": {
                                                    visibility: "visible",
                                                },
                                                cursor: "pointer",
                                            }}
                                            key={index}
                                        >
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    borderRadius: 1,
                                                    width: 100,
                                                    height: 100,
                                                }}
                                                image={URL.createObjectURL(img)}
                                            />
                                            <Cancel
                                                className="remove-icon"
                                                sx={{
                                                    position: "absolute",
                                                    flexGrow: 1,
                                                    visibility: "collapse",
                                                    top: 0,
                                                    right: 0,
                                                    width: "15px",
                                                    height: "15px",
                                                    backgroundColor: "white",
                                                    borderRadius: "50%",
                                                }}
                                                color="error"
                                                onClick={() =>
                                                    handleRemoveImage(index)
                                                }
                                            />
                                        </Box>
                                    ))}
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
                                        size="small"
                                        value={priceForSale}
                                        onChange={(e) =>
                                            setPriceForSale(
                                                parseInt(e.target.value)
                                            )
                                        }
                                        sx={{ width: "50%" }}
                                    />
                                    <TextField
                                        label="Giá nhập"
                                        size="small"
                                        value={initialPrice}
                                        onChange={(e) =>
                                            setInitialPrice(
                                                parseInt(e.target.value)
                                            )
                                        }
                                        sx={{ width: "50%" }}
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
                                            badges={sizes}
                                            setBadges={setSizes}
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
                                            badges={colors}
                                            setBadges={setColors}
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
                                            badges={materials}
                                            setBadges={setMaterials}
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
                                            newProduct.categoryId !== undefined
                                                ? newProduct.categoryId
                                                : ""
                                        }
                                        onChange={handleDataChange}
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
                                            newProduct.brandId !== undefined
                                                ? newProduct.brandId
                                                : ""
                                        }
                                        onChange={handleDataChange}
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
                    {variants.length > 0 ? (
                        <Box
                            sx={{
                                mt: "24px",
                                borderRadius: "5px",
                                backgroundColor: "white",
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
                            {variants?.length > 0 ? (
                                <Box sx={{ padding: "16px" }}>
                                    <TableContainer component={Paper}>
                                        <Table
                                            sx={{ minWidth: 650 }}
                                            aria-label="simple table"
                                        >
                                            <TableHead
                                                sx={{
                                                    backgroundColor: "#F4F6F8",
                                                }}
                                            >
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell width={"400px"}>
                                                        Tên phiên bản
                                                    </TableCell>
                                                    <TableCell
                                                        width={"200px"}
                                                        align="center"
                                                    >
                                                        Mã SKU
                                                    </TableCell>
                                                    <TableCell
                                                        width={"200px"}
                                                        align="center"
                                                    >
                                                        Giá bán
                                                    </TableCell>
                                                    <TableCell
                                                        width={"200px"}
                                                        align="center"
                                                    >
                                                        Giá nhập
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {variants.map(
                                                    (variant, index) => (
                                                        <TableRow
                                                            sx={{
                                                                "&:last-child td, &:last-child th":
                                                                    {
                                                                        border: 0,
                                                                    },
                                                            }}
                                                            key={index}
                                                        >
                                                            <TableCell>
                                                                <CardMedia
                                                                    component="img"
                                                                    sx={{
                                                                        width: 40,
                                                                        height: 40,
                                                                    }}
                                                                    image="https://firebasestorage.googleapis.com/v0/b/group1-sapo.appspot.com/o/products%2Fbachmahoangtu.jpg?alt=media&token=8bd45827-b5d6-49d6-81a9-91c856472dd7"
                                                                    alt="Paella dish"
                                                                />
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                            >
                                                                {[
                                                                    variant.size,
                                                                    variant.color,
                                                                    variant.material,
                                                                ]
                                                                    .filter(
                                                                        Boolean
                                                                    )
                                                                    .join(
                                                                        " - "
                                                                    )}
                                                            </TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    value={
                                                                        variant.sku ||
                                                                        ""
                                                                    }
                                                                    size="small"
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        handleVariantChange(
                                                                            index,
                                                                            "sku",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    value={
                                                                        variant.priceForSale
                                                                    }
                                                                    size="small"
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        handleVariantChange(
                                                                            index,
                                                                            "priceForSale",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    value={
                                                                        variant.initialPrice
                                                                    }
                                                                    size="small"
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        handleVariantChange(
                                                                            index,
                                                                            "initialPrice",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            ) : (
                                <></>
                            )}
                        </Box>
                    ) : (
                        <></>
                    )}
                </Box>
            </MainBox>
        </Box>
    );
}
