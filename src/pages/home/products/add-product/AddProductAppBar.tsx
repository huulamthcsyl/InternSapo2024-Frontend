import { Typography, Box, Button } from "@mui/material";
import MainAppBar from "../../../../components/layout/MainAppBar";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";

type Props = {
    submit: () => void;
};

export default function AddProductAppBar({ submit }: Props) {
    const navigate = useNavigate();
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
                        color="primary"
                        onClick={() => navigate("/products")}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submit}
                    >
                        Lưu
                    </Button>
                </Box>
            </Box>
        </MainAppBar>
    );
}
