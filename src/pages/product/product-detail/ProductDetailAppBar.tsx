import { Typography, Box, Button } from "@mui/material";
import MainAppBar from "../../../components/layout/MainAppBar";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";

type Props = {
    id: string | undefined;
};

export default function ProductDetailAppBar({ id }: Props) {
    const navigate = useNavigate();
    function handleDeleteProduct() {
        fetch(`http://localhost:8080/v1/products/${id}`, {
            method: "DELETE",
            headers: {
                // "Content-Type": "application/json",
                // Authorization: `Bearer ${user?.token}`,
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                window.alert(result.message);
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
                <Box
                    sx={{ display: "flex", gap: "20px" }}
                    onClick={() => navigate(`/products`)}
                >
                    <NavigateBefore
                        color="disabled"
                        sx={{ width: "30px", height: "30px" }}
                    />
                    <Typography color="textDisabled">
                        Quay lại danh sách sản phẩm
                    </Typography>
                </Box>
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
        </MainAppBar>
    );
}
