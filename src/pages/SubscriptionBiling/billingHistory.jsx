import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper, Typography } from '@mui/material';
import ButtonComponent from 'components/button';

export default function BillingHistory() {

const [openBilling, setOpenBilling] = useState();
  
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'receiptNo',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'dateTime',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
  },
];

const rows = [
  { id: 1, receiptNo: '10021', description: 'Monthly subscription', status: 'Success', dateTime: '10/03/2025 17:44 pm' },
  { id: 2, receiptNo: '10022', description: 'Annual subscription', status: 'Pending', dateTime: '11/03/2025 10:15 am' },
  { id: 3, receiptNo: '10023', description: 'Monthly subscription', status: 'Failed', dateTime: '12/03/2025 14:20 pm' },
  { id: 4, receiptNo: '10024', description: 'One-time payment', status: 'Success', dateTime: '13/03/2025 09:05 am' },
  { id: 5, receiptNo: '10025', description: 'Monthly subscription', status: 'Success', dateTime: '14/03/2025 18:30 pm' },
  { id: 6, receiptNo: '10026', description: 'Refund processed', status: 'Success', dateTime: '15/03/2025 11:10 am' },
  { id: 7, receiptNo: '10027', description: 'Monthly subscription', status: 'Pending', dateTime: '16/03/2025 16:45 pm' },
  { id: 8, receiptNo: '10028', description: 'Annual subscription', status: 'Failed', dateTime: '17/03/2025 13:00 pm' },
  { id: 9, receiptNo: '10029', description: 'One-time payment', status: 'Success', dateTime: '18/03/2025 12:25 pm' },
  { id: 10, receiptNo: '10030', description: 'Monthly subscription', status: 'Success', dateTime: '19/03/2025 15:35 pm' }
];


const showBilling = () => {
    setOpenBilling(!openBilling);
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Box display={'flex'} justifyContent={'space-between'} mb={2}>
        <Box>
           <Typography variant="subtitle1">Billing History</Typography>
        <Typography variant="caption">
          Summary of your billing and transaction history for the purchased
          plan.
        </Typography>
        </Box>
       <ButtonComponent text={!openBilling ? 'Show Transaction' : 'Hide Transaction'} value={'contained'} color={'secondary'} callback={showBilling} />
      </Box>
      {openBilling && (<Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box> )}
    </Box>
  )
}
