import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
} from '@mui/material';
import { useNavigate } from "react-router-dom";

const ChangePassword: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setErrorMessage('Mật khẩu mới và mật khẩu xác nhận không khớp.');
      return;
    }
    // const token = localStorage.getItem('token'); // Retrieve token from localStorage
    // if (!token) {
    //   setErrorMessage('Không tìm thấy token xác thực.');
    //   return;
    // }

    try {
      const response = await fetch(`https://pure-ridge-57258-e82472824bc6.herokuapp.com/v1/user/change_password/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: newPassword, // send only the new password
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'OK') {
        setSuccessMessage('Mật khẩu đã thay đổi thành công.');
      } else {
        setErrorMessage(data.message || 'Đổi mật khẩu thất bại.');
      }
    } catch (error) {
      setErrorMessage('Lỗi kết nối đến máy chủ.');
    }
  };

  return (
    <Container component={Paper} elevation={3} sx={{ padding: 4, marginTop: 5 }}>
      <Typography variant="h5" gutterBottom>
        Đổi mật khẩu
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Mật khẩu mới"
            type="password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Nhập lại mật khẩu mới"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          * Mật khẩu nên có ít nhất 8 ký tự và bao gồm chữ cái, số và ký tự đặc biệt.
        </Typography>
        <Box>
          <Button variant="contained" color="primary" type="submit">
            Lưu
          </Button>
          <Button variant="outlined" color="secondary" sx={{ marginLeft: 2 }} onClick={() => navigate(`/account/${id}`)}>
            Hủy
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ChangePassword;
