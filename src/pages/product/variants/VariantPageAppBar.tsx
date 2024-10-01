import { Typography, Box } from "@mui/material";
import MainAppBar from "../../../components/layout/MainAppBar";

type Props = {};

export default function VariantPageAppBar({}: Props) {
    return (
        <MainAppBar>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "26px" }} color="textPrimary">
                    Danh sách phiên bản
                </Typography>
            </Box>
        </MainAppBar>
    );
}
