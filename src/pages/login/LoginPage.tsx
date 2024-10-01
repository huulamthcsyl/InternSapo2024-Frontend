import React, { useState } from 'react';  
import axios from 'axios';  
import {  
    Container,  
    TextField,  
    Button,  
    Typography,  
    Box,  
    Alert,  
} from '@mui/material'; 
import { useNavigate } from 'react-router-dom';   

const LoginPage: React.FC = () => {  
    const [email, setEmail] = useState<string>('');  
    const [password, setPassword] = useState<string>('');  
    const [message, setMessage] = useState<string>('');  
    const [error, setError] = useState<boolean>(false);  
    const navigate = useNavigate();  

    const handleLogin = async (e: React.FormEvent) => {  
        e.preventDefault();  
        setError(false);  
        setMessage('');  

        try {  
            const response = await axios.post('http://localhost:8080/v1/auth/login', {  
                email,  
                password,  
            });  
            if (response.data.status === 'OK') {  
                setMessage('Login successful!');  
                localStorage.setItem('token', response.data.data.token);  
                localStorage.setItem('user', JSON.stringify({
                  id: response.data.data.id,
                  name: response.data.data.name,
                  // email: response.data.data.email,
                  roles: response.data.data.roles,
              }));

                const isAdmin = response.data.data.roles.some((role: string) => role === 'ROLE_ADMIN'); 
                if (isAdmin) {
                  navigate(`/admin/user`)

                }else{
                  navigate(`/`); 

                } 


                 
            }  
        } catch (error: any) {  
            setError(true);  
            setMessage('Login failed: ' + (error.response?.data?.message || 'Unknown error'));  
        }  
    };  

    return (  
        <Container maxWidth="xs">  
            <Box sx={{ mt: 8 }}>  
                <Typography variant="h4" align="center">Đăng nhập</Typography>  
                {message && (  
                    <Alert severity={error ? 'error' : 'success'}>{message}</Alert>  
                )}  
                <form onSubmit={handleLogin}>  
                    <TextField  
                        label="Email"  
                        variant="outlined"  
                        fullWidth  
                        margin="normal"  
                        value={email}  
                        onChange={(e) => setEmail(e.target.value)}  
                        required  
                    />  
                    <TextField  
                        label="Mật khẩu"  
                        type="password"  
                        variant="outlined"  
                        fullWidth  
                        margin="normal"  
                        value={password}  
                        onChange={(e) => setPassword(e.target.value)}  
                        required  
                    />  
                    <Button  
                        type="submit"  
                        variant="contained"  
                        color="primary"  
                        fullWidth  
                        sx={{ mt: 2 }}  
                    >  
                        Đăng nhập  
                    </Button>  
                </form>  
            </Box>  
        </Container>  
    );  
};  

export default LoginPage;
