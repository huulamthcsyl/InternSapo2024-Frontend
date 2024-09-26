import { Box, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState } from "react";

type Props = {
    onKeyPress: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchField({ onKeyPress }: Props) {
    const [searchQuery, setSearchQuery] = useState("");

    function handleEnterPress(e) {
        if (e.key === "Enter") {
            onKeyPress(searchQuery);
        }
    }

    function handleSearchChange(e) {
        setSearchQuery(e.target.value);
    }

    return (
        <Box sx={{ padding: "16px" }}>
            <Box
                sx={{
                    border: "1px solid #d9d9d9",
                    alignItems: "center",
                    display: "flex",
                    borderRadius: "5px",
                    padding: "10px 15px",
                    gap: "30px",
                }}
            >
                <Search
                    sx={{
                        color: "#d9d9d9",
                        height: "32px",
                        width: "32px",
                    }}
                />
                <InputBase
                    onChange={handleSearchChange}
                    value={searchQuery}
                    onKeyDown={handleEnterPress}
                    sx={{ width: "100%" }}
                    placeholder="Tìm kiếm sản phẩm theo tên"
                />
            </Box>
        </Box>
    );
}
