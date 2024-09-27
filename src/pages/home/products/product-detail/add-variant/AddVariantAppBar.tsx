import { Typography, Box, Button } from "@mui/material";
import MainAppBar from "../../../../../components/layout/MainAppBar";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";

type Props = {
    id: string | undefined;
    submit: () => void;
};

export default function AddVariantAppBar({ id, submit }: Props) {
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
                    onClick={() => navigate(`/products/${id}/edit`)}
                >
                    <NavigateBefore
                        color="disabled"
                        sx={{ width: "30px", height: "30px" }}
                    />
                    <Typography color="textDisabled">
                        Quay lại sản phẩm gốc
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "20px" }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate(`/products/${id}`)}
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
