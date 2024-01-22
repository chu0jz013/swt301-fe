import { useEffect, useState } from "react";
import { privateAxios } from "../../../service/axios";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";

export default function Payment({ open, setOpen, bedRequestId }) {
  const [payment, setPayment] = useState({});
  const fetchPayment = async () => {
    const res = await privateAxios.get(`bed-request/${bedRequestId}/payment`);
    console.log(res);
    if (res.data) {
      setPayment(res.data);
    }
  };

  function formatPrice(price) {
    price = (price + "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    price = price + " VND";

    return price;
  }
  useEffect(() => {
    fetchPayment();
  }, []);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ color: "#fff", textAlign: "center" }}>
        <div
          style={{
            backgroundColor: "#034EA2",
            borderRadius: "8px",
            padding: "5px",
            fontWeight: "bold",
          }}
        >
          Payment
        </div>
      </DialogTitle>
      <DialogContent sx={{ overflowX: "hidden" }}>
        <Grid m={0} container spacing={2}>
          <Grid item xs={3} sx={{ fontWeight: "bolder" }}>
            ID:
          </Grid>
          <Grid item xs={9}>
            {payment.paymentId}
          </Grid>
          <Grid item xs={3} sx={{ fontWeight: "bolder" }}>
            Amount:
          </Grid>
          <Grid item xs={9}>
            {formatPrice(payment.amount)}
          </Grid>
          <Grid item xs={3} sx={{ fontWeight: "bolder" }}>
            Status:
          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              color:
                payment.status === "expired"
                  ? "red"
                  : payment.status === "pending"
                  ? "#FFC300 "
                  : "green",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {payment.status === "pending" ? "unpaid" : payment.status}
          </Grid>
          <Grid item xs={3} sx={{ fontWeight: "bolder" }}>
            Expiration Date:
          </Grid>
          <Grid item xs={9}>
            {payment.expirationDate}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
