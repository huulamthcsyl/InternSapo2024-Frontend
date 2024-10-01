import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,

  Menu,
  MenuItem,
  Select,
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
  TableFooter,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
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
    totalElements: number; // Total number of users
  };
}

type TablePaginationActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
};

const roleMap: { [key: string]: string } = {
  ROLE_ADMIN: "ADMIN",
  ROLE_REPOSITORY: "NHÂN VIÊN KHO",
  ROLE_SALE: "NHÂN VIÊN BÁN HÀNG",
  ROLE_SUPPORT: "NHÂN VIÊN CHĂM SÓC",
};
type Props = {};
export default function User({}: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0); // Update page to start at 0
  const [totalElements, setTotalElements] = useState<number>(0); // Total number of users
  const [pageSize, setPageSize] = useState<number>(10); // Rows per page
  const [sortColumn, setSortColumn] = useState<string>("name"); // Default sorting column
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Default sorting order
  const [selectedRole, setSelectedRole] = useState<string | "">("");
  const [anchorEl, setAnchorEl] = useState<any | HTMLElement>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const roleFilter = selectedRole ? `&role=${selectedRole}` : "";
      const response = await fetch(
        `http://localhost:8080/v1/user?page=${page}&limit=${pageSize}&sort=${sortColumn}&order=${sortOrder}${roleFilter}`
      );
      const data: ApiResponse = await response.json();
      setUsers(data.data.content);
      setTotalElements(data.data.totalElements); // Set total elements
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchUsers(page, pageSize , sortColumn , sortOrder);
    fetchUsers();

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, [page, pageSize, sortColumn, sortOrder, selectedRole]);

  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0); // Reset to page 0 when changing rows per page
  };
  const handleSort = (column: string) => {
    const isAsc = sortColumn === column && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };
  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedRole(event.target.value as string); // Update selected role
    setPage(0); // Reset to page 0 when filtering
  };

  function TablePaginationActions({
    count,
    page,
    rowsPerPage,
    onPageChange,
  }: TablePaginationActionsProps) {
    const handleBackButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page + 1);
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <Button
          onClick={handleBackButtonClick}
          disabled={page === 0}
          size="small"
        >
          <KeyboardArrowLeft />
        </Button>
        <Button
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          size="small"
        >
          <KeyboardArrowRight />
        </Button>
      </Box>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user"); // Remove user info
    navigate("/login"); // Redirect to login page
  };

  return (
    <Box>
      <Box
        sx={{
          // display: "flex",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
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
                  <MenuItem
                    onClick={() => navigate(`/account/${currentUser.id}`)}
                  >
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
      </Box>

      <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/admin/user/create`)}
          >
            Thêm nhân viên
          </Button>
        </Box>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortColumn === "id"}
                        direction={sortColumn === "id" ? sortOrder : "asc"}
                        onClick={() => handleSort("id")}
                      >
                        Mã nhân viên
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortColumn === "name"}
                        direction={sortColumn === "name" ? sortOrder : "asc"}
                        onClick={() => handleSort("name")}
                      >
                        Tên nhân viên
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortColumn === "phoneNumber"}
                        direction={
                          sortColumn === "phoneNumber" ? sortOrder : "asc"
                        }
                        onClick={() => handleSort("phoneNumber")}
                      >
                        Số điện thoại
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                    
                      <TableSortLabel>Vai trò</TableSortLabel>
                      <Select value={selectedRole} onChange={handleRoleChange}>
                        <MenuItem value="">Tất cả</MenuItem>
                        <MenuItem value="ROLE_ADMIN">ADMIN</MenuItem>
                        <MenuItem value="ROLE_REPOSITORY">
                          NHÂN VIÊN KHO
                        </MenuItem>
                        <MenuItem value="ROLE_SALE">
                          NHÂN VIÊN BÁN HÀNG
                        </MenuItem>
                        <MenuItem value="ROLE_SUPPORT">
                          NHÂN VIÊN CHĂM SÓC
                        </MenuItem>
                      </Select>
                      
                    </TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      onClick={() => navigate(`/admin/user/${user.id}`)}
                    >
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
                <TableFooter>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    count={totalElements}
                    rowsPerPage={pageSize}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    labelRowsPerPage="Số hàng trên mỗi trang"
                    labelDisplayedRows={({ from, to, count }) =>
                      `${from}-${to} trong tổng số ${count}`
                    }
                  />
                </TableFooter>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Box>
  );
}
