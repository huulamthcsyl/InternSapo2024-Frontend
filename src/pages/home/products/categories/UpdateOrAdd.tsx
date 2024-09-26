import { Typography, Box, TextField, Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { CategoryRequest, CategoryResponse } from "../ProductInterface";
import { useNavigate } from "react-router-dom";

type Props = {
    isUpdate: number;
    setIsUpdate: React.Dispatch<React.SetStateAction<number>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedCategory: any;
    setSelectedCategory: React.Dispatch<
        React.SetStateAction<CategoryResponse | null>
    >;
    onUpdate: () => void;
};

export default function UpdateOrAdd({
    isUpdate,
    setIsUpdate,
    selectedCategory,
    setSelectedCategory,
    onUpdate,
}: Props) {
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [form, setForm] = useState<CategoryRequest>(
        { ...selectedCategory } || { name: "", code: "", description: "" }
    );
    function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    function handleUpdateCategory() {
        fetch(`http://localhost:8080/v1/products/categories/${form.id}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({ ...form }),
        })
            .then((res) => {
                if (res.status === 200) {
                    onUpdate();
                    setSelectedCategory(null);
                    setIsUpdate(0);
                }
                return res.json();
            })
            .then((result) => {
                window.alert(result.message);
            });
    }

    function handleCreateCategory() {
        fetch(`http://localhost:8080/v1/products/categories/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({ ...form }),
        })
            .then((res) => {
                if (res.status === 200) {
                    onUpdate();
                    setSelectedCategory(null);
                    setIsUpdate(0);
                }
                return res.json();
            })
            .then((result) => {
                window.alert(result.message);
            });
    }

    function handleDeleteCategory() {
        fetch(`http://localhost:8080/v1/products/categories/${form.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${user?.token}`,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    onUpdate();
                    setSelectedCategory(null);
                    setIsUpdate(0);
                }
                return res.json();
            })
            .then((result) => {
                window.alert(result.message);
            });
    }

    function backToListCategories() {
        setIsUpdate(0);
        setSelectedCategory(null);
    }
    return (
        <Box
            sx={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {!openConfirmDialog ? (
                <Box
                    sx={{
                        backgroundColor: "white",
                        width: "600px",
                        height: "auto",
                        padding: "10px 30px 30px 30px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        border: "1px solid black",
                        borderRadius: "5px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px 0",
                            borderBottom: "1px solid #d9d9d9",
                        }}
                    >
                        {isUpdate === 2 ? (
                            <Typography variant="h5">
                                Thêm mới loại sản phẩm
                            </Typography>
                        ) : (
                            <Typography variant="h5">
                                Cập nhật loại sản phẩm
                            </Typography>
                        )}
                        <Close color="disabled" />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "20px",
                        }}
                    >
                        <TextField
                            sx={{ width: "50%" }}
                            value={form.name}
                            required={true}
                            name="name"
                            size="small"
                            label="Tên loại sản phẩm"
                            onChange={handleFormChange}
                            margin="normal"
                        />
                        <TextField
                            sx={{ width: "50%" }}
                            label="Mã loại"
                            name="code"
                            value={form.code}
                            size="small"
                            onChange={handleFormChange}
                            margin="normal"
                        />
                    </Box>
                    <TextField
                        fullWidth
                        multiline
                        name="description"
                        value={form.description}
                        rows={4}
                        label="Ghi chú"
                        onChange={handleFormChange}
                        margin="normal"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "25px",
                        }}
                    >
                        {isUpdate === 1 ? (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => setOpenConfirmDialog(true)}
                            >
                                Xóa
                            </Button>
                        ) : (
                            <></>
                        )}
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={backToListCategories}
                        >
                            Thoát
                        </Button>
                        {isUpdate === 1 ? (
                            <Button
                                variant="contained"
                                onClick={handleUpdateCategory}
                            >
                                Lưu
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleCreateCategory}
                            >
                                Thêm
                            </Button>
                        )}
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        backgroundColor: "white",
                        width: "600px",
                        height: "auto",
                        padding: "10px 30px 30px 30px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        border: "1px solid black",
                        borderRadius: "5px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px 0",
                            borderBottom: "1px solid #d9d9d9",
                        }}
                    >
                        <Typography variant="h5">Xóa loại sản phẩm</Typography>
                        <Close color="disabled" />
                    </Box>
                    <Typography>
                        Thao tác này sẽ xóa loại sản phẩm bạn đã chọn. Thao tác
                        này không thể khôi phục.
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "25px",
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={backToListCategories}
                        >
                            Thoát
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeleteCategory}
                        >
                            Xóa
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
