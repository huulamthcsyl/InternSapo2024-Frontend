import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
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
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs , { Dayjs } from "dayjs";

// Role options that match backend roles
const roleOptions = [
  { value: "ROLE_ADMIN", label: "ADMIN (Chủ cửa hàng)" },
  { value: "ROLE_REPOSITORY", label: "NHÂN VIÊN KHO (Quản lý kho)" },
  { value: "ROLE_SALE", label: "NHÂN VIÊN BÁN HÀNG (Quản lý bán hàng)" },
  { value: "ROLE_SUPPORT", label: "NHÂN VIÊN CHĂM SÓC (Chăm sóc khách hàng)" },
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
  const [birthDay, setBirthDay] = useState<Dayjs | null>(null);
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/v1/user/${id}`);
        const { data } = await response.json(); // Fetch the data from the response

        // Prefill form with user details
        setFormData({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
          
        });

        // Parse createdOn date properly
        setBirthDay(dayjs(data.birthDay || null));
        console.log(data.birthDay);

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

  const handleDateChange = (value: Dayjs | null) => {  
    setBirthDay(value);  
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
      birthDay: birthDay ? birthDay.format("YYYY-MM-DD") : null,
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
        navigate(`/admin/user/${id}`); // Navigate back to the user list after successful update
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  if (loading) {
    return <Typography><CircularProgress/></Typography>; // Show loading state
  }

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
        <Box display="flex" alignItems="center">
          <Button
            variant="text"
            sx={{ color: "#637381", marginLeft: 2 }}
            onClick={() => navigate(-1)}
          >
            <KeyboardArrowLeft /> Quay lại thông tin nhân viên
          </Button>

          

          
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Button
            sx={{ marginRight: 5 }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Lưu
          </Button>
      </Box>

      <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Card
          sx={{  margin: "0 auto", padding: 3, boxShadow: 3 }}
        >
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

              <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Ngày sinh"
                  inputFormat="DD/MM/YYYY"
                  value={birthDay}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>

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
    </Box>
  );
};

export default UpdateUser;
