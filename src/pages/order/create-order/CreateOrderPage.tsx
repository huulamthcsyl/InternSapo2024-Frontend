import { Autocomplete, Box, TextField, Typography } from "@mui/material"
import MainBox from "../../../components/layout/MainBox"
import CreateOrderAppBar from "./CreateOrderAppBar"
import { useEffect, useState } from "react"
import { getCustomersByKeyword } from "../../../services/customerAPI"
import Customer from "../../../models/Customer"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';

type Props = {}

export default function CreateOrderPage({ }: Props) {

  const [customersList, setCustomersList] = useState<Customer[]>([]);
  const [customerKeyword, setCustomerKeyword] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    getCustomersByKeyword(customerKeyword).then((res) => {
      setCustomersList(res);
    });
  }, [customerKeyword]);

  const createOrder = () => {
    console.log('Create order')
  }

  return (
    <MainBox>
      <CreateOrderAppBar createOrder={createOrder} />
      <Box sx={{ backgroundColor: '#F0F1F1', padding: '25px 30px' }} flex={1} display='flex' flexDirection='column'>
        <Box sx={{ backgroundColor: "#FFF", borderRadius: '5px', padding: '20px 15px' }}>
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
            <Typography variant="body1" sx={{ color: '#747C87' }}>Chưa có thông tin khách hàng</Typography>
          </Box>
          }
        </Box>
      </Box>
    </MainBox>
  )
}