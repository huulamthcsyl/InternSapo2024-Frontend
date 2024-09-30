import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { ArrowBack } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

type Props = {};

// Define the role mappings
// const roleMappings: { [key: string]: string } = {
//   ROLE_ADMIN: "ADMIN",
//   ROLE_REPOSITORY: "NHÂN VIÊN KHO",
//   ROLE_SALE: "NHÂN VIÊN BÁN HÀNG",
//   ROLE_SUPPORT: "NHÂN VIÊN CHĂM SÓC",
// };

// Role options that match backend roles
const roleOptions = [
  { value: "ROLE_ADMIN", label: "ADMIN" },
  { value: "ROLE_REPOSITORY", label: "NHÂN VIÊN KHO" },
  { value: "ROLE_SALE", label: "NHÂN VIÊN BÁN HÀNG" },
  { value: "ROLE_SUPPORT", label: "NHÂN VIÊN CHĂM SÓC" },
];

export default function CreateUser({}: Props) {
  const [role, setRole] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [passwordError, setPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const navigate = useNavigate();

  // Update form data
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle role change
  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  // Handle date change for date of birth
  const handleDateChange = (newValue: Dayjs | null) => {
    setDateOfBirth(newValue);
  };

  // Function to check if email and phone number are unique
  const checkEmail = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/v1/user/check-email/${formData.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok && result.status === "OK") {
        // Email exists, show error message
        setEmailError("Email đã tồn tại");
        return false;
      } else if (
        result.status === "INTERNAL_SERVER_ERROR" &&
        result.message === "Email not found"
      ) {
        // Email not found, reset error
        setEmailError("");
        return true;
      } else {
        // Handle any other error case
        setEmailError("Có lỗi xảy ra khi kiểm tra email");
        return false;
      }
    } catch (error) {
      console.error("Error checking uniqueness:", error);
      setEmailError("Lỗi kết nối. Vui lòng thử lại");
      return false;
    }
  };

  const checkPhoneNumber = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/v1/user/check-phoneNumber/${formData.phoneNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok && result.status === "OK") {
        // Phone exists, show error message
        setPhoneError("Phone Number đã tồn tại");
        return false;
      } else if (
        result.status === "INTERNAL_SERVER_ERROR" &&
        result.message === "Phone number not found"
      ) {
        // PHone not found, reset error
        setPhoneError("");
        return true;
      } else {
        // Handle any other error case
        setPhoneError("Có lỗi xảy ra khi kiểm tra phone number");
        return false;
      }
    } catch (error) {
      console.error("Error checking uniqueness:", error);
      setPhoneError("Lỗi kết nối. Vui lòng thử lại");
      return false;
    }
  };

  // Submit form to the API
  const handleSubmit = async () => {
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Mật khẩu và xác nhận mật khẩu không trùng khớp");
      return;
    }

    // Reset password error
    setPasswordError("");

    // Check if email and phone number are unique
    const isUnique = await checkEmail();
    if (!isUnique) return; // Stop submission if email or phone is not unique
    const isUniquePhoneNumber = await checkPhoneNumber();
    if (!isUniquePhoneNumber) return;

    const user = {
      ...formData,
      dateOfBirth: dateOfBirth?.format("DD-MM-YYYY"), // Adjust as needed
      roles: [{ name: role }],
    };

    try {
      const response = await fetch("http://localhost:8080/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Thêm nhân viên thành công");
        navigate("/admin/user");
        console.log("User created successfully:", result);
      } else {
        console.error("Error creating user:", result);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: 1.5,
          marginBottom: 2,
          backgroundColor: "#ffffff",
        }}
      >
        <Box >
          <Box display="flex" alignItems="center">
            <Button
              variant="text"
              sx={{ color: "#637381", marginLeft: 2 }}
              onClick={() => navigate(-1)}
            >
              <KeyboardArrowLeft /> Quay lại danh sách nhân viên
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Card  sx={{  margin: "0 auto", padding: 3, boxShadow: 3 }}>
          <CardContent>
          <Typography variant="h6" mb={2}>
          Thông tin nhân viên
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Tên nhân viên"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth required>
              <InputLabel>Vai trò</InputLabel>
              <Select value={role} onChange={handleRoleChange}>
                {roleOptions.map((roleOption) => (
                  <MenuItem key={roleOption.value} value={roleOption.value}>
                    {roleOption.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Mật khẩu"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              error={!!passwordError}
              helperText={passwordError}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              error={!!passwordError}
              helperText={passwordError}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              error={!!emailError}
              helperText={emailError}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Số điện thoại"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              error={!!phoneError}
              helperText={phoneError}
            />
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Ngày sinh"
                format="DD/MM/YYYY"
                value={dateOfBirth}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Lưu
          </Button>
        </Box>
          </CardContent>
        </Card>
        
      </Box>

      {/* Form Title */}
    </Box>
  );
}
