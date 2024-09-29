import { Typography, Box, TextField, Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import {
    BrandRequest,
    BrandResponse,
} from "../../../services/ProductInterface";
import "react-toastify/dist/ReactToastify.css";
import {
    createBrand,
    deleteBrand,
    updateBrand,
} from "../../../services/brandAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
    isUpdate: number;
    setIsUpdate: React.Dispatch<React.SetStateAction<number>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedBrand: any;
    setSelectedBrand: React.Dispatch<
        React.SetStateAction<BrandResponse | null>
    >;
    onUpdate: () => void;
};

export default function UpdateOrAddBrand({
    isUpdate,
    setIsUpdate,
    selectedBrand,
    setSelectedBrand,
    onUpdate,
}: Props) {
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [form, setForm] = useState<BrandRequest>(
        { ...selectedBrand } || { name: "", code: "", description: "" }
    );
    function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    function handleUpdateBrand() {
        updateBrand(form.id, form)
            .then((res) => {
                toast.success("Cập nhật nhãn hiệu thành công", {
                    position: "top-center",
                });
                onUpdate();
                setSelectedBrand(null);
                setIsUpdate(0);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }

    function handleCreateBrand() {
        createBrand(form)
            .then((res) => {
                toast.success("Tạo nhãn hiệu thành công");
                onUpdate();
                setSelectedBrand(null);
                setIsUpdate(0);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }

    function handleDeleteBrand() {
        deleteBrand(form.id)
            .then((res) => {
                toast.success("Xóa nhãn hiệu thành công");
                onUpdate();
                setSelectedBrand(null);
                setIsUpdate(0);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }

    function backToListBrands() {
        setIsUpdate(0);
        setSelectedBrand(null);
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
                                Thêm mới nhãn hiệu
                            </Typography>
                        ) : (
                            <Typography variant="h5">
                                Cập nhật nhãn hiệu
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
                            label="Tên nhãn hiệu"
                            onChange={handleFormChange}
                            margin="normal"
                        />
                        <TextField
                            sx={{ width: "50%" }}
                            label="Mã nhãn hiệu"
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
                            onClick={backToListBrands}
                        >
                            Thoát
                        </Button>
                        {isUpdate === 1 ? (
                            <Button
                                variant="contained"
                                onClick={handleUpdateBrand}
                            >
                                Lưu
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleCreateBrand}
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
                        <Typography variant="h5">Xóa nhãn hiệu</Typography>
                        <Close color="disabled" />
                    </Box>
                    <Typography>
                        Thao tác này sẽ xóa nhãn hiệu bạn đã chọn. Thao tác này
                        không thể khôi phục.
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
                            onClick={backToListBrands}
                        >
                            Thoát
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeleteBrand}
                        >
                            Xóa
                        </Button>
                    </Box>
                </Box>
            )}
            <ToastContainer hideProgressBar autoClose={3000} />
        </Box>
    );
}
