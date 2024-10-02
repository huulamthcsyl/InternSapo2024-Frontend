import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false); // State for email validation
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    // Regex pattern to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setMessage("");

    // Check email format before proceeding
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false); // Reset email error if format is valid

    try {
      const response = await axios.post("http://localhost:8080/v1/auth/login", {
        email,
        password,
      });
      if (response.data.status === "OK") {
        setMessage("Login successful!");
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.data.id,
            name: response.data.data.name,
            email: response.data.data.email,
            roles: response.data.data.roles,
          })
        );

        const isAdmin = response.data.data.roles.some(
          (role: string) => role === "ROLE_ADMIN"
        );
        if (isAdmin) {
          navigate(`/account/${response.data.data.id}`);
        } else {
          navigate(`/account/${response.data.data.id}`);
        }
      }
    } catch (error: any) {
      setError(true);
      setMessage(error.response?.data?.message || "Unknown error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ece9e6, #ffffff)", // Elegant gradient background
      }}
    >
      <Container maxWidth="xs" sx={{ marginTop:-12 }}>
        <Box
          sx={{
            mt: 8,
            p: 4, // Padding inside the box
            border: "1px solid #ccc", // Border style
            borderRadius: "8px", // Rounded corners
            backgroundColor: "#f9f9f9", // Background color for the form
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional shadow effect
          }}
        >
          <Typography variant="h4" align="center">
            Đăng nhập
          </Typography>
          {message && (
            <Alert severity={error ? "error" : "success"}>{message}</Alert>
          )}
          <Box component="form" onSubmit={handleLogin}>
            <Box sx={{ marginTop: 4 }}>
              <Typography sx={{ marginBottom: -1 }}>Email</Typography>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError} // Apply error styling
                helperText={emailError ? "Email không hợp lệ" : ""} // Show error message
                required
              />
            </Box>
            <Box>
              <Typography sx={{ marginTop: 1, marginBottom: -1 }}>
                Password
              </Typography>
              <TextField
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Đăng nhập
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
