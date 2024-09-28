import { Typography, Box, Button } from "@mui/material";
import MainAppBar from "../../../components/layout/MainAppBar";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function BrandPageAppBar({}: Props) {
    const navigate = useNavigate();
    return (
        <MainAppBar>
            <Box sx={{ display: "flex", gap: "20px" }}>
                <Button
                    onClick={() => navigate("/products")}
                    variant="text"
                    startIcon={
                        <NavigateBefore
                            color="disabled"
                            sx={{ width: "30px", height: "30px" }}
                        />
                    }
                >
                    Quay lại danh sách sản phẩm
                </Button>
            </Box>
        </MainAppBar>
    );
}
