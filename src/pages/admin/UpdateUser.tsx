import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  Card,
  CardContent,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs, { Dayjs } from "dayjs";

// Role options that match backend roles
const roleOptions = [
  { value: "ROLE_ADMIN", label: "ADMIN" },
  { value: "ROLE_REPOSITORY", label: "NHÂN VIÊN KHO" },
  { value: "ROLE_SALE", label: "NHÂN VIÊN BÁN HÀNG" },
  { value: "ROLE_SUPPORT", label: "NHÂN VIÊN CHĂM SÓC" },
];

const UpdateUser = () => {
  const { id } = useParams<{ id: string }>(); // Extract the user ID from the URL
  const navigate = useNavigate();

  // State to hold the user details
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null);
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://13.211.146.23:8080/v1/user/${id}`);
        const { data } = await response.json(); // Fetch the data from the response

        // Prefill form with user details
        setFormData({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
        });

        // Parse createdOn date properly
        setDateOfBirth(dayjs(data.createdOn, "DD-MM-YYYY"));

        // Assuming the first role in the array is the one to be shown
        setRole(data.roles?.[0]?.name || "");
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };
  const handleSubmit = async () => {
    // Map the selected role to the corresponding role object
    const selectedRole = roleOptions.find((option) => option.value === role);
    const roleToSubmit = selectedRole
      ? {
          id: roleOptions.indexOf(selectedRole) + 1, // Assuming IDs are sequential starting from 1
          name: selectedRole.value,
        }
      : null;

    // Prepare data for submission
    const updatedData = {
      ...formData,
      roles: roleToSubmit ? [roleToSubmit] : [], // Include roles in the expected format
      dateOfBirth: dateOfBirth ? dateOfBirth.toISOString() : null,
    };

    try {
      const response = await fetch(`http://localhost:8080/v1/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        console.error("Failed to update user");
        // Handle error case
      } else {
        console.log("User updated successfully");
        navigate("/admin/user"); // Navigate back to the user list after successful update
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>; // Show loading state
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          variant="text"
          onClick={() => navigate(`/admin/user`)}
        >
          Quay lại danh sách nhân viên
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </Box>

      <Card sx={{ maxWidth: 800, margin: "0 auto", padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Thông tin nhân viên
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tên nhân viên"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Ngày sinh"
                  inputFormat="DD/MM/YYYY"
                  value={dateOfBirth}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid> */}

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Vai trò</InputLabel>
                <Select
                  value={role}
                  onChange={handleRoleChange}
                  label="Vai trò"
                  required
                >
                  {roleOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UpdateUser;
