import { Typography, Box, Button } from "@mui/material";
import MainAppBar from "../../../components/layout/MainAppBar";
import { NavigateBefore } from "@mui/icons-material";

type Props = {};

export default function VariantPageAppBar({}: Props) {
    return (
        <MainAppBar>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{fontSize:'26px'}} color="textPrimary">
                    Danh sách phiên bản
                </Typography>
            </Box>
        </MainAppBar>
    );
}
