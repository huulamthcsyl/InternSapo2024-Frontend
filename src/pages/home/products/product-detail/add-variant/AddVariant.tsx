import {
  Box,
  Button,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MainBox from "../../../../../components/layout/MainBox";
import { AddCircle } from "@mui/icons-material";
import AddVariantAppBar from "./AddVariantAppBar";

type Props = {};

export default function AddVariant({}: Props) {
  return (
      <Box>
          <AddVariantAppBar />
          <MainBox>
              <Box sx={{ padding: "20px 24px", backgroundColor: "#F0F1F1" }}>
                  <Box
                      sx={{
                          display: "flex",
                          height: "60px",
                          justifyContent: "space-between",
                          alignItems: "center",
                      }}
                  >
                      <Typography sx={{ fontSize: "20px" }}>
                         Thêm phiên bản cho Áo khoác Chino thời thượng
                      </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: "24px" }}>
                      <Box
                          sx={{
                              borderRadius: "5px",
                              backgroundColor: "white",
                              width: "35%",
                              height: "fit-content",
                          }}
                      >
                          <Box
                              sx={{
                                  padding: "16px",
                                  height: "27px",
                                  borderBottom: "1px solid #d9d9d9",
                                  display: "flex",
                                  justifyContent: "space-between",
                              }}
                          >
                              <Typography sx={{ fontSize: "20px" }}>
                                  Phiên bản
                              </Typography>
                              <Button></Button>
                          </Box>
                          <Box sx={{ padding: "3px" }}>
                              <Box
                                  sx={{
                                      backgroundColor: "#08f",
                                      padding: "16px",
                                      height: "40px",
                                      display: "flex",
                                      gap: "10px",
                                      borderRadius: "3px",
                                  }}
                              >
                                  <CardMedia
                                      component="img"
                                      sx={{
                                          padding: "0 10px",
                                          width: 40,
                                          height: 40,
                                      }}
                                      image="https://firebasestorage.googleapis.com/v0/b/group1-sapo.appspot.com/o/products%2Fbachmahoangtu.jpg?alt=media&token=8bd45827-b5d6-49d6-81a9-91c856472dd7"
                                      alt="Paella dish"
                                  />
                                  <Box>
                                      <Typography
                                          fontSize={"0.9rem"}
                                          sx={{ color: "white" }}
                                      >
                                          Áo khoác Chino thời thượng - M -
                                          Trắng
                                      </Typography>
                                      <Typography
                                          fontSize={"0.9rem"}
                                          sx={{ color: "white" }}
                                      >
                                          Tồn kho: 9
                                      </Typography>
                                  </Box>
                              </Box>
                          </Box>
                          <Box sx={{ padding: "3px" }}>
                              <Box
                                  sx={{
                                      padding: "16px",
                                      height: "40px",
                                      display: "flex",
                                      gap: "10px",
                                      borderRadius: "3px",
                                  }}
                              >
                                  <CardMedia
                                      component="img"
                                      sx={{
                                          padding: "0 10px",
                                          width: 40,
                                          height: 40,
                                      }}
                                      image="https://firebasestorage.googleapis.com/v0/b/group1-sapo.appspot.com/o/products%2Fbachmahoangtu.jpg?alt=media&token=8bd45827-b5d6-49d6-81a9-91c856472dd7"
                                      alt="Paella dish"
                                  />
                                  <Box>
                                      <Typography fontSize={"0.9rem"}>
                                          Áo khoác Chino thời thượng - M -
                                          Trắng
                                      </Typography>
                                      <Typography
                                          fontSize={"0.9rem"}
                                          color="textDisabled"
                                      >
                                          Tồn kho: 9
                                      </Typography>
                                  </Box>
                              </Box>
                          </Box>
                          
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                          <Box
                              sx={{
                                  borderRadius: "5px",
                                  backgroundColor: "white",
                              }}
                          >
                              <Box
                                  sx={{
                                      padding: "16px",
                                      height: "27px",
                                      borderBottom: "1px solid #d9d9d9",
                                  }}
                              >
                                  <Typography sx={{ fontSize: "20px" }}>
                                      Thông tin chi tiết phiên bản
                                  </Typography>
                              </Box>
                              <Box sx={{ display: "flex" }}>
                                  <Box
                                      sx={{
                                          width: "60%",
                                          padding: "16px",
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "10px",
                                      }}
                                  >
                                      <TextField
                                          required
                                          label="Tên phiên bản"
                                          defaultValue={"dfds"}
                                          fullWidth
                                          size="small"
                                          margin="normal"
                                      />
                                      <TextField
                                          label="Mã SKU"
                                          defaultValue={"dfds"}
                                          sx={{ width: "50%" }}
                                          size="small"
                                          margin="normal"
                                      />
                                  </Box>
                                  <Box
                                      sx={{
                                          flexGrow: 1,
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                      }}
                                  >
                                      <Box sx={{
                                          mt:2,
                                          display: "flex",
                                          flexDirection:'column',
                                          justifyContent: "center"
                                      }}>
                                          <CardMedia
                                              component="img"
                                              sx={{
                                                  borderRadius: 1,
                                                  width: 100,
                                                  height: 100,
                                              }}
                                              image="https://firebasestorage.googleapis.com/v0/b/group1-sapo.appspot.com/o/products%2Fbachmahoangtu.jpg?alt=media&token=8bd45827-b5d6-49d6-81a9-91c856472dd7"
                                              alt="Paella dish"
                                          />
                                          <Button variant="text" color="primary" sx={{textTransform:'none'}}>Thay đổi ảnh</Button>
                                      </Box>
                                  </Box>
                              </Box>
                          </Box>
                          <Box
                              sx={{
                                  borderRadius: "5px",
                                  backgroundColor: "white",
                              }}
                          >
                              <Box
                                  sx={{
                                      mt: "24px",
                                      padding: "16px",
                                      height: "27px",
                                      borderBottom: "1px solid #d9d9d9",
                                  }}
                              >
                                  <Typography sx={{ fontSize: "20px" }}>
                                      Thuộc tính
                                  </Typography>
                              </Box>
                              <Box
                                  sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      padding: "16px",
                                      justifyContent: "space-between",
                                  }}
                              >
                                  <FormControl
                                      sx={{ width: "48.5%" }}
                                      margin="normal"
                                      size="small"
                                  >
                                      <InputLabel id="category">
                                          Kích cỡ
                                      </InputLabel>
                                      <Select
                                          labelId="size"
                                          id="size"
                                          label="Kích cỡ"
                                          defaultValue={10}
                                      >
                                          <MenuItem value={10}>Ten</MenuItem>
                                          <MenuItem value={20}>
                                              Twenty
                                          </MenuItem>
                                          <MenuItem value={30}>
                                              Thirty
                                          </MenuItem>
                                      </Select>
                                  </FormControl>
                                  <FormControl
                                      sx={{ width: "48.5%" }}
                                      margin="normal"
                                      size="small"
                                  >
                                      <InputLabel id="color">
                                          Màu sắc
                                      </InputLabel>
                                      <Select
                                          labelId="color"
                                          id="color"
                                          label="Màu sắc"
                                          defaultValue={10}
                                      >
                                          <MenuItem value={10}>Ten</MenuItem>
                                          <MenuItem value={20}>
                                              Twenty
                                          </MenuItem>
                                          <MenuItem value={30}>
                                              Thirty
                                          </MenuItem>
                                      </Select>
                                  </FormControl>
                                  <FormControl
                                      sx={{ width: "48.5%" }}
                                      margin="normal"
                                      size="small"
                                  >
                                      <InputLabel id="material">
                                          Chất liệu
                                      </InputLabel>
                                      <Select
                                          labelId="material"
                                          id="material"
                                          label="Chất liệu"
                                          defaultValue={10}
                                      >
                                          <MenuItem value={10}>Ten</MenuItem>
                                          <MenuItem value={20}>
                                              Twenty
                                          </MenuItem>
                                          <MenuItem value={30}>
                                              Thirty
                                          </MenuItem>
                                      </Select>
                                  </FormControl>
                              </Box>
                          </Box>
                          <Box
                              sx={{
                                  borderRadius: "5px",
                                  backgroundColor: "white",
                              }}
                          >
                              <Box
                                  sx={{
                                      mt: "24px",
                                      padding: "16px",
                                      height: "27px",
                                      borderBottom: "1px solid #d9d9d9",
                                  }}
                              >
                                  <Typography sx={{ fontSize: "20px" }}>
                                      Giá sản phẩm
                                  </Typography>
                              </Box>
                              <Box
                                  sx={{
                                      display: "flex",
                                      padding: "16px",
                                      gap: "20px",
                                  }}
                              >
                                  <TextField
                                      label="Giá bán"
                                      required
                                      size="small"
                                      defaultValue={"sfds"}
                                      sx={{ width: "50%" }}
                                  />
                                  <TextField
                                      label="Giá nhập"
                                      required
                                      size="small"
                                      defaultValue={"sfds"}
                                      sx={{ width: "50%" }}
                                  />
                              </Box>
                          </Box>
                      </Box>
                  </Box>
              </Box>
          </MainBox>
      </Box>
  );
}
