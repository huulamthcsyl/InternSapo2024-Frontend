import { Box, Typography } from "@mui/material"

import MainBox from "../../components/layout/MainBox"
import NewCustomerPageAppBar from "./NewCustomerAppBar.tsx";

type Props = {}

export default function NewCustomerPage({}: Props) {
    return (
        <Box>
            <NewCustomerPageAppBar />
            <MainBox>
                <Typography variant="h3">thêm mới khách hàng</Typography>

            </MainBox>
        </Box>
    )
}