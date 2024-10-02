import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

interface Role {
  id: number;
  name: string;
}

const roleMap: { [key: string]: string } = {
  ROLE_ADMIN: "ADMIN",
  ROLE_REPOSITORY: "NHÂN VIÊN KHO",
  ROLE_SALE: "NHÂN VIÊN BÁN HÀNG",
  ROLE_SUPPORT: "NHÂN VIÊN CHĂM SÓC",
};

interface UserDetail {
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

export default function DetailUser() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://13.211.146.23:8080/v1/user/${id}`);
        const jsonResponse = await response.json();
        if (response.ok) {
          setUser(jsonResponse.data);
        } else {
          console.error("Failed to fetch user details", jsonResponse.message);
        }
      } catch (error) {
        console.error("Network error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"; // Handle null values gracefully
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format as "dd/MM/yyyy"
  };

  const handleResetPassword = async () => {
    // const token = localStorage.getItem('token'); // Retrieve token from localStorage
    // if (!token) {
    //   setErrorMessage('Không tìm thấy token xác thực.');
    //   return;
    // }
    try {
      const response = await fetch(
        `http://localhost:8080/v1/admin/reset_password/${id}`,
        {
          method: "PUT",
          // headers: {
          //   // 'Content-Type': 'application/json',
          //   // Authorization: `Bearer ${token}`,
          // },
        }
      );
      // if (response.ok && data.status === 'OK') {
      //   setSuccessMessage('Mật khẩu đã thay đổi thành công.');
      // } else {
      //   setErrorMessage(data.message || 'Đổi mật khẩu thất bại.');
      // }
      if (response.ok) {
        console.log("Password reset successfully");
        alert("Password reset successfully");
      } else {
        const jsonResponse = await response.json();
        console.error("Failed to reset password", jsonResponse.message);
      }
    } catch (error) {
      console.error("Network error", error);
    } finally {
      setOpenDialog(false);
    }
  };
  const formatDateForAPI = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);

    // Format as "yyyy-MM-dd'T'HH:mm:ss" and remove the `Z` at the end
    return date.toISOString().slice(0, 19); // This removes the timezone 'Z'
  };

  const handleToggleStatus = async () => {
    if (!user) return;
  
    const updatedStatus = !user.status; // Toggle the current status
  
    try {
      const response = await fetch(`http://localhost:8080/v1/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          status: updatedStatus, // Ensure this is a boolean value, not null
          createdOn: formatDateForAPI(user.createdOn), // Send the formatted date
          updateOn: formatDateForAPI(new Date().toISOString()), // Send current date
        }),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        if (updatedUser && updatedUser.data) {
          // setUser((prevUser) => ({
          //   ...prevUser,
          //   status: updatedUser.data.status ?? updatedStatus, // Use updated status if returned, otherwise use the toggled status
          // }));
          setUser(updatedUser.data);
          alert(" Successfully");
        }
      } else {
        console.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };
  

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <Typography>No user found</Typography>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box sx={{ display: "flex" , alignItems: "center", marginBottom: 2  }}>
        <Button
          startIcon={<ArrowBackIcon />}
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          onClick={() => navigate(`/admin/user`)}
        >
          Quay lại danh sách nhân viên
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate(`/admin/user/update/${user.id}`, { state: user })
            }
          >
            Sửa thông tin
          </Button>

      </Box>

      <Card sx={{ maxWidth: 800, margin: "0 auto", padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Thông tin nhân viên
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Tên nhân viên:</strong> {user.name}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Địa Chỉ :</strong> {user.address}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Ngày sinh:</strong> {formatDate(user.createdOn)}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Cập nhật lần cuối:</strong> {formatDate(user.updateOn)}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Trạng thái tài khoản:</strong>
                <Chip
                  label={user.status ? "Hoạt động" : "Khoá"}
                  color={user.status ? "success" : "error"}
                  size="small"
                  sx={{ marginLeft: 1 }}
                />
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Vai trò:</strong>
                {user.roles
                  .map((role) => roleMap[role.name] || role.name)
                  .join(", ")}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Số điện thoại: {user.phoneNumber}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ width: "200px" }}
              onClick={() => setOpenDialog(true)}
            >
              Khôi phục mật khẩu
            </Button>
            <Button
              variant="outlined"
              color={user.status ? "error" : "success"}
              sx={{ width: "200px" }}
              onClick={handleToggleStatus}
            >
              {user.status ? "Khoá tài khoản" : "Mở khóa tài khoản"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Xác nhận khôi phục mật khẩu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn khôi phục mật khẩu cho nhân viên {user.name}{" "}
            không? Hành động này sẽ gửi một email khôi phục mật khẩu.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={handleResetPassword} color="primary">
            Khôi phục mật khẩu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
