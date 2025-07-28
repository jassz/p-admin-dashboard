import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ForwardIcon from '@mui/icons-material/Forward';
import ReplyIcon from '@mui/icons-material/Reply';
import {
  DataGridPro,
  useGridApiContext,
  GRID_DETAIL_PANEL_TOGGLE_FIELD,
  useGridSelector,
  gridDimensionsSelector,
} from '@mui/x-data-grid-pro';
import DownloadIcon from '@mui/icons-material/Download'; // Import the icon
import jsPDF from 'jspdf';
import { useMediaQuery, useTheme } from '@mui/material';


function DetailPanelContent({ row }) {
  const apiRef = useGridApiContext();
  const width = useGridSelector(apiRef, gridDimensionsSelector).viewportInnerSize.width;
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const seller = {
  name: "Poisum Inc.",
  address: "123 Business Street, Metro City, ST 54321",
  email: "support@poisum.com",
  phone: "+1 (555) 123-4567"
};

const buyer = {
  name: "John Doe",
  address: "789 Customer Lane, Suburbia, ST 12345",
  email: "john.doe@example.com",
  phone: "+1 (555) 987-6543"
};

   const handleDownload = () => {
    const csvContent = `Receipt No,Description,Status,Date Time\n${row.receiptNo},${row.description},${row.status},${row.dateTime}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `receipt_${row.receiptNo}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
const handleDownloadPDF = () => {
  const doc = new jsPDF();
  let y = 20;

  // Header
  doc.setFontSize(18);
  doc.text('Receipt / Invoice', 105, y, { align: 'center' });
  y += 10;

  // Seller Details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('From (Seller):', 20, y += 10);
  doc.setFont('helvetica', 'normal');
  doc.text(seller.name, 30, y += 6);
  doc.text(seller.address, 30, y += 6);
  doc.text(`Email: ${seller.email}`, 30, y += 6);
  doc.text(`Phone: ${seller.phone}`, 30, y += 6);

  // Buyer Details
  doc.setFont('helvetica', 'bold');
  doc.text('To (Buyer):', 120, y -= 18);
  doc.setFont('helvetica', 'normal');
  doc.text(buyer.name, 130, y += 6);
  doc.text(buyer.address, 130, y += 6);
  doc.text(`Email: ${buyer.email}`, 130, y += 6);
  doc.text(`Phone: ${buyer.phone}`, 130, y += 6);

  y += 10;
  doc.line(20, y, 190, y); // Divider
  y += 10;

  // Receipt Info Summary
  doc.setFont('helvetica', 'bold');
  doc.text(`Receipt No:`, 20, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${row.receiptNo}`, 50, y);

  doc.setFont('helvetica', 'bold');
  doc.text(`Status:`, 120, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${row.status}`, 150, y);

  doc.setFont('helvetica', 'bold');
  doc.text(`Date & Time:`, 20, y += 10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${row.dateTime}`, 60, y);

  y += 15;

  // Item Table Header
  doc.setFont('helvetica', 'bold');
  doc.text('Item', 20, y);
  doc.text('Description', 70, y);
  doc.text('Price (USD)', 160, y, { align: 'right' });

  doc.line(20, y + 2, 190, y + 2);
  y += 8;

  // Item Row (for now only one, from `row`)
  doc.setFont('helvetica', 'normal');
  doc.text(`1`, 20, y);
  doc.text(`${row.description}`, 70, y);
  doc.text(`$${row.price.toFixed(2)}`, 180, y, { align: 'right' });

  y += 12;

  // Total
  doc.setFont('helvetica', 'bold');
  doc.text('Total:', 140, y);
  doc.text(`$${row.price.toFixed(2)}`, 180, y, { align: 'right' });

  y += 20;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text("Thank you for your business!", 105, y, { align: 'center' });

  doc.save(`receipt_${row.receiptNo}.pdf`);
};

  return (
   <Stack
  sx={{
    py: 2,
    boxSizing: 'border-box',
    position: 'sticky',
    left: 0,
    width,
  }}
  direction="column"
>
  <Paper sx={{ flex: 1, mx: 'auto', width: '90%', p: 4 }}>
    <Stack 
        direction={ isMobile ? "column" : "row"}
        justifyContent="space-between"
        spacing={3}
    >
      {/* Header */}
      <Typography variant="h4" align="center" gutterBottom>
        Receipt / Invoice
      </Typography>

      {/* Seller & Buyer Details */}
      <Stack direction={ isMobile ? "column" : "row"} justifyContent={ isMobile ? "center" : "space-between"}>
        {/* Seller */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">From (Seller)</Typography>
          <Typography>{seller.name}</Typography>
          <Typography>{seller.address}</Typography>
          <Typography>{seller.email}</Typography>
          <Typography>{seller.phone}</Typography>
        </Box>

        {/* Buyer */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">To (Buyer)</Typography>
          <Typography>{buyer.name}</Typography>
          <Typography>{buyer.address}</Typography>
          <Typography>{buyer.email}</Typography>
          <Typography>{buyer.phone}</Typography>
        </Box>
      </Stack>

      <Divider />

      {/* Receipt Info */}
      <Stack spacing={1}>
        <Typography variant="subtitle1"><strong>Receipt No:</strong> {row.receiptNo}</Typography>
        <Typography variant="subtitle1"><strong>Status:</strong> {row.status}</Typography>
        <Typography variant="subtitle1"><strong>Description:</strong> {row.description}</Typography>
        <Typography variant="subtitle1"><strong>Date & Time:</strong> {row.dateTime}</Typography>
      </Stack>

      <Divider />

      {/* Actions */}
      <Stack
  direction={ isMobile ? "column" : "row"}
  spacing={2}
  sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}
>
  <Button sx={{ px: 2 }} startIcon={<ReplyIcon />}>
    Contact Support
  </Button>
  <Button sx={{ px: 2 }} startIcon={<ForwardIcon />}>
    Resend Email
  </Button>
  <Button
    sx={{ px: 2 }}
    color="primary"
    startIcon={<DownloadIcon />}
    onClick={handleDownloadPDF}
  >
    Download
  </Button>
</Stack>
    </Stack>
  </Paper>
</Stack>

  );
}

const columns = [
  { field: 'receiptNo', headerName: 'Receipt No', width: 130 },
  { field: 'description', headerName: 'Description', flex: 1 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'dateTime', headerName: 'Date & Time', width: 180 },
];

const rows = [
  { id: 1, receiptNo: '10021', description: 'Monthly subscription', status: 'Success', dateTime: '10/03/2025 17:44 pm', price: 29.99  },
  { id: 2, receiptNo: '10022', description: 'Annual subscription', status: 'Pending', dateTime: '11/03/2025 10:15 am', price: 29.99 },
  { id: 3, receiptNo: '10023', description: 'Monthly subscription', status: 'Failed', dateTime: '12/03/2025 14:20 pm', price: 29.99 },
  { id: 4, receiptNo: '10024', description: 'One-time payment', status: 'Success', dateTime: '13/03/2025 09:05 am', price: 29.99 },
  { id: 5, receiptNo: '10025', description: 'Monthly subscription', status: 'Success', dateTime: '14/03/2025 18:30 pm', price: 29.99 },
  { id: 6, receiptNo: '10026', description: 'Refund processed', status: 'Success', dateTime: '15/03/2025 11:10 am', price: 29.99 },
  { id: 7, receiptNo: '10027', description: 'Monthly subscription', status: 'Pending', dateTime: '16/03/2025 16:45 pm', price: 29.99 },
  { id: 8, receiptNo: '10028', description: 'Annual subscription', status: 'Failed', dateTime: '17/03/2025 13:00 pm', price: 29.99 },
  { id: 9, receiptNo: '10029', description: 'One-time payment', status: 'Success', dateTime: '18/03/2025 12:25 pm', price: 29.99 },
  { id: 10, receiptNo: '10030', description: 'Monthly subscription', status: 'Success', dateTime: '19/03/2025 15:35 pm', price: 29.99 }
];

export default function BillingHistoryDataGridPro() {
  const getDetailPanelContent = React.useCallback(
    ({ row }) => <DetailPanelContent row={row} />,
    [],
  );

  const getDetailPanelHeight = React.useCallback(() => 'auto', []);

  return (
    <Box sx={{ width: '100%', height:600 }}>
      <DataGridPro
        columns={columns}
        rows={rows}
        initialState={{
          pinnedColumns: {
            left: [GRID_DETAIL_PANEL_TOGGLE_FIELD],
          },
        }}
        getDetailPanelHeight={getDetailPanelHeight}
        getDetailPanelContent={getDetailPanelContent}
        sx={{
          '& .MuiDataGrid-detailPanel': {
            overflow: 'visible',
          },
        }}
      />
    </Box>
  );
}
