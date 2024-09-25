import { Autocomplete, Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, TableContainer, Button } from "@mui/material"
import MainBox from "../../../components/layout/MainBox"
import CreateOrderAppBar from "./CreateOrderAppBar"
import { useEffect, useLayoutEffect, useState } from "react"
import { getCustomersByKeyword } from "../../../services/customerAPI"
import Customer from "../../../models/Customer"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import { getAllVariants } from "../../../services/productAPI"
import Variant from "../../../models/Variant"
import InventoryIcon from '@mui/icons-material/Inventory';
import { formatCurrency } from "../../../utils/formatCurrency"
import OrderDetail from "../../../models/OrderDetail"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { createOrder } from "../../../services/orderAPI"

type VariantTableRowProps = {
  index: number,
  orderDetailList: OrderDetail[],
  setOrderDetailList?: any
}

function VariantTableRow({ index, orderDetailList, setOrderDetailList }: VariantTableRowProps) {

  const orderDetail = orderDetailList[index];

  const handleDelete = () => {
    setOrderDetailList(orderDetailList.filter(item => item.sku !== orderDetail.sku));
  }

  return <TableRow key={index}>
    <TableCell>{index + 1}</TableCell>
    <TableCell>
      {orderDetail.imagePath ? <img src={orderDetail.imagePath} alt="product" style={{ width: 50, height: 50, objectFit: 'cover' }} /> : null}
    </TableCell>
    <TableCell>{orderDetail.name}</TableCell>
    <TableCell>{formatCurrency(orderDetail.price)}</TableCell>
    <TableCell align="right">
      <TextField
        sx={{ textAlign: 'center' }}
        type="number"
        value={orderDetail.quantity}
        onChange={(event) => {
          const newQuantity = Math.min(Math.max(Number(event.target.value), 0), orderDetail.variantQuantity);
          setOrderDetailList(orderDetailList.map(item => item.sku === orderDetail.sku ? { ...item, quantity: newQuantity } : item));
          return;
        }}
      />
    </TableCell>
    <TableCell align="right">{formatCurrency(orderDetail.price * orderDetail.quantity)}</TableCell>
    <TableCell align="right">
      <Button
        variant="text"
        color="error"
        onClick={handleDelete}
      >
        Xóa
      </Button>
    </TableCell>
  </TableRow>
}

type Props = {}

export default function CreateOrderPage({ }: Props) {

  const [customersList, setCustomersList] = useState<Customer[]>([]);
  const [customerKeyword, setCustomerKeyword] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [variantQuery, setVariantQuery] = useState<string>('');
  const [variantList, setVariantList] = useState<Variant[]>([]);
  const [orderDetailList, setOrderDetailList] = useState<OrderDetail[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cashReceived, setCashReceived] = useState<number>(0);
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    getCustomersByKeyword(customerKeyword).then((res) => {
      setCustomersList(res);
    });
  }, [customerKeyword]);

  useEffect(() => {
    getAllVariants(variantQuery).then((res) => {
      setVariantList(res);
    });
  }, []);

  useLayoutEffect(() => {
    let totalQuantity = 0;
    let totalPrice = 0;
    orderDetailList.forEach((orderDetail) => {
      totalQuantity += orderDetail.quantity;
      totalPrice += orderDetail.quantity * orderDetail.price;
    });
    setTotalQuantity(totalQuantity);
    setTotalPrice(totalPrice);
  }, [orderDetailList]);

  const handleCreateOrder = () => {
    if (!selectedCustomer) {
      toast.error("Vui lòng chọn khách hàng");
      return;
    }
    if (orderDetailList.length === 0) {
      toast.error("Vui lòng chọn sản phẩm");
      return;
    }
    if (cashReceived < totalPrice) {
      toast.error("Số tiền nhận của khách không đủ");
      return;
    }
    const order = {
      customerId: selectedCustomer.id,
      creatorId: 1,
      totalQuantity: totalQuantity,
      note: note,
      cashReceive: cashReceived,
      cashRepay: cashReceived - totalPrice,
      totalPayment: totalPrice,
      paymentType: "CASH",
      orderLineItems: orderDetailList.map((orderDetail) => {
        return {
          variantId: orderDetail.variantId,
          quantity: orderDetail.quantity,
          subTotal: orderDetail.quantity * orderDetail.price
        }
      }),
    }
    createOrder(order).then((_res) => {
      toast.success("Tạo đơn hàng thành công");
    }).catch((error) => {
      toast.error(error.response.data);
    });
  }

  return (
    <MainBox>
      <CreateOrderAppBar handleCreateOrder={handleCreateOrder} />
      <Box sx={{ backgroundColor: '#F0F1F1', padding: '25px 30px' }} flex={1} display='flex' flexDirection='column'>
        <Box bgcolor="#fff" borderRadius={1} padding="20px 15px" mb={2}>
          <Typography variant="body1" sx={{ color: '#000', fontWeight: '600', mb: 2 }}>Thông tin khách hàng</Typography>
          <Autocomplete
            disablePortal
            options={customersList}
            getOptionLabel={(option: any) => option.name}
            renderInput={(params) => <TextField {...params} placeholder="Tìm kiếm khách hàng theo tên, số điện thoại" />}
            sx={{ width: '100%', mb: 2 }}
            onChange={(_event: any, value: Customer | null) => {
              setSelectedCustomer(value);
            }}
            value={selectedCustomer}
            inputValue={customerKeyword}
            onInputChange={(_event: any, newInputValue: string) => {
              setCustomerKeyword(newInputValue);
            }}
            renderOption={(props, option) => {
              const { key, ...rest } = props;
              return <Box component="li" sx={{ '& > img': { mr: 2, borderRadius: '50%' } }} key={key} {...rest}>
                <AccountCircleIcon sx={{ fontSize: 40, color: '#0088FF', mr: 2 }} />
                <Box>
                  <Typography variant="body1" sx={{ color: '#000', fontWeight: '600' }}>{option.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#747C87' }}>{option.phoneNumber}</Typography>
                </Box>
              </Box>
            }}
            filterOptions={(options, params) => {
              const filtered = options.filter((option) => {
                return option.name.toLowerCase().includes(params.inputValue.toLowerCase()) || option.phoneNumber.includes(params.inputValue);
              });
              return filtered;
            }}
          />
          {selectedCustomer ?
            <Box display="flex" justifyContent="space-between" border="1px solid #D9D9D9" p={1} borderRadius={1}>
              <Box>
                <Typography variant="body1" sx={{ color: '#000', fontWeight: '600' }} mb={1}>{selectedCustomer.name}</Typography>
                <Typography variant="body2" sx={{ color: '#000' }} mb={1}>{selectedCustomer.phoneNumber}</Typography>
                <Typography variant="body2" sx={{ color: '#000' }}>{selectedCustomer.address}</Typography>
              </Box>
              <Box border="1px dotted #D9D9D9" p={1}>
                <Typography variant="body1" sx={{ color: '#000' }} mb={1}>Số đơn hàng: {selectedCustomer.numberOfOrder}</Typography>
                <Typography variant="body1" sx={{ color: '#000' }}>Tổng chi tiêu: {selectedCustomer.totalExpense}</Typography>
              </Box>
            </Box> :
            <Box display="flex" flexDirection="column" alignItems="center">
              <BadgeIcon sx={{ fontSize: 100, color: '#D9D9D9' }} />
              <Typography variant="body2" sx={{ color: '#747C87' }}>Chưa có thông tin khách hàng</Typography>
            </Box>
          }
        </Box>
        <Box bgcolor="#fff" borderRadius={1} padding="20px 15px" mb={2}>
          <Typography variant="body1" sx={{ color: '#000', fontWeight: '600', mb: 2 }}>Danh sách sản phẩm</Typography>
          <Autocomplete
            disablePortal
            selectOnFocus
            clearOnBlur
            options={variantList}
            getOptionLabel={(option: any) => `${option.productName} (${option.name})`}
            renderInput={(params) => <TextField {...params} placeholder="Tìm kiếm sản phẩm theo SKU, tên" />}
            sx={{ width: '100%', mb: 2 }}
            onChange={(_event: any, value: Variant | null) => {
              console.log("SELECTED")
              if (value && !orderDetailList.find((item: OrderDetail) => item.sku === value.sku)) {
                setOrderDetailList([...orderDetailList, OrderDetail.fromVariant(value)]);
              }
            }}
            inputValue={variantQuery}
            onInputChange={(_event: any, newInputValue: string) => {
              setVariantQuery(newInputValue);
            }}
            renderOption={(props, option) => {
              const { key, ...rest } = props;
              return <Box component="li" sx={{ '& > img': { mr: 2, borderRadius: '50%' } }} key={key} {...rest}>
                <Box>
                  <Typography variant="body1" sx={{ color: '#000', fontWeight: '600' }}>{`${option.productName} (${option.name})`}</Typography>
                  <Typography variant="body2" sx={{ color: '#747C87' }}>{option.sku}</Typography>
                </Box>
              </Box>
            }}
            filterOptions={(options, params) => {
              const filtered = options.filter((option) => {
                return option.sku.toLowerCase().includes(params.inputValue.toLowerCase()) || option.productName.toLowerCase().includes(params.inputValue.toLowerCase()) || option.name.toLowerCase().includes(params.inputValue.toLowerCase());
              });
              return filtered;
            }}
          />
          {orderDetailList.length > 0 ?
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Ảnh</TableCell>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell>Giá bán</TableCell>
                    <TableCell align="right">Số lượng</TableCell>
                    <TableCell align="right">Thành tiền</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    orderDetailList.map((_orderDetail, index) => <VariantTableRow key={index} index={index} orderDetailList={orderDetailList} setOrderDetailList={setOrderDetailList}/>)
                  }
                </TableBody>
              </Table>
            </TableContainer> :
            <Box display="flex" flexDirection="column" alignItems="center">
              <InventoryIcon sx={{ fontSize: 100, color: '#D9D9D9' }} />
              <Typography variant="body2" sx={{ color: '#747C87' }}>Chưa có sản phẩm nào được chọn</Typography>
            </Box>
          }
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ color: '#000' }}>Ghi chú đơn hàng</Typography>
            <TextField
              value={note}
              sx={{ width: '40%', mt: 1 }}
              multiline
              rows={4}
              placeholder="Nhập ghi chú cho đơn hàng"
              variant="outlined"
              onChange={(event) => {
                setNote(event.target.value);
              }}
            />
          </Box>
        </Box>
        <Box bgcolor="#fff" borderRadius={1} padding="20px 15px" mb={2}>
          <Typography variant="body1" sx={{ color: '#000', fontWeight: '600', mt: 2 }}>Thông tin thanh toán</Typography>
          <Box width='40%' display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="body1" sx={{ color: '#000' }}>Số sản phẩm</Typography>
            <Typography variant="body1" sx={{ color: '#000' }}>{totalQuantity}</Typography>
          </Box>
          <Box width='40%' display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="body1" sx={{ color: '#000' }}>Tổng tiền</Typography>
            <Typography variant="body1" sx={{ color: '#000' }}>{formatCurrency(totalPrice)}</Typography>
          </Box>
          <Box mt={2} display="flex" alignItems="center">
            <Typography variant="body1" sx={{ color: '#000' }} marginRight={2}>Phương thức thanh toán</Typography>
            <Button variant="outlined">Tiền mặt</Button>
          </Box>
          <Box width='40%' display="flex" alignItems="center">
            <Typography variant="body1" sx={{ color: '#000' }} mt={2} marginRight={2}>Tiền nhận của khách</Typography>
            <TextField
              sx={{ width: '40%', mt: 1 }}
              value={cashReceived}
              onChange={(event) => {
                setCashReceived(Number(event.target.value));
              }}
            />
          </Box>
          <Box width='40%' display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="body1" sx={{ color: '#000' }}>Tiền thừa</Typography>
            <Typography variant="body1" sx={{ color: '#000' }}>{formatCurrency(cashReceived - totalPrice)}</Typography>
          </Box>
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleCreateOrder}>
            Tạo đơn hàng
          </Button>
        </Box>
      </Box>
      <ToastContainer hideProgressBar autoClose={3000}/>
    </MainBox>
  )
}