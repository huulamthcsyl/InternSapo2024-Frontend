import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Pagination,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface Role {
  id: number;
  name: string;
}
interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  status: boolean;
  roles: Role[];
  createdOn: string;
  updateOn: string | null;
}

interface ApiResponse {
  data: {
    content: User[];
    pageable: {
      pageNumber: number;
      pageSize: number;
    };
    totalPages: number;
    page: number;
    limit: number;
  };
}

type Props = {};

const roleMap: { [key: string]: string } = {
  ROLE_ADMIN: "ADMIN",
  ROLE_REPOSITORY: "NHÂN VIÊN KHO",
  ROLE_SALE: "NHÂN VIÊN BÁN HÀNG",
  ROLE_SUPPORT: "NHÂN VIÊN CHĂM SÓC",
};

export default function User({ }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pure-ridge-57258-e82472824bc6.herokuapp.com/v1/user?page=${page - 1}&limit=10`
      );
      const data: ApiResponse = await response.json();
      setUsers(data.data.content);
      setTotalPage(data.data.totalPages);
      console.log(data);
      // setTotalPages(Math.ceil(data.total / data.limit));
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchUsers(page);

  //   // Retrieve the current user's info from localStorage or API
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setCurrentUser(JSON.parse(storedUser)); // Properly parse the stored user data
  //   }
  // }, [page]);
  useEffect(() => {
    fetchUsers(page);

    // Retrieve the current user's info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("User found in localStorage:", storedUser); // Log to verify
      setCurrentUser(JSON.parse(storedUser));
    }
  }, [page]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user"); // Remove user info
    navigate("/login"); // Redirect to login page
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" gutterBottom>
          Danh sách nhân viên
        </Typography>
        <Typography>
          {currentUser ? (
            <>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                {currentUser.name} <ArrowDropDownIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => navigate(`/account/${currentUser.id}`)}>
                  Thông tin cá nhân
                </MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </>
          ) : (
            <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
          )}
        </Typography>

      </Toolbar>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => navigate(`/admin/user/create`)}
      >
        Thêm nhân viên
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã nhân viên</TableCell>
                  <TableCell>Tên nhân viên</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Vai trò</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>
                      {user.roles
                        .map((role) => roleMap[role.name] || role.name) // Map role names
                        .join(", ")}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status ? "Hoạt động" : "Khoá"}
                        color={user.status ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        onClick={() => navigate(`/admin/user/${user.id}`)}
                      >
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={totalPage}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          />
        </>
      )}
    </Box>
  );
}
