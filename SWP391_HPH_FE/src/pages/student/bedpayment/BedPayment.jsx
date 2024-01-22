import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { privateAxios } from "../../../service/axios";
const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function BedPayment() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [paymentList, setPaymentList] = useState([]);
  const fetchPayment = async () => {
    const res = await privateAxios.get(`payment/${user.id}`);
    setPaymentList(res.data.data);
    console.log(res.data.data);
  };
  useEffect(() => {
    fetchPayment();
  }, []);
  return (
    <Box padding={1}>
      <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
        <h1 style={{ marginLeft: "8px" }}>Payment Bill</h1>
        <Button variant="contained">Internet banking</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>For</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentList.map((payment) => (
              <TableRow key={payment.paymentId}>
                <TableCell>{payment.paymentId}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>{payment.createdAt}</TableCell>
                <TableCell align="right">{ccyFormat(payment.amount)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="right" colSpan={3}>
                Total
              </TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
