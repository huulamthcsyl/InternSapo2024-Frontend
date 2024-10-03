import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Role {
  id: number;
  name: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  roles: Role[];
  createdOn: string;
  updateOn: string;
}

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://13.211.146.23:8080/v1/user/${id}`);
        if (response.data.status === "OK") {
          setUser(response.data.data);
        }
      } catch (err: any) {
        setError("Không thể lấy thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center">
          Thông tin cá nhân
        </Typography>
        <Typography variant="h6">Tên: {user?.name}</Typography>
        <Typography variant="body1">Email: {user?.email}</Typography>
        <Typography variant="body1">
          Số điện thoại: {user?.phoneNumber}
        </Typography>
        <Typography variant="body1">Địa chỉ: {user?.address}</Typography>
        <Typography variant="body1">
          Vai trò: {user?.roles.map((role) => role.name).join(", ")}
        </Typography>
        <Typography variant="body2">
          Ngày tạo: {user?.createdOn && new Date(user.createdOn).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          Cập nhật lần cuối: {user?.updateOn && new Date(user?.updateOn).toLocaleString()}
        </Typography>
        <Button
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          variant="text"
          onClick={() => navigate(`/account/change-password/${id}`)}
        >
          Đổi mật khẩu
        </Button>
      </Box>
    </Container>
  );
};

export default UserProfile;
