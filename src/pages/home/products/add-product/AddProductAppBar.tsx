import { Typography, Box, Button } from "@mui/material";
import MainAppBar from "../../../../components/layout/MainAppBar";
import NavigateBefore from "@mui/icons-material/NavigateBefore";

type Props = {};

export default function AddProductAppBar({}: Props) {
    return (
        <MainAppBar>
            <Box sx={{ display: "flex",flexGrow:'1',justifyContent:'space-between' }}>
                <Box sx={{ display: "flex", gap: "20px" }}>
                    <NavigateBefore
                        color="disabled"
                        sx={{ width: "30px", height: "30px" }}
                    />
                    <Typography color="textDisabled">
                        Quay lại danh sách sản phẩm
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "20px" }}>
                    <Button variant="outlined" color="primary">
                        Hủy
                    </Button>
                    <Button variant="contained" color="primary">
                        Lưu
                    </Button>
                </Box>
            </Box>
        </MainAppBar>
    );
}
