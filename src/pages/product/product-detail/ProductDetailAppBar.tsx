import { Box, Button } from "@mui/material";
import MainAppBar from "../../../components/layout/MainAppBar";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../../services/productAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
    id: string | undefined;
};

export default function ProductDetailAppBar({ id }: Props) {
    const navigate = useNavigate();
    function handleDeleteProduct() {
        deleteProduct(id)
            .then((res) => {
                toast.success("Xoá sản phẩm thành công");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }
    return (
        <MainAppBar>
            <Box
                sx={{
                    display: "flex",
                    flexGrow: "1",
                    justifyContent: "space-between",
                }}
            >
                <Button
                    onClick={() => navigate("/products")}
                    variant="text"
                    startIcon={
                        <NavigateBefore
                            color="disabled"
                            sx={{ width: "30px", height: "30px" }}
                        />
                    }
                    sx={{
                        textTransform: "none",
                        color: "rgba(0,0,0,0.38)",
                        fontSize: "1rem",
                    }}
                >
                    Quay lại danh sách sản phẩm
                </Button>
                <Box sx={{ display: "flex", gap: "20px" }}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDeleteProduct}
                    >
                        Xóa
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/products/${id}/edit`)}
                    >
                        Sửa sản phẩm
                    </Button>
                </Box>
            </Box>
            <ToastContainer hideProgressBar autoClose={3000} />
        </MainAppBar>
    );
}
